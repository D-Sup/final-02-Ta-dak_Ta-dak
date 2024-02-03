import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { modalStackAtom } from '../recoil/AtomModalStackState';

export const useModalStack = () => {
  const setModalStack = useSetRecoilState(modalStackAtom);
  const resetModalStack = useResetRecoilState(modalStackAtom);

  const push = (ModalComponent, props = {}, selectOptions = [], actions = [], modalType = '') => {
    setModalStack((Prev) => [
      ...Prev,
      { Component: ModalComponent, props, selectOptions, actions, modalType },
    ]);
  };

  const pop = () => {
    setModalStack((Prev) => {
      const newModalStack = [...Prev];
      newModalStack.pop();
      return newModalStack;
    });
  };

  const update = (newProps) => {
    setModalStack((Prev) => {
      const newModalStack = [...Prev];
      const lastIndex = newModalStack.length - 1;
      newModalStack[lastIndex] = {
        ...newModalStack[lastIndex],
        props: { ...newModalStack[lastIndex].props, ...newProps },
      };
      return newModalStack;
    });
  };

  const replace = (ModalComponent, newProps = {}) => {
    setModalStack((Prev) => {
      const newModalStack = [...Prev];
      newModalStack[newModalStack.length - 1] = { Component: ModalComponent, props: newProps };
      return newModalStack;
    });
  };

  const clear = () => resetModalStack();

  return { push, pop, update, replace, clear };
};