
import { useNavigate } from 'react-router-dom'

import styled from 'styled-components';

import DarkModeBtn from '../DarkModeBtn';

import { ReactComponent as IconArrowLeft } from '../../assets/img/icon-arrow-left.svg'
import { ReactComponent as IconSMore } from '../../assets/img/icon-more.svg'

interface BasicHeaderProps {
  isButton: boolean,
  handleFunc?: () => void;
}

const BasicHeader = ({ isButton, handleFunc }: BasicHeaderProps) => {

  const navigate = useNavigate();

  const handleGoBack = (): void => {
    navigate(-1)
  }


  return (
    <BasicHeaderStyle>
      <IconArrowLeft onClick={handleGoBack} style={{ cursor: 'pointer' }} />
      <DarkModeBtnPosition isButton={isButton}>
        <DarkModeBtn />
      </DarkModeBtnPosition>
      {isButton && <IconSMore onClick={handleFunc} style={{ cursor: 'pointer' }} />}
    </BasicHeaderStyle>
  );
}

export default BasicHeader

const BasicHeaderStyle = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 16px;
  padding-right: 12px;
  width: var(--basic-width);
  min-height: 48px;
  box-shadow: var(--header-shadow);
  background-color: var(--header-color);

  @media (min-width: 768px) {
    display: none;
  }
`;

const DarkModeBtnPosition = styled.div<{ isButton: boolean }>`
  position: absolute;
  right: ${({ isButton }) => (isButton) ? '56px' : '12px'};
`;