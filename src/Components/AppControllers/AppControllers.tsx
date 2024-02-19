import {useState, useId} from "react"
import {slideSketchesToStart} from "../../Helpers"
import ControllerList from "../ControllerList"
import useFittingStore from "../../store"
import styles from './AppControllers.module.scss'

interface Props {
    sketchRef: React.RefObject<HTMLImageElement>
    imgRefs: {[key: string]: React.RefObject<HTMLImageElement>}
}

const AppControllers: React.FC<Props> = ({ sketchRef, imgRefs }) => {

    const toggleSketchesVisible = useFittingStore(state => state.toggleSketchesVisible)
    const toggleVisibleFitControllers = useFittingStore(state => state.toggleVisibleFitControllers)
    const enableLearn = useFittingStore(state => state.enableLearn)
    const [controllerVisible, setControllerVisible] = useState(true)
    const setEnableLearn = useFittingStore(state => state.setEnableLearn)
    const { appControllerList, appControllerList_visible, appControllerList_learning } = styles
    const id = useId()

    // Object with all icon button for App
    const controllers = [
        {
            id: `select-${id}`,
            type: 'select',
            handler: toggleSketchesVisible,
            prompt: 'Показать/скрыть интерьеры'
        },
        {
            id: `upload-${id}`,
            type: 'upload',
            prompt: 'Загрузить свой интерьер'
        },
        {
            id: `download-${id}`,
            type: 'download',
            sketchRef: sketchRef,
            imgRefs: imgRefs,
            prompt: 'Сохранить эскиз примерки'
        },
        {
            id: `guide-${id}`,
            type: 'guide',
            handler: () => {
                setEnableLearn(true)
                toggleVisibleFitControllers(true)
                toggleSketchesVisible(true)
                slideSketchesToStart()
            },
            prompt: 'Гид под виджету'
        },
        {
            id: `backlink-${id}`,
            type: 'backlink',
            prompt: 'Вернуться на главную страницу'
        },
        {
            id: `toggle-${id}`,
            type: 'toggle',
            handler: () => setControllerVisible(!controllerVisible),
            prompt: 'Показать/Скрыть панель'
        }
    ]

    let clazz = controllerVisible
        ? `${appControllerList} ${appControllerList_visible}`
        : appControllerList

    if (enableLearn) clazz = clazz + ` ${appControllerList_learning}`

    return (
        <div className={clazz}>
            <ControllerList controllers={controllers}/>
        </div>
    )
}

export default AppControllers
