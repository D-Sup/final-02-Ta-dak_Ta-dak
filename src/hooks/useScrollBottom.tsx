import { useState, useEffect, RefObject } from 'react';

const useScrollBottom = (ref: RefObject<HTMLDivElement>): boolean => {
  const [isBottom, setIsBottom] = useState<boolean>(false);

  useEffect(() => {
    const element = ref.current;

    const handleScroll = (): void => {
      if (element) {
        const { scrollTop, clientHeight, scrollHeight } = element;
        setIsBottom(scrollTop + clientHeight + 250 >= scrollHeight);
      }
    };

    element?.addEventListener('scroll', handleScroll);

    return () => {
      element?.removeEventListener('scroll', handleScroll);
    };
  }, [ref]);

  return isBottom;
}

export default useScrollBottom