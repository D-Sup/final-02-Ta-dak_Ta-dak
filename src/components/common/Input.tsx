import styled from 'styled-components';

interface InputProps {
  id: string,
  type: 'text' | 'email' | 'password';
  label: string
  value: string,
  valid: boolean,
  placeholder?: string,
  alertMsg?: string,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onFocus?: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = (props: InputProps) => {

  return (
    <>
      <InputContainerStyle>
        <div>
          <LabelStyle htmlFor={props.id}>{props.label}</LabelStyle>
          <InputStyle {...props} autoComplete='off'></InputStyle>
        </div>
        {
          // 유효성 검사 통과할 경우 &&
          props.valid &&
          <ValidationSuccessStyle>{props.alertMsg}</ValidationSuccessStyle>
        }
        {
          // 유효성 검사 통과 못할 경우 &&
          !props.valid &&
          <ValidationErrorStyle>{props.alertMsg}</ValidationErrorStyle>
        }
      </InputContainerStyle>
    </>
  );
}

export default Input;

const InputContainerStyle = styled.div`
  position: relative;
  width: 322px;
  & + & {
    margin-top: 40px;
  }
  div {
    background-color: var(--input-box-color);
    border-radius: 10px;
  }
  @media (min-width: 768px) {
    width: 500px;
  }
`;

const LabelStyle = styled.label`
  position: absolute;
  top: -20px;
  font-size: var(--font--size-sm);
  /* padding-left: 3px; */
  color: var(--invert-color);
`;

const InputStyle = styled.input<{ valid: boolean }>`
  background-color: transparent;
  width: 100%;
  height: 50px;
  font-size: var(--font--size-md);
  line-height: 14px;
  /* padding-bottom: 8px; */
  padding: 0 10px;
  border: none;
  border-radius: 10px;
  border: 2px solid var(--background-color);
  color: var(--invert-color);
  transition: .2s ease-out;

  ::placeholder {
    color: var(--text-color-2);
    font-size: var(--font--size-md);
  }

  &:focus {
    border: 2px solid ${(props) => (props.valid ? 'var(--basic-color-2)' : '#eb5757')};
  }
`;

const ValidationSuccessStyle = styled.span`
  display: block;
  font-size: var(--font--size-sm);
  line-height: 14px;
  color: var(--basic-color-2);
  margin-top: 6px;
`;

const ValidationErrorStyle = styled(ValidationSuccessStyle)`
  color: #eb5757;
`;