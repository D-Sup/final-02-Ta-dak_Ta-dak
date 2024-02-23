import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { IsLogin, UserAtom } from '../recoil/AtomUserState';
import { loginReq } from '../api/loginAPI';

import styled from 'styled-components';

import Input from '../components/common/Input';
import { GreenLgBtn, GreyLgBtn } from '../components/common/Button';

import CheckIcon from '../assets/img/icon-check.svg';

const LoginPage = () => {

  const [userValue, setUserValue] = useRecoilState(UserAtom);
  const [isLogin, setIsLogin] = useRecoilState<boolean>(IsLogin);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [valid, setValid] = useState<boolean>(true);
  const [alertMsg, setAlertMsg] = useState<string>('');
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleEmailInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };

  const handlePasswordInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
  };

  const handleInputFocus = (): void => {
    setValid(true);
    setAlertMsg('');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    if (!isLogin) {
      const User = await loginReq(email, password);
      if ('status' in User) {
        // 로그인 실패한 경우
        setValid(false);
        setAlertMsg(User.message);
        setEmail('');
        setPassword('');
      } else {
        // 로그인 성공한 경우
        const userInfo = User.user;
        setUserValue({
          ...userValue,
          id: userInfo._id,
          accountname: userInfo.accountname,
          token: userInfo.token,
          refreshToken: userInfo.refreshToken,
          image: userInfo.image,
        });
        setValid(true);
        setIsLogin(true);
        navigate('/feed');
      }
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);

    if (!isChecked) {
      setEmail('tadaktadak@email.com');
      setPassword('tadaktadak');
    } else {
      setEmail('');
      setPassword('');
    }
  };

  return (
    <>
      <LoginPageStyle>
        <h1>로그인</h1>
        <form onSubmit={handleSubmit}>
          <Input
            id={'user-email'}
            type={'email'}
            label={'아이디'}
            value={email}
            valid={valid}
            placeholder='이메일을 입력해주세요.'
            onChange={handleEmailInput}
            onFocus={handleInputFocus}
          />
          <Input
            id={'user-password'}
            type={'password'}
            label={'비밀번호'}
            value={password}
            valid={valid}
            placeholder='이메일을 입력해주세요.'
            alertMsg={alertMsg}
            onChange={handlePasswordInput}
            onFocus={handleInputFocus}
          />
          <div className='btn-container'>
            {email && password ? (
              <GreenLgBtn type="submit" contents={'로그인'} />
            ) : (
              <GreyLgBtn type="submit" contents={'로그인'} />
            )}
          </div>
        </form>
        <OtherStyle>
          {/* <Styledlabel>
            <StyledInput type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="custom-checkbox" />
            체험용 계정 사용하기
          </Styledlabel>
          <p>|</p> */}
          <SignUpLink href="#/signup">이메일로 회원가입</SignUpLink>
        </OtherStyle>
      </LoginPageStyle>
    </>
  );
}

export default LoginPage;

const LoginPageStyle = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 34px;
  width: var(--basic-width);
  height: var(--basic-height);
  background-color: var(--background-color);

  @media (min-width: 768px) {
    padding: 34px 0px;
  }

  .btn-container {
    margin-top: 30px;
  }
  
  h1 {
    font-weight: var(--font--Medium);
    font-size: 24px;
    text-align: center;
    padding-bottom: 40px;
    color: var(--text-color-1);
  }
`;

const OtherStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
  gap: 10px;

  p {
    margin-left: 10px;
    font-size: 18px;
  }

  @media (max-width: 768px) {
    font-size: var(--font--size-md);
  }
`
const Styledlabel = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
`;

const StyledInput = styled.input`
  width: 15px;
  height: 15px;
  cursor: pointer;
  /* appearance: none; */
  background-color: #DCDCDC;
  border: 2px solid #DCDCDC;
  border-radius: 4px;
  position: relative;

  &:checked + ${Styledlabel}::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background: url(${CheckIcon}) center no-repeat;
    opacity: 1;
  }
`
const SignUpLink = styled.a`
  margin-left: 10px;
  color: var(--basic-color-1);
  text-decoration: none;
  cursor: pointer;
`;