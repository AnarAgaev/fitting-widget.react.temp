import React, {useState} from 'react'
import useFittingStore from '../../store'
import SwiperCore, {Navigation} from 'swiper'
import {LazyLoadImage} from 'react-lazy-load-image-component'
import {Swiper, SwiperSlide} from 'swiper/react'
import styles from './SwiperSketches.module.scss'
import 'swiper/scss'

SwiperCore.use([Navigation])

const SwiperSketches: React.FC = () => {
    const sketches = useFittingStore(state => state.sketches)
    const setActiveSketch = useFittingStore(state => state.setActiveSketch)
    const { swiper, slide, card, btn, pic, pic_loaded, hover, active} = styles
    const [isImgLoaded, setImgLoaded] = useState(false)

    return (
        <Swiper id='swiperSketches'
                className={swiper}
                slidesPerView={'auto'}
                watchOverflow
                observer
                observeParents
                observeSlideChildren
                navigation>
            {
                sketches.map((sketch, idx) => (
                    <SwiperSlide key={sketch.id} className={slide}>
                        <div className={card}>
                            <button className={btn} onClick={() => setActiveSketch(sketch.id)} data-guide={idx === 0 ? 'sketch' : null}>
                                <LazyLoadImage
                                    className={isImgLoaded ? `${pic} ${pic_loaded}` : pic}
                                    src={sketch.preview}
                                    afterLoad={() => setImgLoaded(true)}
                                    alt=""
                                    data-cy="sketch"/>
                                <span className={sketch.active ? active : hover}></span>
                            </button>
                        </div>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    )
}

export default SwiperSketches
