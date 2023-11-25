// bottom sheet
import {
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";

// style
import { styles } from "./index.styles";

export function AIBottomSheetBackdrop(props: BottomSheetBackdropProps) {
  return (
    <BottomSheetBackdrop
      {...props}
      style={[props.style, styles.bottomSheetBackdrop]}
      appearsOnIndex={1}
      disappearsOnIndex={0}
    />
  );
}
