// react
import { useState, useRef, useCallback } from "react";
import Swiper from "react-native-web-swiper";

export function useSwiper() {
  const [swiperIndex, setSwiperIndex] = useState(0);

  const swiperRef = useRef<Swiper | null>(null);

  const handleSwiperIndexChange = useCallback((index: number) => {
    setSwiperIndex(index);
  }, []);

  return { swiperIndex, swiperRef, handleSwiperIndexChange };
}
