import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { modalStackAtom } from '../recoil/AtomModalStackState';
import { useModalStack } from '../hooks/useModalStack';

import styled, { css } from 'styled-components';

const ModalComponent = ({ modal }) => {
  const { Component, props, selectOptions, actions, modalType } = modal;
  const { pop } = useModalStack();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const close = () => {
    setIsOpen(false);
    setTimeout(() => {
      pop();
    }, 400)
  };

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
    default:
      return (
        <>
          <SlideUpModalWrapper isOpen={isOpen}>
            <div className='bar'></div>
            <Component closeModal={close} {...props} />
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

const BackdropStyle = css`
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

const AlertModalWrapper = styled.div`
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

const SlideUpModalWrapper = styled.div`
  z-index: 9999;
  position: fixed;
  bottom: 0;
  left: 50%;
  width: 100vw;
  max-width: 500px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  font-size: var(--font-size-md);
  background-color: var(--modal-color);
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