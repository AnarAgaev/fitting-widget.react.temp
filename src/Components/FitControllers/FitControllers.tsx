import { useId } from 'react'
import ControllerList from '../ControllerList'
import ShortcutList from '../ShortcutList'
import useFittingStore from '../../store'
import styles from './FitControllers.module.scss'

interface FitControllersProps {
    sketchRef: React.RefObject<HTMLDivElement>
    imgRefs: { [key: string]: React.RefObject<HTMLImageElement> }
}

const FitControllers: React.FC<FitControllersProps> = ({ imgRefs, sketchRef}) => {
    const products = useFittingStore(state => state.product)
    const isVisibleFitControllers = useFittingStore(state => state.visibleFitControllers)
    const removeProduct = useFittingStore(state => state.removeProduct)
    const resizeProduct = useFittingStore(state => state.resizeProduct)
    const blockIncProduct = useFittingStore(state => state.blockIncProduct)
    const blockDecProduct = useFittingStore(state => state.blockDecProduct)
    const toggleScaleProduct = useFittingStore(state => state.toggleScaleProduct)
    const rotateProduct = useFittingStore(state => state.rotateProduct)
    const enableLearn = useFittingStore(state => state.enableLearn)
    const { fitControllerList, fitControllerList_visible, fitControllerList_learning } = styles

    const isActiveProduct = products.findIndex((product) => product.active) !== -1

    let clazz = isActiveProduct || isVisibleFitControllers
        ? `${fitControllerList} ${fitControllerList_visible}`
        : fitControllerList

    if (enableLearn) clazz = clazz + ` ${fitControllerList_learning}`

    const id = useId()

    const controllers = [
        {
            id: `remove-${id}`,
            type: 'remove',
            prompt: 'Удалить товар с эскиза',
            handler: removeProduct
        },
        {
            id: `increase-${id}`,
            type: 'increase',
            prompt: 'Увеличить',
            disabled: blockIncProduct,
            handler: () => resizeProduct(1)
        },
        {
            id: `decrease-${id}`,
            type: 'decrease',
            prompt: 'Уменьшить',
            disabled: blockDecProduct,
            handler: () => resizeProduct(-1)
        },
        {
            id: `scale-${id}`,
            type: 'scale',
            prompt: 'Отобразить по горизонтали',
            handler: toggleScaleProduct
        },
        {
            id: `right-${id}`,
            type: 'right',
            prompt: 'Повернуть по часовой стрелке',
            handler: () => rotateProduct(1)
        },
        {
            id: `left-${id}`,
            type: 'left',
            prompt: 'Повернуть против часовой стрелки',
            handler: () => rotateProduct(-1)
        }
    ]

    return (
        <div className={clazz} data-guide="fit-controllers">
            <ShortcutList imgRefs={imgRefs} sketchRef={sketchRef} />
            <ControllerList controllers={controllers} />
        </div>
    )
}

export default FitControllers
