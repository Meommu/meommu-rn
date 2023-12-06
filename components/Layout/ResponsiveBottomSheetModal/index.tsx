// react
import React, { useRef, useMemo, useCallback, useEffect } from "react";

// hooks
import { useResponsiveMobileWidth } from "@/hooks";

// bottom sheet
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
  useBottomSheetDynamicSnapPoints,
  type BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";

// style
import { styles } from "./index.styles";

interface ResponsiveBottomSheetModalProps {
  /**
   * isOpen 값이 원시값일 경우, useEffect가 값 변화를 감지하지 못하는 경우가 있어
   * 객체 형태로 값을 관리하여 항상 useEffect가 동작하도록 구현함.
   */
  isOpen: { value: boolean };
  setIsOpen: React.Dispatch<React.SetStateAction<{ value: boolean }>>;
  children: React.ReactNode;
}

export function ResponsiveBottomSheetModal({
  isOpen,
  setIsOpen,
  children,
}: ResponsiveBottomSheetModalProps) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT"], []);

  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const { responsiveWidthStyle } = useResponsiveMobileWidth();

  useEffect(() => {
    if (isOpen.value) {
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.dismiss();
    }
  }, [isOpen, bottomSheetRef]);

  const handleBottomSheetIndexChange = useCallback(
    (index: number) => {
      setIsOpen({ value: index === -1 ? false : true });
    },
    [setIsOpen]
  );

  /**
   * bottom sheet의 dimmed
   *
   * ※ Web 환경에서는 뒷 배경 클릭시 바텀시트 모달이 닫히지 않음.
   * ※ v5 버전에서 업데이트를 기다려야 할 것 같음.
   */
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        style={[props.style, styles.bottomSheetBackdrop]}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={animatedSnapPoints}
      contentHeight={animatedContentHeight}
      handleHeight={animatedHandleHeight}
      enableContentPanningGesture={false}
      containerStyle={[styles.bottomSheetContainer, responsiveWidthStyle]}
      handleIndicatorStyle={styles.handleIndicator}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={true}
      onChange={handleBottomSheetIndexChange}
    >
      <BottomSheetView onLayout={handleContentLayout}>
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  );
}
