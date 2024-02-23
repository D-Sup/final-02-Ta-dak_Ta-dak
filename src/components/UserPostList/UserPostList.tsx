import { Link, useLocation, useParams } from 'react-router-dom';

import styled from 'styled-components';

import SaleItemList from './SaleItemList';
import PostList from './PostList';
import AlbumList from './AlbumList';

import { ReactComponent as IconPostAlbumOff } from '../../assets/img/icon-post-album-off.svg';
import { ReactComponent as IconPostAlbumOn } from '../../assets/img/icon-post-album-on.svg';
import { ReactComponent as IconPostListOff } from '../../assets/img/icon-post-list-off.svg';
import { ReactComponent as IconPostListOn } from '../../assets/img/icon-post-list-on.svg';
import { ReactComponent as IconSaleOff } from './../../assets/img/icon-saleItem-off.svg';
import { ReactComponent as IconSaleOn } from './../../assets/img/icon-saleItem-on.svg';

interface UserPostListProps {
  saleItem: Product[],
  post: Posts[]
  loading: boolean
}

const UserPostList = ({ saleItem, post, loading }: UserPostListProps) => {

  const { accountname } = useParams() as { accountname: string };
  const location = useLocation();

  const path = location.pathname;
  const selectedPath = (path.split('/'))[3];

  return (
    <>
      <section>
        <TypeTabsWrapperStyle style={{ border: loading ? 'none' : '' }}>
          <TypeTabsStyle style={{ display: loading ? 'none' : 'block' }}>
            <TabStyle to={`/profile/${accountname}`}>
              <span className='a11y-hidden'>앨범형 포스트 버튼</span>
              {selectedPath === undefined ? <IconPostAlbumOn /> : <IconPostAlbumOff />}
              <TabStyle to={`/profile/${accountname}/posts`}>
                <span className='a11y-hidden'>포스트 버튼</span>
                {selectedPath === 'posts' ? <IconPostListOn /> : <IconPostListOff />}
              </TabStyle>
            </TabStyle>
            <TabStyle to={`/profile/${accountname}/saleitem`}>
              <span className='a11y-hidden'>판매상품 버튼</span>
              {selectedPath === 'saleitem' ? <IconSaleOn /> : <IconSaleOff />}
            </TabStyle>
          </TypeTabsStyle>
          <PostWrapperStyle>
            {selectedPath === 'posts' && <PostList visiblePost={post} loading={loading} />}
            {selectedPath === undefined && <AlbumList visiblePost={post} loading={loading} />}
            {selectedPath === 'saleitem' && <SaleItemList saleItem={saleItem} loading={loading} />}
          </PostWrapperStyle>
        </TypeTabsWrapperStyle>
      </section>
    </>
  );
}

export default UserPostList

const TypeTabsWrapperStyle = styled.div`
  border-top: 0.5px solid var(--box-shadow-color);
`;

const TypeTabsStyle = styled.div`
  height: 44px;
  margin: auto;
  padding: 10px;
  text-align: right;
`;

const TabStyle = styled(Link)`
  margin-left: 10px;
`;

const PostWrapperStyle = styled.div`
  height: calc( var(--screen-nav-height) - 358px);
  overflow-y: auto;
  overflow-x: hidden;
  max-width: var(--basic-width);
  margin: auto;
  ::-webkit-scrollbar {
    background-color: var(--background-color);
    width: 0px;
  }
`;