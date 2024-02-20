import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { postProduct, editProduct } from "../api/productAPI";
import useImageUploader from "../hooks/useImageUploader";
import { useModalStack } from "../hooks/useModalStack";

import styled from "styled-components"

import Alert from "../components/common/Alert";
import Input from '../components/common/Input';
import UploadHeader from '../components/header/UploadHeader';
import { FileUploadSm } from '../components/common/FileUpload';

import emptyImg from '../assets/img/empty.svg'

const AddProductPage = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const getItem = location.state?.saleItem || null;

  const [productName, setProductName] = useState<string>(getItem?.itemName || '');
  const [productPrice, setProductPrice] = useState<string>(getItem?.price.toLocaleString() || '');
  const [productNameMsg, setProductNameMsg] = useState<string>('');
  const [productExplain, setProductExplain] = useState<string>(getItem?.link);
  const [productNameValid, setProductNameValid] = useState<boolean>(true);
  const [productPriceValid, setProductPriceValid] = useState<boolean>(true);

  const { push } = useModalStack();
  const { handleImageChange, imageURL, imagePath, uploadValidity } = useImageUploader();

  const handleProductName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setProductName(event.target.value.toLocaleString())
    if (productName.length >= 2 && productName.length <= 15) {
      setProductNameValid(true)
      setProductNameMsg('')
    } else {
      setProductNameValid(false)
      setProductNameMsg('2~15자 이내로 입력해주세요.')
    }
  }

  const handleProductPrice = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const pricePattern = /^[1-9][0-9]*$/
    const formatValue = event.target.value.replace(/,/g, '');
    setProductPrice(Number(formatValue).toLocaleString());
    if (pricePattern.test(formatValue)) {
      setProductPriceValid(true)
    } else {
      setProductPriceValid(false)
      setProductPrice('');
    }
  }

  const handleUploadBtnClick = async (): Promise<void> => {
    if (productName && productPrice) {
      if (location.pathname === '/addproduct' && imagePath === false) {
        push(Alert,
          '상품 이미지가 없습니다.',
          ['확인'],
          [null],
          'AlertModal'
        )
      } else if (location.pathname === '/addproduct') {
        await postProduct(productName, Number(productPrice.replace(/,/g, '')), productExplain, imagePath as string)
        navigate(-1);
      } else if (location.pathname === '/editproduct') {
        await editProduct(getItem.id, productName, Number(productPrice.replace(/,/g, '')), productExplain, imagePath || getItem?.itemImage)
        navigate(-1);
      }
    }
  }

  useEffect(() => {
    if (uploadValidity === '유효하지 않은 파일') {
      push(Alert,
        '잘못된 업로드입니다.',
        ['확인'],
        [null],
        'AlertModal'
      )
    }
  }, [uploadValidity])

  return (
    <>
      <UploadHeader contents={'저장'} valid={!!imagePath && !!productName && !!productPrice} handleUploadBtnClick={handleUploadBtnClick} />
      <AddProductPageStyle>
        <p>이미지 등록</p>
        <div className='addImg'>
          <FileInputStyle>
            <img src={imageURL || getItem?.itemImage || emptyImg} alt='' className='showImg' />
            <div className='uploadImgBtn'>
              <FileUploadSm id={'uploading-img'} onChange={handleImageChange} aria-label="FileInput" />
            </div>
          </FileInputStyle>
        </div>
        <div className='inputProductInfo'>
          <Input
            id={'product-name'}
            type={'text'}
            label={'상품명'}
            placeholder={'2~15자 이내여야 합니다.'}
            valid={productNameValid}
            alertMsg={productNameMsg}
            value={productName || getItem?.productName}
            onChange={handleProductName}
          />
          <Input
            id={'product-price'}
            type={'text'}
            label={'가격'}
            placeholder={'숫자만 입력 가능합니다.'}
            valid={productPriceValid}
            value={productPrice}
            onChange={handleProductPrice}
          />
        </div>
        <p className='textAreaTitle'>상품 설명</p>
        <textarea
          name='productInfo'
          id='product-detail'
          cols={30}
          rows={10}
          value={productExplain}
          onChange={(event) => setProductExplain(event.target.value)}
          aria-label="상품 설명 편집기"
        ></textarea>
      </AddProductPageStyle>
    </>
  )
}

export default AddProductPage

const AddProductPageStyle = styled.div`
  width: 322px;
  height: var(--screen-height);
  margin: 0 auto;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    background-color: transparent;
    width: 0px;
  }

  .showImg {
    width: 322px;
    height: 204px;
    margin-top: 15px;
    border-radius: 10px;
    border: 0.5px solid var(--basic-color-6);
    object-fit: cover;
  }

  .uploadImgBtn {
    position: absolute;
    bottom: 12px;
    right: 12px;
  }

  p {
    font-size: var(--font--size-sm);
    font-weight: var(--text-color-1);
    font-weight: var(--font--Regular);
    margin-top: 30px;
    color: var(--text-color-1);
  }

  .inputProductInfo {
    margin-top: 20px;
  }

  .textAreaTitle {
    font-size: var(--font--size-sm);
    margin: 0;
  }

  textarea {
    background-color: var(--basic-color-4);
    color: var(--common-text-color-2);
  }

  #product-detail {
    font-family: 'Noto Sans KR', sans-serif;
    font-size: var(--font--size-sm);
    width: 322px;
    height: 245px;
    border: none;
    outline: none;
    resize: none;
    margin-top: 20px;
  }

  @media (min-width: 768px) {
    height: calc(var(--screen-height) - 48px);
    padding: 0px 0px 26px 0px;
    width: 500px;
    
    p {
      margin: 0;
    }
    .showImg {
      width: 500px;
    }
    #product-detail {
      width: 500px;
    }
  }
`;

const FileInputStyle = styled.button`
    position: relative;
    display: block;
    margin: 0 auto;
  `;
