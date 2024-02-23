import { useEffect, RefObject } from 'react';

const useLazyLoading = (observeImage: RefObject<HTMLImageElement>, imgSrc: string, loading?: boolean): void => {
  useEffect(() => {
    if (!loading) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && observeImage.current) {
            observeImage.current.src = imgSrc;
            observer.unobserve(entry.target);
          }
        },
        {
          threshold: 0
        }
      );

      observeImage.current && observer.observe(observeImage.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [observeImage, imgSrc, loading]);
}

export default useLazyLoading
