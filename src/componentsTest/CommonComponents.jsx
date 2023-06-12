import {
  GreenLgBtn,
  GreenMdBtn,
  GreenMsBtn,
  GreenSmBtn,
  WhiteLgBtn,
  WhiteMdBtn,
  WhiteMsBtn,
  WhiteSmBtn,
  BoldLgBtn,
  BoldMdBtn,
  BoldMsBtn,
  BoldSmBtn,
  GreyLgBtn,
  GreyMdBtn,
  GreyMsBtn,
  GreySmBtn,
} from '../components/common/Button';
import { ResetStyle } from '../style/ResetStyle';
import { GlobalStyle } from '../style/GlobalStyle';
import { NavBar } from '../components/common/NavBar';
import InputTest from './InputTest';
import { BasicHeader } from '../components/header/BasicHeader';
import { SearchHeader } from '../components/header/SearchHeader';
import { MainHeader } from '../components/header/MainHeader';
import { UploadHeader } from '../components/header/UploadHeader';
import { ChatHeader } from '../components/header/ChatHeader';
import { Profile } from '../components/common/Profile';
import {Modal} from '../components/common/Modal';
import {Alert} from '../components/common/Alert';
import UserPostList from '../components/UserPostList/UserPostList';
import UserId from '../components/common/UserId';



export default function CommonComponents() {
  return (
    <>
      <ResetStyle />
      <GlobalStyle />

      <div>
        <GreenLgBtn contents={'버튼'} />
        <GreenMdBtn contents={'버튼'} />
        <GreenMsBtn contents={'버튼'} />
        <GreenSmBtn contents={'버튼'} />
      </div>
      <div>
        <BoldLgBtn contents={'버튼'} />
        <BoldMdBtn contents={'버튼'} />
        <BoldMsBtn contents={'버튼'} />
        <BoldSmBtn contents={'버튼'} />
      </div>
      <div>
        <WhiteLgBtn contents={'버튼'} />
        <WhiteMdBtn contents={'버튼'} />
        <WhiteMsBtn contents={'버튼'} />
        <WhiteSmBtn contents={'버튼'} />
      </div>
      <div>
        <GreyLgBtn contents={'버튼'} />
        <GreyMdBtn contents={'버튼'} />
        <GreyMsBtn contents={'버튼'} />
        <GreySmBtn contents={'버튼'} />
      </div>
      <UserId id={'weniv_Mandarin'} />
      <NavBar />
      <InputTest />
      <BasicHeader />
      <SearchHeader />
      <MainHeader />
      <UploadHeader />
      <ChatHeader />
      <Profile />
      <Modal />
      <Alert />
      <UserPostList />
    </>
  );
}
