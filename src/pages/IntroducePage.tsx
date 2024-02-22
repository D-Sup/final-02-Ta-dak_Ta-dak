import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil';

import { IsLogin, UserAtom } from 'recoil/AtomUserState'
import { loginReq } from 'api/loginAPI'

import styled from 'styled-components'

import Loader from 'Loader/Loader'
import { GreenLgBtn } from 'components/common/Button'


const IntroducePage = () => {

  const [userValue, setUserValue] = useRecoilState(UserAtom);
  const [isLogin, setIsLogin] = useRecoilState<boolean>(IsLogin);


  const navigate = useNavigate();

  const handleLoginReq = async (): Promise<void> => {

    if (!isLogin) {
      const User = await loginReq('tadaktadak@email.com', 'tadaktadak');
      if ('status' in User) {
        console.log('로그인 실패')
      } else {
        const userInfo = User.user;
        await setUserValue({
          ...userValue,
          id: userInfo._id,
          accountname: userInfo.accountname,
          token: userInfo.token,
          refreshToken: userInfo.refreshToken,
          image: userInfo.image,
        });
        setIsLogin(true)
        navigate('/feed');
      }
    }
  };

  return (
    <IntroducePageStyle>
      <div className='logo'>
        <Loader />
      </div>
      <h2>타닥타닥</h2>
      <p>
        타닥타닥은 자신만의 캠핑 이야기를 공유하고, <br />
        캠핑 용품들을 중고거래할 수 있는 SNS입니다. <br />
        캠핑의 낭만적인 순간을 기록해보세요!
      </p>
      <div className='button-container'>
        <GreenLgBtn type="submit" contents={'시작하기'} handleFunc={() => navigate('/signup')} />
        <GreenLgBtn type="submit" contents={'체험용 계정으로 로그인하기'} handleFunc={handleLoginReq} />
        <span>이미 계정이 있나요? <Link to={`/login`} style={{ color: 'var(--basic-color-2)' }}>로그인</Link></span>
      </div>
    </IntroducePageStyle>
  )
}

export default IntroducePage

const IntroducePageStyle = styled.div`
  background-color: var(--background-color);
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 20px;

  .logo {
    position: relative;
    margin-top: 200px;
    margin-bottom: 130px;
  }

  h2 {
    font-size: 24px;
    font-weight: var(--font--Bold);
    color: var(--invert-color);
  }

  p {
    line-height: 1.5;
    text-align: center;
    font-size: var(--font--size-md);
    font-weight: var(--font--Medium);
    color: var(--text-color-4);
  }

  span {
    color: var(--text-color-1);
  }

  .button-container {
    flex-grow: 1;
    flex-basis: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: end;
    gap: 20px;
    margin-bottom: 50px;
  }
`;
