import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom"
import { useModalStack } from '../../hooks/useModalStack';

import { deleteComment, reportComment } from '../../api/commentAPI'

import { UserAtomType } from 'recoil/AtomUserState';

import styled from 'styled-components';

import Alert from './Alert';
import Modal from './Modal';

import { ProfileSm } from './Profile';
import { ReactComponent as IconMore } from '../../assets/img/s-icon-more.svg'

interface CommentProps {
  item: Comment,
  myInfo: UserAtomType,
  setReset: React.Dispatch<React.SetStateAction<boolean>>;
};

const Comment = ({ item, myInfo, setReset }: CommentProps) => {

  const { push, clear } = useModalStack();
  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.replace('/postdetail/', '');
  const history = new Date(item.createdAt).getTime();
  const today = new Date().getTime();
  const subtract = today - history
  const t = Math.floor(subtract / 60000);

  let timeAgo;
  if (t < 1) {
    timeAgo = '방금 전';
  } else if (t < 60) {
    timeAgo = `${t}분 전`;
  } else if (t < 1440) {
    timeAgo = `${Math.floor(t / 60)}시간 전`;
  } else {
    timeAgo = `${Math.floor(t / 1440)}일 전`;
  }

  const clickHandler = (): void => {
    navigate(`/profile/${item.author.accountname}`);
  };

  const deleteReq = async (): Promise<void> => {
    await deleteComment(postId, item.id)
    setReset(true)
    clear();
  }

  const reportReq = async (): Promise<void> => {
    const response = await reportComment(postId, item.id)
    setReset(true)
    if (response) {
      push(Alert,
        '신고가 접수되었습니다.',
        ['확인'],
        [clear],
        'AlertModal'
      )
    }
  }

  return (
    <>
      <CommentContainerStyle>
        <div className="profileClick" onClick={clickHandler}>
          <ProfileSm url={item.author.image} />
        </div>
        <div className="commentContents">
          <UserNameStyle onClick={clickHandler}>
            {item.author.username}
          </UserNameStyle>
          <TimeStyle>{timeAgo}</TimeStyle>
          <CommentStyle>{item.content}</CommentStyle>
        </div>
        <div className="commentMoreButton">
          <IconMore
            className="commentMoreButton"
            onClick={() => {
              if (item.author?.accountname === myInfo.accountname) {
                push(Modal,
                  {},
                  ['삭제'],
                  [deleteReq],
                  'SlideUpModal'
                )
              } else {
                push(Modal,
                  {},
                  ['신고'],
                  [reportReq],
                  'SlideUpModal'
                )
              }
            }}
          />
        </div>
      </CommentContainerStyle>
    </>
  );
}

export default Comment

const CommentContainerStyle = styled.div`
  width: 390px;
  min-height: 58px;
  display: flex;
  position: relative;
  margin-bottom: 16px;
  padding: 0 20px;

  @media (min-width: 768px) {
    width: 500px;
  }

  .commentContents {
    padding: 6px 12px 0 12px;
    font-size: var(--font--size-md);
  }

  .profileClick {
    div {
      cursor: pointer;
    }
  }

  .commentMoreButton {
    svg{
      position: absolute;
      top: 5px;
      right: 20px;
      background-position: center;
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  }
`;

const UserNameStyle = styled.span`
  display: inline-block;
  font-size: var(--font--size-md);
  cursor: pointer;
  color: var(--text-color-1);
`;

const TimeStyle = styled.span`
  display: inline-block;
  color: var(--text-color-2);
  font-size: 10px;
  margin-left: 10px;
  position: relative;
  
  &:before {
    content: '';
    display: inline-block;
    width: 2px;
    height: 2px;
    border-radius: 50%;
    background: var(--text-color-1);
    position: absolute;
    top: 50%;
    left: -5px;
  }
`;

const CommentStyle = styled.div`
  margin-top : 15px;
  color: var(--text-color-3);
  padding-right: 15px;
  padding-bottom: 10px;
  font-size:var(--font--size-md);
  font-weight : var(--font--Regular);
`