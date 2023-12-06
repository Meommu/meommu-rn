// components
import { SView } from "@/components/Layout/SView";
import { SignUpFormStepTwoSkeleton } from "@/pages/SignUp/SignUpPresenter/SignUpForm/SignUpFormStepTwo/index.skeleton";
import { Footer } from "@/components/Layout/Footer";

// constants
import { size } from "@/constants";

export function ProfileFormSkeleton() {
  return (
    <>
      <SignUpFormStepTwoSkeleton showGuideText={false} />

      <Footer>
        <SView
          style={{ width: "100%", height: size.NAVIGATION_BUTTON_HEIGHT }}
        />
      </Footer>
    </>
  );
}
