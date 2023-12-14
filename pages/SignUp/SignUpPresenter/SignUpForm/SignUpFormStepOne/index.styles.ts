// react
import { StyleSheet } from "react-native";

// constants
import { color, font } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },

  /**
   * 인삿말
   */
  greeting: {
    gap: 10,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 60,
  },

  greetingTitle: {
    fontSize: 25,
    fontFamily: font.PretendardSemiBold,
    color: color.g800,
  },

  greetingSubTitle: {
    fontSize: 14,
    fontFamily: font.PretendardSemiBold,
    color: color.g400,
  },

  /**
   * 폼 요소
   */
  formLayout: {
    width: "100%",
    gap: 18,

    paddingHorizontal: 20,
  },

  formField: {
    gap: 12,
  },

  formFieldGuideLayout: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  formFieldGuideText: {
    fontSize: 14,
    fontFamily: font.PretendardSemiBold,
    color: color.g800,
  },

  formFieldGuideDetailText: {
    fontSize: 10,
    fontFamily: font.PretendardSemiBold,
    color: color.g400,
    lineHeight: 14,
  },

  emailFormFieldLayout: {
    flexDirection: "row",
    gap: 15,
  },

  agreementFormFieldLayout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    gap: 9,
  },

  agreementFormField: {
    width: "100%",
    flexShrink: 1,
    flexDirection: "row",
  },

  agreementFormFieldText: {
    color: color.g700,
    fontSize: 14,
    fontFamily: font.PretendardSemiBold,
  },
});
