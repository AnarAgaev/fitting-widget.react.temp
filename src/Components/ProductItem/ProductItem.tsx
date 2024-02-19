import React, { useState, useRef } from 'react'
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable'
import useFittingStore from '../../store'
import styles from './ProductItem.module.scss'

interface Props {
    product,
    idx: number,
    parentRef: React.RefObject<HTMLDivElement>,
    pushImgRef: (id: number, imgRef: React.RefObject<HTMLImageElement>) => void
}

const ProductItem: React.FC<Props> = (props) => {
    const positionProduct = useFittingStore(store => store.positionProduct)
    const setActiveProduct = useFittingStore(store => store.setActiveProduct)
    const products = useFittingStore(store => store.product)

    const nodeRef = useRef<HTMLDivElement>(null)
    const imgRef = useRef<HTMLImageElement>(null)
    const [active, setActive] = useState(false)
    const { product, idx, parentRef, pushImgRef } = props
    const { drag, drag_active, drag_visible, img } = styles

    let wrapClazz = `${drag}`
    if (product.active) wrapClazz = wrapClazz + ` ${drag_active}`
    if (product.visibility) wrapClazz = wrapClazz + ` ${drag_visible}`

    const productStyle = () => {
        return {
            width: `${product.size}%`,
            cursor: active ? 'grabbing' : 'grab'
        }
    }

    const imgStyle = () => {
        return {
            transform: `rotate(${product.rotate}deg) scale(${product.scale}, 1)`
        }
    }

    const getPositions = (node: HTMLDivElement) => {
        const parentWidth = node.offsetWidth
        const parentHeigth = node.offsetHeight
        const childWidht = parentWidth * 0.3
        const childHeight = childWidht
        const posX = (parentWidth - childWidht) / 2
        const posY = (parentHeigth - childHeight) / 2
        return [posX, posY]
    }

    const initDragPosition = (parentRef: React.RefObject<HTMLDivElement>) => {
        const parent = parentRef.current
        if (!parent) return { x: 0, y: 0 }

        const [posX, posY] = getPositions(parentRef.current)
        return { x: posX, y: posY }
    }

    const handleStart = () => {
        setActive(true)

        const activeProductIdx = products.findIndex(product => product.active)
        if (activeProductIdx === idx) return

        setActiveProduct(idx)
    }

    const handleStop = (e: DraggableEvent, data: DraggableData) => {
        setActive(false)
        positionProduct(data.y, data.x, idx)
        e
    }

    const handleImgLoaded = (parentRef: React.RefObject<HTMLDivElement>) => {
        const parent = parentRef.current
        if (!parent) return

        const [posX, posY] = getPositions(parentRef.current)
        positionProduct(posY, posX, idx)

        pushImgRef(idx, imgRef)
    }

    const updatePosition = () => {
        if (product.left === 0 && product.top === 0) {
            return initDragPosition(parentRef)
        }
        return { x: product.left, y: product.top }
    }

    return(
        <Draggable
            nodeRef={nodeRef}
            defaultPosition={initDragPosition(parentRef)}
            position={updatePosition()}
            onStart={handleStart}
            // onDrag={(e, data) => handleDrag(e, data)}
            onStop={(e, data) => handleStop(e, data)} >

            <div ref={nodeRef}
                className={wrapClazz}
                style={productStyle()}
                onClick={e => e.stopPropagation()}
                data-cy="product-sketched">

                <img ref={imgRef}
                    src={product.src}
                    className={img}
                    style={imgStyle()}
                    onLoad={() => handleImgLoaded(parentRef)}
                    alt="" />
            </div>
        </Draggable>
    )
}

export default ProductItem