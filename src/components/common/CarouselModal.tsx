import { useState } from 'react'
import useWindowSize from 'hooks/useWindowSize'

import { ModalStackAtomType } from 'recoil/AtomModalStackState'

import styled from 'styled-components'

import Carousel from './Carousel'

import { ReactComponent as IconArrow } from "../../assets/img/icon-arrow.svg"
import iconCancel from "../../assets/img/icon-cancel-x.svg"

interface CarouselProps extends ModalStackAtomType {
  visiblePost: Posts[],
  selectedIndex: number,
  closeModal: () => void
}

const CarouselModal = ({ visiblePost, selectedIndex, closeModal }: CarouselProps) => {

  const [slideIndex, setSlideIndex] = useState<number>(selectedIndex)

  const { currentWidth } = useWindowSize();

  return (
    <>
      <CarouselContainer>
        <div className="slider-box-container"
          style={{
            transform: currentWidth > 768 ?
              slideIndex === 0 ?
                `translateX(0)` :
                `translateX(calc(${-slideIndex * 100}% - ${slideIndex * 200}px))` :
              `translateX(${-slideIndex * 100}%)`
          }}>
          {visiblePost.map((selectedPost: any) =>
            <Carousel selectedPost={selectedPost} closeModal={closeModal} />
          )}
        </div >

      </CarouselContainer >

      <button className="prev-btn" onClick={() => { setSlideIndex(slideIndex === 0 ? visiblePost.length - 1 : slideIndex - 1) }}>

        <IconArrow fill={'var(--common-text-color-1)'} width={40} />
      </button>
      <button className="next-btn" onClick={() => { setSlideIndex(slideIndex === visiblePost.length - 1 ? 0 : slideIndex + 1) }}>
        <IconArrow fill={'var(--common-text-color-1)'} width={40} />

      </button>
      <button className="cancel-btn"
        onClick={closeModal}>
        <img src={iconCancel} />
      </button>
    </>
  )
}

export default CarouselModal

const CarouselContainer = styled.div`
  max-width: 100vw;
  height: 80vh;
  
  .slider-box-container {
    max-width: 100vw;
    height: inherit;
    display: flex;
    gap: 0;
    transition: .3s;
    width: 100vw;

    @media (min-width: 768px) {
    width: 40vw;
    gap: 200px;

    } 
  }
`;

