// react
import { View, Pressable, Text } from "react-native";
import { useMutation } from "react-query";
import { useFormContext } from "react-hook-form";
import { Platform } from "react-native";

// expo
import * as ImagePicker from "expo-image-picker";

// svgs
import Camera from "@/assets/svgs/camera.svg";

// components
import { LoadImage } from "@/components/Image/LoadImage";
import { ImageRemoveButton } from "@/components/Button/ImageRemoveButton";

// axios
import axios from "axios";

// utils
import { b64ToBlob } from "@/utils";

// constants
import { IMAGE_CATEGORY } from "@/constants";

// styles
import { styles } from "./index.styles";

export function WriteFormStepTwo() {
  /**
   * useForm
   */
  const { watch, setValue } = useFormContext<DiaryWriteFormFieldValues>();

  const imageIds = watch("imageIds");

  /**
   * imagePicker
   */
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  /**
   * useMutation
   */
  const uploadImageMutation = useMutation(
    async (formData: FormData) => {
      const {
        data: {
          data: {
            images: [{ id }],
          },
        },
      } = await axios.post<
        ResponseTemplate<{ images: { id: number; url: string }[] }>
      >("/api/v1/images", process.env.EXPO_PUBLIC_MODE !== "dev" && formData);

      return id;
    },
    {
      onSuccess: (id: number) => {
        setValue("imageIds", [...imageIds, id]);
      },
    }
  );

  /**
   * event handler
   */
  const handleImageRemoveButtonClick = (index: number) => () => {
    const newImageIds = [...imageIds];

    newImageIds.splice(index, 1);

    setValue("imageIds", newImageIds);
  };

  const handleImagePick = async () => {
    // 권한 확인 후 획득
    if (!status?.granted) {
      const permission = await requestPermission();

      if (!permission.granted) {
        return;
      }
    }

    // 이미지 선택 후 업로드
    const getImageFormData =
      Platform.OS === "web" ? getImageFormDataOnWeb : getImageFormDataOnMobile;

    const formData = await getImageFormData();

    if (!formData) {
      return;
    }

    uploadImageMutation.mutate(formData);
  };

  /**
   * util function
   */
  const getImageFormDataOnWeb = async (): Promise<FormData | null> => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      allowsMultipleSelection: false,
      base64: true,
    });

    if (result.canceled) {
      return null;
    }

    const formData = new FormData();

    const { base64, uri } = result.assets[0];

    const fileExtension = uri.split(";")[0].split("/")[1];
    const fileName = `imageName.${fileExtension}`;
    const contentType = `image/${fileExtension}`;

    const blob = b64ToBlob(base64, contentType);
    const file = new File([blob], fileName, { type: contentType });

    formData.append("category", IMAGE_CATEGORY.DIARY_IMAGE);
    formData.append("images", file);

    return formData;
  };

  const getImageFormDataOnMobile = async (): Promise<FormData | null> => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      allowsMultipleSelection: false,
    });

    if (result.canceled) {
      return null;
    }

    const formData = new FormData();

    const { uri } = result.assets[0];

    const fileExtension = uri.slice(uri.lastIndexOf(".") + 1);
    const fileName = `imageName.${fileExtension}`;
    const contentType = `image/${fileExtension}`;

    formData.append("category", IMAGE_CATEGORY.DIARY_IMAGE);
    // @ts-ignore
    formData.append("images", { uri, name: fileName, type: contentType });

    return formData;
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageUploader}>
        {Array(5)
          .fill(null)
          .map((_, i) => {
            return (
              <View
                key={imageIds[i] ? `imageId${imageIds[i]}` : i}
                style={styles.imageUploaderItemLayout}
              >
                <View style={styles.imageUploaderItem}>
                  {imageIds.length === i ? (
                    <Pressable
                      style={styles.imageUploadButton}
                      onPress={handleImagePick}
                    >
                      <Camera />
                      <Text style={styles.imageUploadButtonText}>
                        {imageIds.length} / 5
                      </Text>
                    </Pressable>
                  ) : (
                    imageIds[i] && (
                      <View style={styles.imageUploadedItem}>
                        <LoadImage
                          style={styles.imageUploadedItemImage}
                          imageId={imageIds[i]}
                        />
                        <Pressable
                          onPress={handleImageRemoveButtonClick(i)}
                          style={styles.imageUploadedItemRemoveButton}
                        >
                          <ImageRemoveButton />
                        </Pressable>
                      </View>
                    )
                  )}
                </View>
              </View>
            );
          })}
      </View>
    </View>
  );
}
