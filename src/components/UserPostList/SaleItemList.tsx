import styled from 'styled-components';

import SaleItem from '../common/SaleItem';

import { ReactComponent as NoPost } from '../../assets/img/sleepbonfire.svg';


const SaleItemList = ({ saleItem, loading }: { saleItem: Product[], loading: boolean }) => {

  return (
    <>
      <h2 className="a11y-hidden">판매상폼</h2>
      <SaleItemListStyle>
        {saleItem.map((item) => (
          <SaleItem saleItem={item} key={item.id} loading={loading} />
        ))}
      </SaleItemListStyle>

      {saleItem.length === 0 && !loading &&
        <NoVisiblePost>
          <div className="noPostWrapper">
            <div>
              <NoPost />
            </div>
            <span>판매상품이 없습니다</span>
          </div>
        </NoVisiblePost>
      }

    </>
  );
}

export default SaleItemList

const SaleItemListStyle = styled.div`
  display: grid;
  width: var(--basic-width);
  padding: 30px;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
`;

const NoVisiblePost = styled.div`
  text-align: center;
  width: 100%;
  height: 100%;
  position: relative;
  .noPostWrapper {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
  }
  span {
    color: var(--text-color-1);
    font-size: var(--font--size-md);
  }
`;