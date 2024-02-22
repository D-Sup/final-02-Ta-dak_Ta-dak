import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { modalStackAtom } from '../recoil/AtomModalStackState';

import { ModalStackAtomType } from '../recoil/AtomModalStackState';

export const useModalStack = () => {
  const setModalStack = useSetRecoilState(modalStackAtom);
  const resetModalStack = useResetRecoilState(modalStackAtom);


  const push = (
    Component?: React.ComponentType<any> | null,
    props: { [key: string]: any } | string = {},
    selectOptions: string[] = [],
    actions: (((...args: any[]) => void) | null)[] = [],
    modalType: 'AlertModal' | 'SlideUpModal' | 'CarouselModal' | '' = ''
  ): void => {
    setModalStack((Prev) => [
      ...Prev,
      { Component, props, selectOptions, actions, modalType },
    ]);
  };

  const pop = (): void => {
    setModalStack((Prev) => {
      const newModalStack = [...Prev];
      newModalStack.pop();
      return newModalStack;
    });
  };

  const update = (newProps: { [key: string]: string }): void => {
    setModalStack((Prev) => {
      const newModalStack = [...Prev];
      const lastIndex = newModalStack.length - 1;
      newModalStack[lastIndex] = {
        ...newModalStack[lastIndex],
        props: { ...(newModalStack[lastIndex].props as { [key: string]: string }), ...newProps }
      };
      return newModalStack;
    });
  };

  const replace = ({ Component, props = {} }: Pick<ModalStackAtomType, 'Component' | 'props'>) => {
    setModalStack((Prev) => {
      const newModalStack = [...Prev];
      newModalStack[newModalStack.length - 1] = { Component, props };
      return newModalStack;
    });
  };

  const clear = () => resetModalStack();

  return { push, pop, update, replace, clear };
};