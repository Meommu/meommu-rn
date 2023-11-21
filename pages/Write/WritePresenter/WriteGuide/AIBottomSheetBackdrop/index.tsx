// bottom sheet
import {
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";

// constants
import { zIndex } from "@/constants";

export function AIBottomSheetBackdrop(props: BottomSheetBackdropProps) {
  return (
    <BottomSheetBackdrop
      {...props}
      style={[props.style, { zIndex: zIndex.bottomSheetBackdrop }]}
      appearsOnIndex={1}
      disappearsOnIndex={0}
    />
  );
}
