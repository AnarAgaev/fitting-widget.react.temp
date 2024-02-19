import React, {useRef, useState} from 'react'
import {useMatchMedia} from '../../Hooks'
import useFittingStore from '../../store'
import SwiperSketches from '../SwiperSketches'
import AppControllers from '../AppControllers'
import FitControllers from '../FitControllers'
import Fit from '../Fit'
import styles from './Views.module.scss'

const Views:React.FC = () => {
    const sketchesVisible = useFittingStore(state => state.sketchesVisible)
    const {isMobile, isTablet, isDesktop, isFullscreen} = useMatchMedia()
    const {body, sketches, sketches_show} = styles

    const sketchRef = useRef<HTMLImageElement>(null)

    const [imgRefs, updateImgRef] = useState({})

    const pushImgRef = (idx: number, imgRef: React.RefObject<HTMLImageElement>) => {
        const newImgRefs = imgRefs
        newImgRefs[idx] = imgRef
        updateImgRef(newImgRefs)
    }

    const sketchesClass = sketchesVisible
        ? `${sketches} ${sketches_show}`
        : sketches

    return (
        <>
            {
                isTablet || isMobile
                    ? <div className={sketchesClass}>
                        <SwiperSketches/>
                    </div>
                    : null
            }
            <div className={body} data-cy="body">
                <AppControllers sketchRef={sketchRef} imgRefs={imgRefs} />
                <Fit sketchRef={sketchRef} pushImgRef={pushImgRef} />
                <FitControllers imgRefs={imgRefs} sketchRef={sketchRef} />
            </div>
            {
                isDesktop || isFullscreen
                    ? <div className={sketches}>
                        <SwiperSketches/>
                    </div>
                    : null
            }
        </>
    );
}

export default Views;
