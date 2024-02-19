import React, {useEffect, useRef, useState} from 'react'
import useFittingStore from '../../store'
import styles from './Products.module.scss'
import Card from '../Card'
import SwiperProducts from '../SwiperProducts'
import ProductList from '../ProductList'
import {useMatchMedia} from '../../Hooks'
import {getBooleanVal} from '../../Helpers'
import 'swiper/scss'

const Products: React.FC = () => {
    const selected = useFittingStore(state => state.selected)
    const viewed = useFittingStore(state => state.viewed)
    const {isDesktop, isFullscreen} = useMatchMedia()

    const isSelected = getBooleanVal(selected)
    const isViewed = getBooleanVal(viewed)
    const isThereData = isSelected || isViewed

    const {body, body_resize, title, text, caption} = styles

    const bodyClass = selected
        ? body
        : body + ' ' + body_resize

    const ref = useRef<HTMLDivElement>(null);
    const [hasScrollbar, setHasScrollbar] = useState<boolean>(false);

    useEffect(() => {
        const el = ref.current;
        if (el && el.scrollHeight > el.clientHeight) {
            setHasScrollbar(true);
        }
    }, []);

    return (
        <div ref={ref} className={`${bodyClass} custom-scroll-vertical`}>
            {
                isSelected && <>
                    <h2 className={title}>Примерка</h2>
                    <Card selected
                        hasScrollbar={hasScrollbar}
                        id={selected.id}
                        name={selected.name}
                        height={selected.height}
                        width={selected.width}
                        length={selected.length}
                        image={selected.image}
                        preview={selected.preview}
                        link={selected.link}
                        active={selected.active} />
                </>
            }
            {
                isViewed && <>
                    <h2 className={title}>Недавно просмотренные</h2>
                    {
                        isDesktop || isFullscreen
                            ? <ProductList hasScrollbar={hasScrollbar}/>
                            : <SwiperProducts/>
                    }
                </>
            }
            {
                !isThereData && <>
                    <h2 className={caption}>Нет товаров для примерки</h2>
                    <p className={text}>
                        Для использования сервиса примерки, необходимо выбрать один из товаров в каталоге, перейти на его страницу и кликнуть по соответствующей ссылке, либо посетить несколько страниц с детальным описанием товара.
                    </p>
                </>
            }
        </div>
    );
}

export default Products
