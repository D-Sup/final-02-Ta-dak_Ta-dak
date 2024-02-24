import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useModalStack } from '../hooks/useModalStack';
import useImageUploader from '../hooks/useImageUploader';

import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import Modal from './../components/common/Modal';
import ChatHeader from '../components/header/ChatHeader';
import { ProfileSm } from '../components/common/Profile';
import { FileUploadSm } from '../components/common/FileUpload';

import dummyData from '../dummyData/chatDummyData.json';

interface MessagesType {
  Img?: string,
  Msg?: string,
  createdAt: string,
  receive?: boolean,
  confirm?: boolean
}

const ChatRoomPage = () => {

  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();
  const userId = location.pathname.split("/")[2]
  const userInfo = location.state;
  const selectedData = dummyData[dummyData.findIndex(item => item.accountname === userId)] || ""

  const [chatHistory, setChatHistory] = useState<MessagesType[]>(typeof selectedData === 'string' ? [] : selectedData.messages);
  const [chatMessage, setChatMessage] = useState<string>('');

  const { handleImageChange, imagePath } = useImageUploader();
  const { push, pop } = useModalStack();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleChatRoomOut = (): void => {
    navigate(-1)
    pop()
  }

  const handleSendButtonClick = (): void => {
    const newChat = {
      Msg: chatMessage,
      createdAt: new Date().toLocaleDateString([], {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      })
    };
    if (chatMessage !== '') {
      setChatHistory([...chatHistory, newChat]);
      setChatMessage('');
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 600)
  }, [])

  useEffect(() => {
    if (imagePath) {
      const newChat = {
        Img: imagePath as string,
        createdAt: new Date().toLocaleDateString([], {
          year: '2-digit',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        })
      };
      setChatHistory([...chatHistory, newChat]);
    }

  }, [imagePath]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <>
      <ChatHeader name={typeof selectedData === 'string' ? userInfo.username : selectedData.name} isButton={true} handleFunc={() => push(Modal, {}, ['채팅방 나가기'], [handleChatRoomOut], 'SlideUpModal')} />

      <ChatRoomContainer>
        <ChatRoomPageStyle ref={chatContainerRef} >
          {chatHistory?.map((item, index) => {
            return (
              !!item.receive ? (
                <ChatContainerStyle key={index}>
                  <ProfileSm loading={loading} />
                  {
                    loading ?
                      <Skeleton baseColor={'var(--skeleton-color)'} width={300} height={50} style={{ marginLeft: '16px' }} />
                      :
                      <p>{item.Msg}</p>
                  }
                  {!loading && <span className="time">{`${item.createdAt.split(" ")[3]} ${item.createdAt.split(" ")[4]}`}</span>}
                </ChatContainerStyle>
              ) : (
                <MyChatContainerStyle key={index}>
                  {!loading && <span className="time">{`${item.createdAt.split(" ")[3]} ${item.createdAt.split(" ")[4]}`}</span>}
                  {
                    loading && !item.Img ?
                      <Skeleton baseColor={'var(--skeleton-color)'} width={300} height={50} />
                      :
                      !!item.Img || <p>{item.Msg}</p>
                  }
                  {
                    loading && item.Img ?
                      <Skeleton baseColor={'var(--skeleton-color)'} width={140} height={115} />
                      :
                      item.Img && <img src={item.Img} alt="" />
                  }

                </MyChatContainerStyle>
              )
            )
          }
          )}
        </ChatRoomPageStyle>
        <SendStyle aria-label='전송'>
          <div className='upload' >
            <FileUploadSm id="uploading-img" onChange={handleImageChange} aria-label='파일 업로드' />
          </div>
          <InputStyle type={'text'} placeholder='메시지 입력하기...' value={chatMessage} onChange={(e) => setChatMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendButtonClick()}
            aria-label='텍스트 입력' autoFocus />
          <button id='send' onClick={handleSendButtonClick} disabled={!chatMessage} aria-label='전송 버튼'>전송</button>
        </SendStyle>
      </ChatRoomContainer>
    </>
  );
}

export default ChatRoomPage


const ChatRoomContainer = styled.div`
  height: calc(var(--screen-nav-height));
  border-bottom: 60px solid var(--background-color);
  overflow-y: scroll;

  ::-webkit-scrollbar {
      width: 0px;
  } 

@media (min-width: 768px) {
  height: calc(var(--screen-nav-height) - 48px);
}
`;

const ChatRoomPageStyle = styled.div`
  position: relative;
  padding-top: 24px;

  ::-webkit-scrollbar {
    background-color: var(--background-color);
    width: 0px;
  }

`;

const ChatContainerStyle = styled.div`
  display: flex;
  margin: 0 16px 16px;

  p {
    display: inline-block;
    max-width: 250px;
    margin-left: 16px;
    padding: 10px;
    border: 1px solid #c4c4c4;
    border-radius: 0 10px 10px;
    font-size: var(--font--size-md);
    line-height: 1.5;
    color: var(--text-color-1);
    
    @media (min-width: 768px) {
      max-width: 350px;
    }
  }

  .time {
    display: flex;
    align-items: flex-end;
    margin: 6px;
    font-size: 10px;
    color: #767676;
  }
`;

const MyChatContainerStyle = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: end;
  margin: 0 16px 16px;

  p {
    max-width: 250px;
    display: inline-block;
    padding: 10px;
    line-height: 1.5;
    background-color: var(--basic-color-1);
    border-radius: 10px 0 10px 10px;
    color: #fff;
    font-size: var(--font--size-md);
    color: var(--common-text-color-1);

        
    @media (min-width: 768px) {
      max-width: 385px;
    }
  }
  

  img {
    width: 140px;
    height: 115px;
    object-fit: cover;
    border-radius: 10px;
  }

  .time {
    display: flex;
    align-items: flex-end;
    margin: 6px;
    font-size: 10px;
    color: #767676;
  }
`;

const SendStyle = styled.div`
  position: absolute;
  bottom: 60px;
  @media (min-width: 768px) {
    bottom: 0px;
    }
  width: var(--basic-width);
  height: 60px;
  display: flex;
  align-items: center;
  background-color: var(--background-color);

  .upload {
    margin-left: 16px;
  }

  input {
    width: 100%;
    margin: 0 18px;
    font-size: var(--font--size-md);
    background-color: var(--background-color);
    
    @media (min-width: 768px) {
      width: 393px;
    }
  }

  button {
    width: 55px;
    height: 19px;
    padding-right: 10px;
    box-sizing: border-box;
    font-size: var(--font--size-md);
    color: #c4c4c4;
    display: inline-block;
    transition: 0.5s;
    &:hover {
      color: var(--basic-color-2);
    }
  }
`;

const InputStyle = styled.input`
  color: var(--text-color-1);
  ::placeholder {
    color: var(--text-color-2);
  }
`;
