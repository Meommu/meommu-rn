// react
import { useEffect, useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { FormProvider, useForm } from "react-hook-form";

// components
import { SignUpFormStepTwo } from "@/pages/SignUp/SignUpPresenter/SignUpForm/SignUpFormStepTwo";
import { NavigationButton } from "@/components/Button/NavigationButton";
import { Footer } from "@/components/Layout/Footer";

// hooks
import { useToast } from "@/hooks";

// apis
import axios from "axios";

export function ProfileForm() {
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
    methods.handleSubmit((data) => {
      updateProfileMutation.mutate(data);
    })();
  }, []);

  return (
    <FormProvider {...methods}>
      <SignUpFormStepTwo showGuideText={false} />

      <Footer>
        <NavigationButton
          content="수정하기"
          onPress={handleProfileModifyButtonClick}
        />
      </Footer>
    </FormProvider>
  );
}
