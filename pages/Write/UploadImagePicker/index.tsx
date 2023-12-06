// react
import {
  View,
  Text,
  Pressable,
  Platform,
  ScrollView,
  type ViewStyle,
  type StyleProp,
} from "react-native";
import { useMutation } from "react-query";
import { type UseFormSetValue } from "react-hook-form";

// redux
import { useSelector } from "react-redux";
import { type RootState } from "@/store";
import { type LayoutState } from "@/store/modules/layout";

// expo
import * as ImagePicker from "expo-image-picker";

// components
import { LoadImage } from "@/components/Widget/LoadImage";
import { ImageRemoveButton } from "@/components/Button/ImageRemoveButton";

// utils
import { b64ToBlob } from "@/utils";

// constants
import { IMAGE_CATEGORY } from "@/constants";

// apis
import { apiService } from "@/apis";

// svgs
import Camera from "@/assets/svgs/camera.svg";

// hooks
import { useToast } from "@/hooks";

// styles
import { styles } from "./index.styles";

interface ImagePickerProps {
  imageIds: number[];

  setValue: UseFormSetValue<DiaryWriteFormFieldValues>;
}

export function UploadImagePicker({ imageIds, setValue }: ImagePickerProps) {
  const { fireToast } = useToast();

  /**
   * imagePicker
   */
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  /**
   * useMutation
   */
  const uploadImageMutation = useMutation(
    async (formData: FormData) => {
      return await apiService.uploadImage(formData);
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
  const handleImageRemoveButtonClick = (imageId: number) => () => {
    const index = imageIds.indexOf(imageId);

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

    if (imageIds.length >= 5) {
      fireToast("이미지는 최대 5개까지 추가할 수 있습니다.", 3000);

      return;
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

  const { width } = useSelector<RootState, LayoutState>(
    (state) => state.layout
  );

  const sideLength = (width - 7 * 2) / 5;

  const itemLayoutStyle: StyleProp<ViewStyle> = {
    width: sideLength,
    height: sideLength,
    padding: 7,
  };

  return (
    <ScrollView style={{ flexShrink: 0 }} horizontal>
      <View style={styles.list} onStartShouldSetResponder={() => true}>
        <View style={itemLayoutStyle}>
          <View style={styles.item}>
            <Pressable style={styles.uploader} onPress={handleImagePick}>
              <Camera />

              <Text style={styles.uploaderText}>{imageIds.length} / 5</Text>
            </Pressable>
          </View>
        </View>

        {[...imageIds].reverse().map((imageId) => {
          return (
            <View style={itemLayoutStyle} key={`imageId${imageId}`}>
              <View style={styles.item}>
                <LoadImage imageId={imageId} />

                <Pressable
                  onPress={handleImageRemoveButtonClick(imageId)}
                  style={styles.imageRemover}
                >
                  <ImageRemoveButton />
                </Pressable>
              </View>
            </View>
          );
        })}

        {Array(5 - imageIds.length)
          .fill(null)
          .map((_, i) => {
            return (
              <View style={itemLayoutStyle} key={i}>
                <View style={styles.item} />
              </View>
            );
          })}
      </View>
    </ScrollView>
  );
}
