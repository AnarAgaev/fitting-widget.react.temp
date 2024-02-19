import React, {MouseEventHandler} from 'react'
import ImageUploader from '../ImageUploader'
import ImageDownloader from '../ImageDownloader'
import {getButtonIconClass} from '../../Helpers'
import useFittingStore from '../../store'
import {Tooltip} from 'react-tippy'
import 'react-tippy/dist/tippy.css'
import styles from './ButtonIcon.module.scss'

interface ButtonIconProps {
    type: string
    prompt: string
    disabled?: boolean
    handler?: MouseEventHandler
    sketchRef?: React.RefObject<HTMLImageElement>
    imgRefs?: { [key: string]: React.RefObject<HTMLImageElement> }
}

const ButtonIcon: React.FC<ButtonIconProps> = ({ type, prompt, disabled, handler, sketchRef, imgRefs }) => {
    const backlink = useFittingStore(store => store.backlink);
    const clazz = getButtonIconClass(type, styles)

    switch (type) {
        case 'select':
            return (<Tooltip title={prompt} distance={9} arrow sticky>
                <button className={clazz} onClick={handler} disabled={disabled} data-cy="button-controller"></button>
                    </Tooltip>)
        case 'backlink':
            return (<Tooltip title={prompt} distance={9} arrow sticky>
                        <a className={clazz} href={backlink}></a>
                    </Tooltip>)
        case 'guide':
            return (<Tooltip title={prompt} distance={9} arrow sticky>
                <button className={clazz} onClick={handler} disabled={disabled} data-cy="button-controller"></button>
                    </Tooltip>)
        case 'upload':
            return (<Tooltip title={prompt} distance={9} arrow sticky>
                        <label className={clazz}>
                            <ImageUploader />
                        </label>
                    </Tooltip>)
        case 'download':
            return (<Tooltip title={prompt} distance={9} arrow sticky>
                        <label className={clazz}>
                            <ImageDownloader sketchRef={sketchRef} imgRefs={imgRefs} />
                        </label>
                    </Tooltip>)
        default:
            return (
                <Tooltip title={prompt} distance={9} arrow sticky>
                    <button className={clazz} onClick={handler} disabled={disabled} data-cy="button-controller"></button>
                </Tooltip>
            )
    }
}

export default ButtonIcon
