import { useEffect, RefObject } from 'react';

const useLazyLoading = (observeImage: RefObject<HTMLImageElement>, imgSrc: string): void => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && observeImage.current) {
          observeImage.current.src = imgSrc;
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    observeImage.current && observer.observe(observeImage.current);

    return () => {
      observer.disconnect();
    };
  }, [])
}

export default useLazyLoading