import styled from 'styled-components'

import { ModalStackAtomType } from 'recoil/AtomModalStackState';

export default function Modal({ selectOptions = [], actions = [] }: ModalStackAtomType) {

  function handleSelectOption(action: ((...args: any[]) => void) | null): void {
    if (action !== null) {
      action();
    };
  }

  return (
    <ModalStyle>
      {selectOptions.map((selectOption, index) => {
        return (
          <li key={index}>
            <button className='settingComponent' onClick={() => handleSelectOption(actions[index])}>{selectOption}</button>
          </li>
        );
      })}
    </ModalStyle>
  )
}

const ModalStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  left: 26px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  font-size: var(--font-size-md);
  background-color: var(--modal-color);

button{
  text-align: left;
  transition: all .3s;
  &:hover{
    color: var(--basic-color-5);
    background-color: var(--basic-color-3);
  }
}

li {
  width: inherit;
}

.settingComponent {
  padding-left: 24px;
  line-height: 46px;
  width: inherit;
  /* width: 100vw; */
  /* max-width: 500px; */
  height: 46px;
  left: 26px;
}

.logout {
  padding-left: 24px;
  line-height: 46px;
  width: var(--basic-width);
  height: 46px;
  left: 26px;
}
`