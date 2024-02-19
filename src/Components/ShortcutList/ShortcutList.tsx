import { useId } from 'react'
import { Tooltip } from 'react-tippy'
import useFittingStore from '../../store'
import style from './ShortcutList.module.scss'

interface ShortcutListProps {
    sketchRef: React.RefObject<HTMLDivElement>
    imgRefs: { [key: string]: React.RefObject<HTMLImageElement> }
}

const ShortcutList: React.FC<ShortcutListProps> = ({ imgRefs, sketchRef}) => {
    const id = useId()
    const products = useFittingStore(state => state.product)
    const positionProduct = useFittingStore(state => state.positionProduct)
    const setActiveProduct = useFittingStore(state => state.setActiveProduct)
    const { list, item, item_active, btn, img} = style
    const isProducts = products.length !== 0

    let isVisibleProducts = false

    if (isProducts) {
        const visibleProds = products.filter(el => el.visibility)
        isVisibleProducts = visibleProds.length !== 0
    }

    const getPositions = (wrap: HTMLDivElement | null, img: HTMLImageElement | null) => {
        if (!wrap) return
        const wrapWidth = wrap.offsetWidth
        const wrapHeigth = wrap.offsetHeight

        if (!img) return
        const imgWidth = img.offsetWidth
        const imgHeigth = img.offsetHeight

        const posX = (wrapWidth - imgWidth) / 2
        const posY = (wrapHeigth - imgHeigth) / 2

        return [posX, posY]
    }

    const handler = (idx: number) => {
        const position = getPositions(sketchRef.current, imgRefs[idx].current)

        if (!position) return

        positionProduct(position[1], position[0], idx)
        setActiveProduct(idx)
    }

    return (
        !isProducts || !isVisibleProducts ? null :
        <ul className={list}>
            {
                products.map((el, idx) => !el.visibility ? null :
                    <li key={`${idx}-${id}`} className={el.active ? `${item} ${item_active}` : item}>
                        <Tooltip title="Переместить в центр" distance={9} arrow sticky>
                            <button className={btn} onClick={() => handler(idx)}>
                                <img className={img} src={el.src} alt="" />
                            </button>
                        </Tooltip>
                    </li>
                )
            }
        </ul>
    )
}

export default ShortcutList
