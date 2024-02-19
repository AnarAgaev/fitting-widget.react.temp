const slideSketchesToStart = () => {
  const swiper = document.querySelector('#swiperSketches .swiper-wrapper') as HTMLDivElement | null

  if (swiper) {
    swiper.style.transform = 'none'
    swiper.style.transitionDuration = '0'
  }
}

export default slideSketchesToStart