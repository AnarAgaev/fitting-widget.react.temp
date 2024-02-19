import React, {useState} from 'react'
import useFittingStore from '../../store'
import {LazyLoadImage} from 'react-lazy-load-image-component'
import {useActiveSketches} from '../../Hooks'
import styles from './Card.module.scss'

interface cardPropsInterface {
    selected?: boolean
    hasScrollbar?: boolean
    id: string | number
    name: string | undefined
    height: string | undefined
    width: string | undefined
    length: string | undefined
    image?: string
    preview: string | undefined
    link: string | undefined
    active: boolean
}

const Card: React.FC<cardPropsInterface> = (props) => {
    const setProduct = useFittingStore(state => state.setProduct)
    const isActiveSketches = useActiveSketches()
    const [isImgLoaded, setImgLoaded] = useState(false)
    const hideLink = window.fitting?.hideLink || false

    const {
        card, card_single, card_inScrollableBlock,
        desc, button, button_loading, button_active,
        pic, pic_loaded, anchor, size_height,
        size_width, size_length, button_with_sketch,
        button_hideLink,card_hideLink
    } = styles

    const {
        selected, hasScrollbar, id, name, height,
        width, length, image, preview, link, active
    } = props

    let cardClass = card
    if (selected) cardClass += ` ${card_single}`
    if (hasScrollbar) cardClass += ` ${card_inScrollableBlock}`
    if (hideLink) cardClass += ` ${card_hideLink}`

    let buttonClass = isImgLoaded
        ? button
        : `${button} ${button_loading}`

    if (!isActiveSketches) buttonClass += ` ${button_with_sketch}`
    if (hideLink) buttonClass += ` ${button_hideLink}`
    if (active) buttonClass += ` ${button_active}`

    const picClass = isImgLoaded
        ? `${pic} ${pic_loaded}`
        : pic

    return (
        <div className={cardClass} data-guide='product'>
            <ul className={desc}>
                {height && <li className={size_height}>{height}</li>}
                {width && <li className={size_width}>{width}</li>}
                {length && <li className={size_length}>{length}</li>}
            </ul>
            <div onClick={() => setProduct(image ? image : '', id)}
                className={buttonClass} draggable={false}
                data-text={
                    isActiveSketches
                        ? 'Примерить товар'
                        : 'Сначала необходимо добавить фотографию интерьера'
                }
                data-cy="poduct-button">
                <LazyLoadImage
                    className={picClass}
                    src={preview}
                    afterLoad={() => setImgLoaded(true)}
                    alt={name}
                    data-cy="poduct-image" />
            </div>
            {hideLink ? <></> : <a className={anchor} href={link} target='_blank'>Перейти к товару</a>}
        </div>
    );
}

export default Card
