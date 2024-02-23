import { atom } from 'recoil'

export const SignUpAtom = atom<SignUpInfo>({
  key: 'SignUpAtom',
  default: {
    email: '', 
    password: '',
    username: '',
    accountname: '',
    intro: '',
    image: ''
  },
});


