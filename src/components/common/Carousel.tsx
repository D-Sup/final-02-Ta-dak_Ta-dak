import { useState } from 'react'
import useWindowSize from 'hooks/useWindowSize'

import { useNavigate } from 'react-router-dom'

import styled from 'styled-components'

import UserId from './UserId'
import { ProfileMd } from './Profile'

import errorImg from '../../assets/img/UploadImage404.svg';

const Carousel = ({ selectedPost, closeModal }: { selectedPost: any, closeModal: () => void }) => {

  const [imageSlideIndex, setImageSlideIndex] = useState<number>(0);

  const { currentWidth } = useWindowSize();

  const navigate = useNavigate();

  return (
    <>
      <SliderBox>
        <ProfileContainer key={selectedPost.author._id} onClick={() => {
          navigate(`/profile/${selectedPost.author.accountname}`)
          closeModal();
        }}>
          <ProfileMd url={selectedPost.author.image} />
          <div className='user-info'>
            <span>{selectedPost.author.accountname}</span>
            <UserId id={selectedPost.author.username} />
          </div>
        </ProfileContainer>

        <div className='box-container'
          style={{
            transform: currentWidth > 768 ?
              `translateX(${-imageSlideIndex * 40}vw)` :
              `translateX(${-imageSlideIndex * 100}vw)`
          }}
        >
          {selectedPost.image.map((item: any, index: number) => (
            <div className='box'>
              <img
                key={index}
                src={item}
                onError={(event) => {
                  (event.target as HTMLImageElement).src = errorImg;
                }}
              />
              <span className="slider-title">{selectedPost.content}</span>
            </div>
          ))}
        </div>

        <PreviewContainer>
          {selectedPost.image.length !== 1 && selectedPost.image.map((_: any, index: number) => (
            <button className="preview-box" key={index}
              onClick={() => { setImageSlideIndex(index) }}
              style={{
                backgroundColor: imageSlideIndex === index ? "var(--basic-color-2)" : "var(--common-text-color-1)"
              }}
            >
            </button>
          ))}
        </PreviewContainer>

        <button className="s-prev-btn" onClick={() => { setImageSlideIndex(imageSlideIndex === 0 ? selectedPost.image.length - 1 : imageSlideIndex - 1) }}>
        </button>
        <button className="s-next-btn" onClick={() => { setImageSlideIndex(imageSlideIndex === selectedPost.image.length - 1 ? 0 : imageSlideIndex + 1) }}>
        </button>
      </SliderBox >
    </>
  )
}

export default Carousel


const PreviewContainer = styled.div`
  display: flex;
  gap: 1px;
  position: absolute;
  top: 100px;
  width: 100%;
  &::-webkit-scrollbar {
    height: 0;
  }

  .preview-box {
    display: flex;
    flex-grow: 1;
    width: 20px;
    position: relative;
    height: 5px;
  }
`;

const ProfileContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  gap: 10px;
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 10px;
  top: 15px;
  left: 20px;
  z-index: 1;

  .user-info {
    color: var(--common-text-color-1);
    font-size: var(--font--size-lg);
    padding-bottom: 5px;

    span {
      display: block;
    }
  }
`;

const SliderBox = styled.div`
  position: relative;
  backdrop-filter: blur(10px);
  border-radius: 20px;
  display: flex;
  width: 100%;
  overflow: hidden;
  height: 100%;
  min-width: 100vw;
    
  @media (min-width: 768px) {
    min-width: 40vw;
  } 

  .slider-title {
    z-index: 1;
    word-wrap: break-word;
    width: 90vw;
    pointer-events: none;
    position: absolute;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 10px;
    line-height: 1.5;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, .3);
    color: #FFF;

    @media (min-width: 768px) {
      width: 35vw;
    } 
  }

  .box-container {
    transition: .3s;
    display: flex;
    align-items: center;
  }
  
  .box {
    min-width: 100vw;
    height: 100%;
    position: relative;
    flex-shrink: 0;
    object-fit: cover;

    @media (min-width: 768px) {
      min-width: 40vw;
    } 

    img {
      width: 100vw;
      height: 100%;
      object-fit: contain;

      @media (min-width: 768px) {
        width: 40vw;
      } 
    }
  }

  .s-prev-btn,
  .s-next-btn {
    width: 50%;
    height: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%)
  }

  .s-next-btn {
    right: 0;
  }
`;
