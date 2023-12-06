// react
import { useEffect, useRef } from "react";
import {
  Platform,
  ScrollView,
  findNodeHandle,
  type ScrollViewProps,
} from "react-native";

// styles
import { styles } from "./index.styles";

export function DraggableHorizontalScrollView({ children }: ScrollViewProps) {
  const ref = useRef<ScrollView | null>(null);

  useEffect(() => {
    if (Platform.OS !== "web" || !ref.current) {
      return;
    }

    const slider = findNodeHandle(ref.current) as unknown as HTMLDivElement;

    if (!slider) {
      return;
    }

    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    const mouseDown = (e: MouseEvent) => {
      isDragging = true;

      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;

      slider.style.cursor = "grab";
    };

    const mouseLeave = (e: MouseEvent) => {
      isDragging = false;
    };

    const mouseUp = (e: MouseEvent) => {
      isDragging = false;

      slider.style.cursor = "default";
    };

    const mouseMove = (e: MouseEvent) => {
      if (!isDragging) {
        return;
      }

      e.preventDefault();

      const x = e.pageX - slider.offsetLeft;
      const walk = x - startX;
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener("mousedown", mouseDown);
    slider.addEventListener("mouseleave", mouseLeave);
    slider.addEventListener("mouseup", mouseUp);
    slider.addEventListener("mousemove", mouseMove);

    return () => {
      slider.removeEventListener("mousedown", mouseDown);
      slider.removeEventListener("mouseleave", mouseLeave);
      slider.removeEventListener("mouseup", mouseUp);
      slider.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  return (
    <ScrollView
      style={styles.container}
      ref={ref}
      showsHorizontalScrollIndicator={false}
      horizontal
    >
      {children}
    </ScrollView>
  );
}
