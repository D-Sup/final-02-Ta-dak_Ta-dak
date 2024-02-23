import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useModalStack } from '../hooks/useModalStack';
import { modalStackAtom } from '../recoil/AtomModalStackState';

import { ModalStackAtomType } from '../recoil/AtomModalStackState';


import styled, { css } from 'styled-components';

const ModalComponent = ({ modal }: { modal: ModalStackAtomType }) => {
  const { Component, props, selectOptions, actions, modalType } = modal;
  const { pop } = useModalStack();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const close = (): void => {
    setIsOpen(false);
    setTimeout(() => {
      pop();
    }, 400)
  };

  if (!Component) {
    return null;
  }

  switch (modalType) {
    case 'AlertModal':
      return (
        <>
          <AlertModalWrapper isOpen={isOpen}>
            <Component closeModal={pop} props={props} selectOptions={selectOptions} actions={actions} />
          </AlertModalWrapper>
          <AlertBackdrop onClick={pop} isOpen={isOpen}>
          </AlertBackdrop>
        </>
      );
    case 'SlideUpModal':
      return (
        <>
          <SlideUpModalWrapper isOpen={isOpen}>
            <div className='bar'></div>
            <Component selectOptions={selectOptions} actions={actions} />
          </SlideUpModalWrapper>
          <SlideUpBackdrop onClick={close} isOpen={isOpen}>
          </SlideUpBackdrop>
        </>
      );
    case 'CarouselModal':
      return (
        <>
          <CarouselModalWrapper isOpen={isOpen}>
            {
              typeof props !== 'string' &&
              <Component closeModal={close} {...props} />
            }
          </CarouselModalWrapper>
          <CarouselBackdrop onClick={close} isOpen={isOpen}>
          </CarouselBackdrop>
        </>
      );
    default:
      return (
        <>
          <SlideUpModalWrapper isOpen={isOpen}>
            <div className='bar'></div>
            {
              typeof props !== 'string' &&
              <Component closeModal={close} {...props} />
            }
          </SlideUpModalWrapper>
          <SlideUpBackdrop onClick={close} isOpen={isOpen}>
          </SlideUpBackdrop>
        </>
      )
  }
};

const ModalStack = () => {
  const modalStack = useRecoilValue(modalStackAtom);

  return (
    <>
      {modalStack.map((modal, index) => (
        <ModalComponent key={index} modal={modal} />
      ))}
    </>
  );
};

export { ModalStack };

const blurOn = css`
  background: rgba(0, 0, 0, .3);
`;

const blurOff = css`
  background: rgba(0, 0, 0, 0);
`;

const slideUp = css`
  transform: translate(-50%, 0);
`;

const slideDown = css`
  transform: translate(-50%, 100%);
`;

const BackdropStyle = css<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgb(0 0 0 / 35%);
  transition: background .4s 
  ${({ isOpen }) => isOpen ? 'ease' : 'ease-in'};
  ${blurOff}
  ${({ isOpen }) => isOpen && blurOn} 
`;

const AlertBackdrop = styled.div`
  ${BackdropStyle}
  z-index: 9999;
`;

const AlertModalWrapper = styled.div<{ isOpen: boolean }>`
  z-index: 99999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center; 
  justify-content: center;
  transition: opacity .4s 
  ${({ isOpen }) => isOpen ? 'ease' : 'ease-in'};
  opacity: ${({ isOpen }) => isOpen ? 1 : 0}; 
  `;

const SlideUpBackdrop = styled.div`
    ${BackdropStyle}
    z-index: 999;
  `;

const SlideUpModalWrapper = styled.div<{ isOpen: boolean }>`
  z-index: 9999;
  position: fixed;
  bottom: 0;
  left: 50%;
  width: 100vw;
  max-width: 500px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  font-size: var(--font-size-md);
  background: var(--modal-background-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform .4s
  ${({ isOpen }) => isOpen ? 'ease' : 'ease-in'};
  ${slideDown}
  ${({ isOpen }) => isOpen && slideUp}

  .bar {
    width: 50px;
    height: 4px; 
    margin: 18px 0;   
    background: #DBDBDB;
    border-radius: 5px;
  }
`;

const CarouselBackdrop = styled.div<{ isOpen: boolean }>`
  opacity: 0;
  opacity: ${({ isOpen }) => isOpen && .5};
  background-color: #000;
  pointer-events: ${({ isOpen }) => isOpen ? "auto" : "none"};
  transition: opacity 0.3s;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100vw;
  height: 100vh;
`

const CarouselModalWrapper = styled.div<{ isOpen: boolean }>`
  opacity: 0;
  opacity: ${({ isOpen }) => isOpen ? 1 : 0};
  pointer-events: ${({ isOpen }) => isOpen ? "auto" : "none"};
  transform: translate(-50%, -50%) ${({ isOpen }) => isOpen ? "scale(1)" : "scale(1.2)"};
  transition: all 0.3s;
  position: fixed;
  top: 45%;
  left: 50%;
  z-index: 9999;
  
  button {
    cursor: pointer;
  }
  .prev-btn, 
  .next-btn {
    width: 80px;
    height: 80px;
    position: absolute;
    opacity: 0.7;
    bottom: -80px;
    
    @media (min-width: 768px) {
      width: 100px;
      height: 70%;
      top: 50%;
    } 
  }
  .prev-btn {
    left: 50px;
    
    @media (min-width: 768px) {
      transform: translateY(-50%);
      left: -100px;
    } 
  }
  .next-btn {
    right: 50px;
    transform: rotate(180deg);
    
    @media (min-width: 768px) {
      transform: translateY(-50%) rotate(180deg);
      right: -100px;
    } 
  }
  .cancel-btn {
    position: absolute;
    top: -35px;
    right: 10px;
  }
`;