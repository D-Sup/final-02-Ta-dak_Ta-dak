import styled from 'styled-components';

export default function Alert({ props, selectOptions, actions, closeModal }) {

  function handleSelectOption(action) {
    closeModal();
    action && action()
  }

  return (
    <>
      <AlertStyle>
        <p>{props}</p>
        <ButtonStyle>
          <button className='cancel' onClick={() => handleSelectOption(actions[0])}>{selectOptions[0]}</button>
          {selectOptions[1] && <button className='delete' onClick={() => handleSelectOption(actions[1])}>{selectOptions[1]}</button>}
        </ButtonStyle>
      </AlertStyle>
    </>
  );
}

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
  background-color: var(--modal-color);
  overflow: hidden;
  
  p {
    text-align: center;
    padding-top: 27px;
  }

  button {
    transition: all .3s;
    &:hover{
      background-color: var(--basic-color-3);
    }
  }

  .cancel {
    flex-grow: 1;
    flex-basis: 0;
    display: inline-block;
    height: 46px;
    border-top: 1px solid var(--basic-color-6);
    border-right: 1px solid var(--basic-color-6);
    &:hover{
      color: var(--basic-color-5);
    }
  }

  .delete {
    /* bottom: 0; */
    width: 126px;
    height: 46px;
    color: #F22222;
    border-top: 1px solid var(--basic-color-6);
  }
`