import { useState, useEffect, RefObject } from 'react';

const useLazyLoading = (observeImage: RefObject<HTMLImageElement | HTMLElement>, imgSrc: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const element = observeImage.current;

    if (element instanceof HTMLImageElement) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            element.src = imgSrc;

            element.onload = () => {
              setIsLoading(false);
            };

            element.onerror = () => {
              setTimeout(() => {
                setIsLoading(false);
                setIsError(true);
              }, 1500)
            };

            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(element);

      return () => {
        observer.unobserve(element);
        observer.disconnect();
      };
    }

    else if (element instanceof HTMLElement) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const img = new Image();
            img.src = imgSrc;

            img.onload = () => {
              setIsLoading(false);
            };

            img.onerror = () => {
              setTimeout(() => {
                setIsLoading(false);
                setIsError(true);
              }, 1500)
            };

            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(element);

      return () => {
        observer.unobserve(element);
        observer.disconnect();
      };
    }
  }, [observeImage, imgSrc]);

  return { isLoading, isError }
};

export default useLazyLoading;

// import { useEffect, RefObject } from 'react';

// const useLazyLoading = (observeImage: RefObject<HTMLImageElement>, imgSrc: string): void => {
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting && observeImage.current) {
//           observeImage.current.src = imgSrc;
//           observer.unobserve(entry.target);
//         }
//       },
//       { threshold: 0.1 }
//     );
//     observeImage.current && observer.observe(observeImage.current);

//     return () => {
//       observer.disconnect();
//     };
//   }, [])
// }

// export default useLazyLoading



// useEffect(() => {
//   const observer = new IntersectionObserver(
//     ([entry]) => {
//       if (entry.isIntersecting && observeImage.current) {
//         const img = observeImage.current;
//         img.src = imgSrc;

//         img.onload = () => {
//           setIsLoading(false)
//         };

//         img.onerror = () => {
//           setIsLoading(false)
//           setIsError(true)
//         };

//         observer.unobserve(entry.target);
//       }
//     },
//     { threshold: 0.1 }
//   );
//   observeImage.current && observer.observe(observeImage.current);

//   return () => {
//     observer.disconnect();
//   };
// }, [imgSrc]);
