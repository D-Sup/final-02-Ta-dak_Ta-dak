import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import { SignUpAtom } from "../recoil/AtomSignupState";
import { postEmailValid } from "../api/signupAPI";

import styled from "styled-components"

import Input from "../components/common/Input"
import { GreenLgBtn, GreyLgBtn } from "../components/common/Button";

const SignUpPage = () => {

  const setReqFrame = useSetRecoilState(SignUpAtom);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailValid, setEmailValid] = useState<boolean>(true)
  const [passwordValid, setPasswordValid] = useState<boolean>(true)
  const [emailAlertMsg, setEmailAlertMsg] = useState<string>('');
  const [passwordAlertMsg, setPasswordAlertMsg] = useState<string>('');

  const navigate = useNavigate()

  const handleEmailInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value)
  }

  const handlePasswordInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value
    setPassword(value)
    if (value.length >= 6) {
      setPasswordAlertMsg('')
      setPasswordValid(true)
    } else {
      setPasswordAlertMsg('비밀번호는 6자 이상이어야 합니다.')
      setPasswordValid(false)
    }
  }

  const handleEmailValid = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const Msg = await postEmailValid(event.target.value);
    setEmailAlertMsg(Msg)
    Msg === '사용 가능한 이메일 입니다.' ? setEmailValid(true) : setEmailValid(false)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (email && password && emailValid && passwordValid) {
      setReqFrame({
        email,
        password,
        username: '',
        accountname: '',
        intro: '',
        image: ''
      })
      navigate('/signup/profile')
    }
  }


  return (
    <SignUpPageStyle>
      <h1>이메일로 회원가입</h1>
      <form onSubmit={handleSubmit}>
        <Input
          id={'user-email'}
          type={'email'}
          label={'이메일'}
          placeholder={'이메일 주소를 입력해주세요.'}
          value={email}
          valid={emailValid}
          alertMsg={emailAlertMsg}
          onChange={handleEmailInput}
          onBlur={handleEmailValid}
        />
        <Input
          id={'user-password'}
          type={'password'}
          label={'비밀번호'}
          placeholder={'비밀번호를 설정해주세요.'}
          value={password}
          valid={passwordValid}
          alertMsg={passwordAlertMsg}
          onChange={handlePasswordInput}
        />
        <div className='btn-container'>
          {email && password && emailValid && passwordValid ?
            <GreenLgBtn type='submit' contents={'다음'} /> :
            <GreyLgBtn type='submit' contents={'다음'} />}
        </div>
      </form>
    </SignUpPageStyle>
  )
}

export default SignUpPage

const SignUpPageStyle = styled.div`
  position: relative;
  background-color: var(--background-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 34px 0 0 0;
  width: var(--basic-width);
  height: var(--basic-height);
  @media (max-width: 768px) {
    padding: 34px;
  }

  .btn-container {
    margin-top: 30px;
  }

  h1 {
    color: var(--text-color-1);
    font-weight: var(--font--Medium);
    font-size: 24px;
    text-align: center;
    padding-bottom: 40px;
  }
`;