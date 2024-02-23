import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import BasicHeader from '../components/header/BasicHeader';
import { ProfileSm } from '../components/common/Profile';

import dummyData from '../dummyData/chatDummyData.json';
import { useEffect, useState } from 'react';

const ChatList = () => {

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 600)
  }, [])

  const navigate = useNavigate();

  return (
    <>
      <BasicHeader isButton={false} />
      <ChatListPageStyle>
        {
          dummyData.map((item, index) => {
            const lastMessageCreatedAt = item.messages[item.messages.length - 1].createdAt.split(" ");

            return (
              <ChatContainerStyle
                key={index}
                onClick={() => {
                  navigate(`/chatroom/${item.accountname}`);
                }}
              >
                <div className="imgcontainer">
                  <ProfileSm url={''} confirm={!loading && !item.messages.slice().reverse().find(message => message.receive === true)?.confirm} loading={loading} />
                </div>
                <div className="text">
                  <span>{loading ? <Skeleton baseColor={'var(--skeleton-color)'} width={150} height={15} /> : item.name}</span>

                  <div className="chatroomlink">
                    {
                      loading ?
                        <Skeleton baseColor={'var(--skeleton-color)'} width={200} height={10} style={{ marginTop: '5px' }} />
                        :
                        <p>{item.messages.slice().reverse().find(message => message.Msg !== undefined)?.Msg}</p>
                    }
                    <div className="date">
                      {
                        loading ?
                          <Skeleton baseColor={'var(--skeleton-color)'} width={50} height={16} />
                          :
                          `${lastMessageCreatedAt[0]}${lastMessageCreatedAt[1]}${lastMessageCreatedAt[2]}`
                      }
                    </div>
                  </div>
                </div>
              </ChatContainerStyle>
            )
          })
        }
      </ChatListPageStyle>
    </>
  );
}

export default ChatList

const ChatListPageStyle = styled.div`
  position: relative;
  width: var(--basic-width);
  height: var(--screen-nav-height);
  padding-top: 15px;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    background-color: var(--background-color);
    width: 0;
  }
`;

const ChatContainerStyle = styled.div`
  height: 66px;
  display: flex;
  align-items: center;
  background-color: var(--background-color);
  cursor: pointer;

  .imgcontainer {
    width: 42px;
    height: 42px;
    margin: 0 16px;
  }

  .text {
    flex: 1;
  }

  span {
    font-weight: bold;
    font-size: var(--font--size-md);
    color: var(--text-color-1);
  }

  .chatroomlink {
    display: flex;
    justify-content: space-between;
  }

  p {
    width: 220px;
    height: 16px;
    display: inline-block;
    line-height: 16px;
    font-size: var(--font--size-sm);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--text-color-3);
  }

  .date {
    color: var(--text-color-1);
    font-size: 10px;
    margin-right: 16px;
  }
`;
