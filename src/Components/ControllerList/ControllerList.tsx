import React from 'react'
import ButtonIcon from '../ButtonIcon'
import {getControllerItemClass} from '../../Helpers';
import styles from './ControllerList.module.scss'

interface Controller {
    id: string
    type: string
    prompt: string
    disabled?: boolean
    handler?: () => void
    sketchRef?: React.RefObject<HTMLImageElement>
    imgRefs?: { [id: string]: React.RefObject<HTMLImageElement> }
}

interface ControllerListProps {
    controllers: Controller[];
}

const ControllerList: React.FC<ControllerListProps> = ({ controllers }) => {
    return (
        <ul className={styles.list}>
            {
                controllers.map(el => {
                    const clazz = getControllerItemClass(el.type, styles);
                    return (
                        <li data-guide={el.type} key={el.id} className={clazz}>
                            <ButtonIcon type={el.type}
                                handler={el.handler}
                                disabled={el.disabled}
                                sketchRef={el.sketchRef}
                                imgRefs={el.imgRefs}
                                prompt={el.prompt} />
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default ControllerList
