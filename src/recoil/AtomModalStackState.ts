import { atom } from 'recoil';

export interface ModalStackAtomType {
  Component: React.ComponentType<any> | null,
  props: { [key: string]: string } | string,
  selectOptions?: string[],
  actions?: (((...args: any[]) => void) | null)[],
  modalType?: 'AlertModal' | 'SlideUpModal' | ''
}

export const modalStackAtom = atom<ModalStackAtomType[]>({
  key: 'modalStack',
  default:
    [
      {
        Component: null,
        props: {},
        selectOptions: [],
        actions: [],
        modalType: ''
      }
    ],
});
