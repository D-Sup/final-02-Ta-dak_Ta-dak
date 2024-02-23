import { ModalStackAtomType } from 'recoil/AtomModalStackState';

import styled from 'styled-components';

interface AlertProps extends ModalStackAtomType {
  closeModal: () => void
}

const Alert = ({ props, selectOptions = [], actions = [], closeModal }: AlertProps) => {

  const handleSelectOption = (action: ((...args: any[]) => void) | null): void => {
    closeModal();
    if (action !== null) {
      action();
    };
  }

  return (
    <>
      <AlertStyle>
        {
          typeof props === 'string' &&
          <p>{props}</p>
        }
        <ButtonStyle>
          <button className='cancel' onClick={() => handleSelectOption(actions[0])}>{selectOptions[0]}</button>
          {selectOptions[1] && <button className='delete' onClick={() => handleSelectOption(actions[1])}>{selectOptions[1]}</button>}
        </ButtonStyle>
      </AlertStyle>
    </>
  );
}

export default Alert

const ButtonStyle = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex; 
`;

const AlertStyle = styled.div`
  position: relative;
  width: 252px;
  height: 110px;
  border-radius: 10px;
  font-size: var(--font--size-lg);
  background-color: var(--modal-background-color);
  color: var(--invert-color);
  overflow: hidden;
  
  p {
    text-align: center;
    padding-top: 27px;
  }

  button {
    transition: all .3s;
    &:hover{
      background-color: var(--modal-hover-color);
    }
  }

  .cancel {
    flex-grow: 1;
    flex-basis: 0;
    display: inline-block;
    height: 46px;
    border-top: 1px solid var(--box-shadow-color);
    color: var(--invert-color);
    &:hover{
      color: var(--basic-color-2);
    }
  }

  .delete {
    /* bottom: 0; */
    width: 126px;
    height: 46px;
    color: #F22222;
    border-top: 1px solid var(--box-shadow-color);
    border-left: 1px solid var(--box-shadow-color);
  }
`