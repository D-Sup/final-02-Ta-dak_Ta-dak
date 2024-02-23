import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { useModalStack } from '../../hooks/useModalStack';
import ProductDetailModal from './ProductDetailModal';

const SaleItem = ({ saleItem, loading }: { saleItem: Product, loading: boolean }) => {

  const { push } = useModalStack();

  return (
    <SaleItemStyle onClick={() => {
      push(ProductDetailModal, { saleItem })
    }}>
      {loading ?
        <>
          <Skeleton baseColor={'var(--skeleton-color)'} style={{ width: '100%', aspectRatio: '150/115', marginBottom: '10px' }} />
          <Skeleton baseColor={'var(--skeleton-color)'} width={100} height={20} style={{ marginBottom: '5px' }} />
          <Skeleton baseColor={'var(--skeleton-color)'} width={80} height={18} />
        </>
        :
        <>
          <h3 className='a11y-hidden'>{saleItem.itemName}</h3>
          <img src={saleItem.itemImage} alt={saleItem.itemName} />
          <span className='itemName'>{saleItem.itemName}</span>
          <span className='itemPrice'>{saleItem.price.toLocaleString()}원</span>
        </>
      }
    </SaleItemStyle>
  );
}

export default SaleItem

const SaleItemStyle = styled.button`
  width: calc((var(--basic-width) / 2) - 45px);
  text-align: start;
  margin: auto;

  img {
    width: 100%;
    aspect-ratio: 150/115;
    border-radius: 8px;
    border: 0.8px solid #dad3d3;
    margin-bottom: 10px;
    object-fit: cover;
  }

  span {
    /* 한줄 넘어가면 말줄임 되게 */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .itemName {
    display: block;
    font-size: var(--font--size-lg);
    color: var(--text-color-1);
  }

  .itemPrice {
    color: var(--basic-color-2);
    font-size: var(--font--size-md);
    font-weight: var(--font--Bold);
  }
`;