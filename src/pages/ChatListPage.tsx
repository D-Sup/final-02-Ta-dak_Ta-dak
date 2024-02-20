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
                  <span>{loading ? <Skeleton width={150} height={20} /> : item.name}</span>

                  <div className="chatroomlink">
                    <p>
                      {
                        loading ?
                          <Skeleton width={250} height={20} style={{ marginTop: '5px' }} /> :
                          item.messages.slice().reverse().find(message => message.Msg !== undefined)?.Msg
                      }
                    </p>
                    <div className="date">
                      {
                        loading ?
                          <Skeleton width={50} height={16} />
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
  width: var(--basic-width);
  height: var(--screen-nav-height);
  background-color: var(--background-color);
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
    display: block;
    height: 19px;
    font-weight: bold;
    font-size: var(--font--size-md);
    color: var(--text-color-1);
  }

  .chatroomlink {
    display: flex;
    justify-content: space-between;
  }

  p {
    display: inline-block;
    height: 16px;
    line-height: 16px;
    font-size: var(--font--size-sm);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 220px;
    color: var(--text-color-3);
  }

  .date {
    color: var(--text-color-1);
    font-size: 10px;
    margin-right: 16px;
  }
`;
