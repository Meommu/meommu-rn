// react
import React, { useCallback, useEffect } from "react";

// hooks
import { useResponsiveBottomSheet } from "@/hooks";

// components
import { NavigationButton } from "@/components/Button/NavigationButton";

// bottom sheet
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";

// style
import { styles } from "./index.styles";

interface DiaryMenuButtonSheetModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDiaryEditButtonClick: () => void;
  handleDiaryDeleteButtonClick: () => void;
}

export function DiaryMenuButtonSheetModal({
  isOpen,
  setIsOpen,
  handleDiaryDeleteButtonClick,
  handleDiaryEditButtonClick,
}: DiaryMenuButtonSheetModalProps) {
  const {
    bottomSheetRef,
    handleContentLayout,
    animatedContentHeight,
    animatedHandleHeight,
    animatedSnapPoints,
    bottomSheetMaxWidthStyle,
  } = useResponsiveBottomSheet();

  useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.dismiss();
    }
    //bottomSheetRef.current?.snapToIndex(isOpen ? 0 : -1);
  }, [isOpen, bottomSheetRef]);

  const handleBottomSheetIndexChange = useCallback(
    (index: number) => {
      setIsOpen(index === -1 ? false : true);
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
      containerStyle={[styles.bottomSheetContainer, bottomSheetMaxWidthStyle]}
      handleIndicatorStyle={styles.handleIndicator}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={true}
      onChange={handleBottomSheetIndexChange}
    >
      <BottomSheetView
        onLayout={handleContentLayout}
        style={styles.bottomSheetContent}
      >
        <NavigationButton
          content="일기 수정하기"
          onPress={handleDiaryEditButtonClick}
        />
        <NavigationButton
          fontColor="#6F7682"
          content="일기 삭제하기"
          backgroundColor="transparent"
          onPress={handleDiaryDeleteButtonClick}
        />
      </BottomSheetView>
    </BottomSheetModal>
  );
}
