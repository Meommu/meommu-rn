import { View, Text } from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import { SignUpFormStepTwo } from "@/pages/SignUp/SignUpForm/SignUpFormStepTwo";
import { NavigationButton } from "@/components/Button/NavigationButton";
import { useCallback, useEffect } from "react";
import { Header } from "@/components/Layout/Header";
import { GoBackButton } from "@/components/Button/GoBackButton";
import { router } from "expo-router";
import { PATH, color } from "@/constants";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { useToast } from "@/hooks";

export function ProfilePage() {
  const { fireToast } = useToast();

  const queryClient = useQueryClient();

  const methods = useForm<ProfileFormFieldValues>({
    defaultValues: {
      kindergartenName: "",
      kindergartenDirectorName: "",
      phoneNumber: "",
    },
  });

  const { data: user } = useQuery(
    ["userInfo"],
    async () => {
      const {
        data: { data },
      } = await axios.get<ResponseTemplate<User>>("/api/v1/kindergartens/info");

      return data;
    },
    {
      suspense: true,
    }
  );

  useEffect(() => {
    if (!user) {
      return;
    }

    const { name, ownerName, phone } = user;

    methods.setValue("kindergartenName", name);
    methods.setValue("kindergartenDirectorName", ownerName);
    methods.setValue("phoneNumber", phone);
  }, [user]);

  const updateProfileMutation = useMutation(
    async (data: ProfileFormFieldValues) => {
      await axios.patch("/api/v1/kindergartens/info", {
        name: data.kindergartenName,
        ownerName: data.kindergartenDirectorName,
        phone: data.phoneNumber,
      });
    },
    {
      onSuccess: () => {
        fireToast("수정이 완료되었습니다.", 3000);

        queryClient.invalidateQueries("loginInfo");
        queryClient.invalidateQueries("userInfo");
      },
    }
  );

  const handleProfileModifyButtonClick = useCallback(() => {
    methods.handleSubmit(
      (data) => {
        updateProfileMutation.mutate(data);
      },
      () => {
        /**
         * TODO: toast 메세지 폼 에러 메세지로 변경
         */
        fireToast("폼 요소 충족 못함", 3000);
      }
    )();
  }, []);

  const handleGoBackButtonClick = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace(PATH.SETTING);
    }
  }, []);

  if (!user) {
    return null;
  }

  return (
    <FormProvider {...methods}>
      <View style={{ width: "100%", height: "100%", backgroundColor: color.w }}>
        <View style={{ padding: 12 }}>
          <Header
            title="마이 프로필"
            left={<GoBackButton onPress={handleGoBackButtonClick} />}
          />
        </View>

        <View
          style={{
            width: "100%",
            marginTop: 21,
            marginBottom: 45,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 90,
              height: 90,
              backgroundColor: color.primary,
              borderRadius: 36,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "yeonTheLand",
                fontSize: 26,
                color: color.w,
              }}
            >
              me
            </Text>
          </View>
        </View>

        <SignUpFormStepTwo showGuideText={false} />

        <View
          style={{
            padding: 20,
          }}
        >
          <NavigationButton
            content="수정하기"
            onPress={handleProfileModifyButtonClick}
          />
        </View>
      </View>
    </FormProvider>
  );
}
