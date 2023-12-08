// bottom sheet
import {
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";

// style
import { styles } from "./index.styles";

function WriteGuideBackdrop(props: BottomSheetBackdropProps) {
  return (
    <BottomSheetBackdrop
      {...props}
      style={[props.style, styles.bottomSheetBackdrop]}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
    />
  );
}

export const renderBackdrop = () => {
  return (props: BottomSheetBackdropProps) => {
    return <WriteGuideBackdrop {...props} />;
  };
};
