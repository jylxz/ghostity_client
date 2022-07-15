import { useEffect, useState } from "react";

export default function useResponseSlides(width: number | undefined, maxSlides = 4) {
  const [slides, setSlides] = useState(0);

  const slidesCount = maxSlides < 4 ? 4 : maxSlides

  function handleSlides(currentWidth: number) {
    if (currentWidth < 700) return setSlides(slidesCount - 3);

    if (currentWidth > 700 && currentWidth < 1024) return setSlides(slidesCount - 2);

    if (currentWidth > 1024 && currentWidth < 1280) return setSlides(slidesCount - 1);

    if (currentWidth > 1280) return setSlides(slidesCount);

    return setSlides(0)
  }

  useEffect(() => {
    if (width) {
      handleSlides(width);
    }
  }, [width]);

  return slides;
}
