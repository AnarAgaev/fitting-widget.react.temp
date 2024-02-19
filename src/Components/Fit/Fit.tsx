import React, { useId } from 'react'
import useFittingStore from '../../store'
import Instruction from '../Instruction'
import {getActiveSketch} from '../../Helpers'
import ProductItem from '../ProductItem'
import styles from './Fit.module.scss'

interface Props {
    sketchRef: React.RefObject<HTMLImageElement>
    pushImgRef: (idx: number, imgRef: React.RefObject<HTMLImageElement>) => void
}

const Fit: React.FC<Props> = (props) => {
    const selected = useFittingStore(state => state.selected)
    const sketches = useFittingStore(store => store.sketches)
    const product = useFittingStore(store => store.product)
    const resetActiveProduct = useFittingStore(store => store.resetActiveProduct)
    const { fit, fit_resize, fit_placeholder, pic } = styles
    const sketch = getActiveSketch(sketches)

    let fitClass = selected ? fit : fit + ' ' + fit_resize
    if (sketch) fitClass += ` ${fit_placeholder}`

    const parentRef = React.useRef<HTMLDivElement>(null)
    const id = useId()
    const { sketchRef, pushImgRef } = props

    return (
        <div ref={parentRef} className={fitClass} onClick={resetActiveProduct} data-cy="fit">
            {
                sketch
                    ? (<img ref={sketchRef} className={pic}
                            src={sketch.image} draggable={false} alt="" />)
                    : <Instruction />
            }
            {
                product.length > 0 && product !== null
                    ? (
                        product.map((product, idx) => <ProductItem parentRef={parentRef}
                            key={`${idx}-${id}`} idx={idx} product={product} pushImgRef={pushImgRef} />)
                    )
                    : null
            }
        </div>
    )
}

export default Fit
