type SignUpFormFieldValues = {
  email: string;
  emailDupChk: null | boolean;
  password: string;
  passwordConfirm: string;
  agreement: boolean;
  kindergartenName: string;
  kindergartenDirectorName: string;
  phoneNumber: string;
};

type SignInFormFieldValues = {
  id: string;
  password: string;
};

type ProfileFormFieldValues = Pick<
  SignUpFormFieldValues,
  "kindergartenName" | "kindergartenDirectorName" | "phoneNumber"
>;
