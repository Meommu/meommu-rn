// react
import { FormProvider, useForm } from "react-hook-form";

// components
import { WritePresenter } from "@/components/WritePresenter";

export default function Write() {
  const methods = useForm<DiaryWriteFormFieldValues>({
    defaultValues: {
      date: "",
      title: "",
      content: "",
      dogName: "",
      imageIds: [],
    },
  });

  return (
    <FormProvider {...methods}>
      <WritePresenter />
    </FormProvider>
  );
}
