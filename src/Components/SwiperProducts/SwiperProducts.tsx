import React from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import useFittingStore from '../../store'
import Card from '../Card'
import styles from './SwiperProducts.module.scss'
import 'swiper/scss'

const SwiperProducts: React.FC = () => {
    const products = useFittingStore(state => state.viewed)
    const {swiper, slide} = styles

    return (
        <Swiper className={swiper}
                slidesPerView={'auto'}
                watchOverflow
                observer
                observeParents
                observeSlideChildren>
            {
                products.map(item => (
                    <SwiperSlide key={item.id} className={slide}>
                        <Card id={item.id}
                            name={item.name}
                            height={item.height}
                            width={item.width}
                            length={item.length}
                            image={item.image}
                            preview={item.preview}
                            link={item.link}
                            active={item.active} />
                    </SwiperSlide>
                ))
            }
        </Swiper>
    )
}

export default SwiperProducts
