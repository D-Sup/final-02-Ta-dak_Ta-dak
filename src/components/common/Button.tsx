import styled from 'styled-components';
import Top from '../../assets/img/Top.png';

const YellowBtnStyle = styled.button`
  width: 120px;
  height: 41px;
  font-size: var(--font--size-md);
  background-color: var(--modal-hover-color);
  border-radius: 44px;
  color: #000;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  transition: .3s;
  &:hover {
    background-color: var(--basic-btn-color);
  }
  @media (min-width: 768px) {
    width: 150px;
  }
`;

const GreenLgBtnStyle = styled.button`
  width: 322px;
  height: 44px;
  font-size: var(--font--size-md);
  background-color: var(--basic-btn-color);
  color: var(--common-text-color-1);
  border-radius: 10px;
  transition: 0.3s;

  @media (min-width: 768px) {
    width: 500px;
  }
`;

const GreenMdBtnStyle = styled.button`
  width: 120px;
  height: 34px;
  font-size: var(--font--size-md);
  background-color: var(--basic-btn-color);
  color: var(--common-text-color-1);
  border-radius: 30px;
  transition: 0.3s;

  @media (min-width: 768px) {
    width: 163px;
    height: 38px;
  }
`;

const GreenMsBtnStyle = styled.button`
  width: 90px;
  height: 32px;
  font-size: var(--font--size-md);
  background-color: var(--basic-btn-color);
  color: var(--common-text-color-1);
  border-radius: 30px;
  transition: .3s;
`;

const GreenSmBtnStyle = styled.button`
  width: 56px;
  height: 28px;
  font-size: var(--font--size-sm);
  background-color: var(--basic-btn-color);
  color: var(--common-text-color-1);
  border-radius: 30px;
  transition: .3s;
`;

const GreenBackBtnStyle = styled.button`
  width: 120px;
  height: 44px;
  font-size: var(--font--size-md);
  background-color: var(--basic-btn-color);
  color: var(--common-text-color-1);
  border-radius: 30px;
`;

const BoldLgBtnStyle = styled(GreenLgBtnStyle)`
  background-color: var(--bold-btn-color);
  color: var(--common-text-color-1);
`;

const BoldMdBtnStyle = styled(GreenMdBtnStyle)`
  background-color: var(--bold-btn-color);
  color: var(--common-text-color-1);
`;

const BoldMsBtnStyle = styled(GreenMsBtnStyle)`
  background-color: var(--bold-btn-color);
  color: var(--common-text-color-1);
`;

const BoldSmBtnStyle = styled(GreenSmBtnStyle)`
  background-color: var(--bold-btn-color);
  color: var(--common-text-color-1);
`;

const WhiteLgBtnStyle = styled(GreenLgBtnStyle)`
  background-color: #FFF;
  color: var(--common-text-color-2);
  box-shadow: inset 0px 0px 0px 0.7px var(--box-shadow-color);
`;

const WhiteMdBtnStyle = styled(GreenMdBtnStyle)`
  background-color: #FFF;
  color: var(--common-text-color-2);
  box-shadow: inset 0px 0px 0px 0.7px var(--box-shadow-color);
`;

const WhiteMsBtnStyle = styled(GreenMsBtnStyle)`
  background-color: #FFF;
  color: var(--common-text-color-2);
  box-shadow: inset 0px 0px 0px 0.7px var(--box-shadow-color);
`;

const WhiteSmBtnStyle = styled(GreenSmBtnStyle)`
  background-color: #FFF;
  color: var(--common-text-color-2);
  box-shadow: inset 0px 0px 0px 0.7px var(--box-shadow-color);
`;

const GreyLgBtnStyle = styled(GreenLgBtnStyle)`
  background-color: var(--disabled-btn-color);
  color: var(--disabled-btn-text-color);
  cursor: default;
`;

const GreyMdBtnStyle = styled(GreenMdBtnStyle)`
  background-color: var(--disabled-btn-color);
  color: var(--disabled-btn-text-color);
  cursor: default;
`;

const GreyMsBtnStyle = styled(GreenMsBtnStyle)`
  background-color: var(--disabled-btn-color);
  color: var(--disabled-btn-text-color);
  cursor: default;
`;

const GreySmBtnStyle = styled(GreenSmBtnStyle)`
  background-color: var(--disabled-btn-color);
  color: var(--disabled-btn-text-color);
  cursor: default;
`;

const TopBtnStyle = styled.button`
  width: 50px;
  height: 50px;
  background: url(${Top}) no-repeat center center;
  border-radius: 50px;
`;


interface ButtonProps {
  contents: string,
  handleFunc?: () => void
  type: 'button' | 'submit' | 'reset';
}

const createButtonComponent = (StyledButton: any, additionalProps: { disabled?: boolean } = { disabled: false }): (props: ButtonProps) => JSX.Element => {
  return ({ contents, handleFunc, ...rest }: ButtonProps): JSX.Element => {
    const handleClick = handleFunc ? handleFunc : () => { };
    return <StyledButton onClick={handleClick} {...rest} {...additionalProps}>{contents}</StyledButton>;
  }
}

export const GreenLgBtn = createButtonComponent(GreenLgBtnStyle);
export const GreenMdBtn = createButtonComponent(GreenMdBtnStyle);
export const GreenMsBtn = createButtonComponent(GreenMsBtnStyle);
export const GreenSmBtn = createButtonComponent(GreenSmBtnStyle);
export const GreenBackBtn = createButtonComponent(GreenBackBtnStyle);
export const BoldLgBtn = createButtonComponent(BoldLgBtnStyle);
export const BoldMdBtn = createButtonComponent(BoldMdBtnStyle);
export const BoldMsBtn = createButtonComponent(BoldMsBtnStyle);
export const BoldSmBtn = createButtonComponent(BoldSmBtnStyle);
export const WhiteLgBtn = createButtonComponent(WhiteLgBtnStyle);
export const WhiteMdBtn = createButtonComponent(WhiteMdBtnStyle);
export const WhiteMsBtn = createButtonComponent(WhiteMsBtnStyle);
export const WhiteSmBtn = createButtonComponent(WhiteSmBtnStyle);
export const GreyLgBtn = createButtonComponent(GreyLgBtnStyle, { disabled: true });
export const GreyMdBtn = createButtonComponent(GreyMdBtnStyle, { disabled: true });
export const GreyMsBtn = createButtonComponent(GreyMsBtnStyle, { disabled: true });
export const GreySmBtn = createButtonComponent(GreySmBtnStyle, { disabled: true });
export const YellowBtn = createButtonComponent(YellowBtnStyle);
export const TopBtn = createButtonComponent(TopBtnStyle);