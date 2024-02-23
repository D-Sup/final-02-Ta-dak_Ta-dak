import { useNavigate, useLocation } from 'react-router-dom';
import { useModalStack } from '../../hooks/useModalStack';
import useUserInfo from 'hooks/useUserInfo';

import { deleteProduct } from '../../api/productAPI';

import styled from 'styled-components';

import Alert from './Alert';

import { ReactComponent as Garland } from '../../assets/img/garland.svg';
import errorImg from '../../assets/img/UploadImage404.svg';


interface ProductDetailModalProps {
  saleItem: Product,
  closeModal: () => void
}

const ProductDetailModal = ({ saleItem, closeModal }: ProductDetailModalProps) => {

  const { push } = useModalStack();

  const navigate = useNavigate();
  const location = useLocation();

  const { accountname } = useUserInfo();
  const selectedId = (location.pathname.split('/'))[2];

  const handleGoAddproduct = (): void => {
    closeModal();
    navigate('/editproduct', {
      state: {
        saleItem,
      },
    });
  };

  const handleDeleteReq = async (): Promise<void> => {
    await deleteProduct(saleItem.id);
    window.location.reload();
  };

  const deleteProductConfirm = (): void => {
    push(Alert, '삭제하시겠습니까?', ['취소', '확인'], [null, handleDeleteReq], 'AlertModal')
  }

  return (
    <>
      <BackgroundStyle>
        <ProductDetailModalStyle >
          <GarlandStyle></GarlandStyle>
          <img
            src={saleItem.itemImage}
            alt={saleItem.itemName}
            onError={(event) => {
              (event.target as HTMLImageElement).src = errorImg;
            }}
          />
          <h2>{saleItem.itemName}</h2>
          <h3>{saleItem.price.toLocaleString()}원</h3>
          <p>상품 설명 혹은 링크</p>
          <pre>{saleItem.link}</pre>
          {selectedId === accountname && (
            <>
              <button className="modifyBtn" onClick={handleGoAddproduct}>
                수정
              </button>
              <button className="deleteBtn" onClick={deleteProductConfirm}> 삭제</button>
            </>
          )}
        </ProductDetailModalStyle>
      </BackgroundStyle>

    </>
  );
}

export default ProductDetailModal

const BackgroundStyle = styled.div`
  width: 100%;
  padding: 10px 20px 50px;
  cursor: pointer;
  z-index: 2;
`;

const ProductDetailModalStyle = styled.div`
  position: relative;
  background-color: var(--modal-background-color);
  border-radius: 20px;
  margin: auto;
  padding: 30px 0px 50px 0px;
  cursor: auto;

  img {
    display: block;
    width: 100%;
    aspect-ratio: 16/10;
    margin: 0 auto;
    border-radius: 10px;
    z-index: 1;
    object-fit: cover;
  }

  h2 {
    font-size: var(--font--size-lg);
    font-weight: 500;
    margin-top: 12px;
    color: var(--invert-color);
  }

  h3 {
    font-size: var(--font--size-md);
    font-weight: var(--font--Bold);
    color: var(--basic-color-2);
    margin-top: 6px;
    line-height: 19px;
  }

  p {
    font-size: var(--font--size-sm);
    margin-top: 30px;
    line-height: 16px;
    color: var(--invert-color);
  }

  pre {
    min-width: 241px;
    width: 100%;
    height: 110px;
    margin-top: 5px;
    font-weight: var(--font--Regular);
    font-size: var(--font--size-sm);
    line-height: 18px;
    padding: 10px 8px;
    word-break: break-all;
    white-space: pre-wrap;
    word-wrap: break-word;
    color: var(--invert-color);
    overflow: auto;
    background-color: var(--modal-hover-color);
    border-radius: 10px;
    ::-webkit-scrollbar {
      width: 5px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #ada3a344; /* 썸네일의 배경색 */
      border-radius: 2px; /* 썸네일의 모서리 반경 */
    }
  }

  .modifyBtn {
    width: 48%;
    height: 35px;
    font-size: var(--font--size-md);
    /* background-color: var(--basic-color-1); */
    background-color: var(--basic-color-1);
    color: var(--common-text-color-1);
    border-radius: 10px;
    position: absolute;
    right: 112px;
    bottom: 0;
    left: 0;
  }

  .deleteBtn {
    width: 48%;
    height: 35px;
    background-color: #FF6B6B;
    font-size: var(--font--size-md);
    color: var(--common-text-color-1);
    border-radius: 10px;
    position: absolute;
    right: 32px;
    bottom: 0;
    right: 0;
  }
`;

const GarlandStyle = styled(Garland)`
  position: absolute;
  top: -12px;
  left: 0;
  z-index: 3;
`;
