import { useEffect, useRef } from 'react'
import useFittingStore from './store'
import Views from './Components/Views'
import Products from './Components/Products'
import Preloader from './Components/Preloader'
import styles from './App.module.scss'
import {Step, Steps} from "intro.js-react"
import 'intro.js/introjs.css'
import {useMatchMedia} from './Hooks'
import {getBooleanVal} from './Helpers'

import IntroJs from 'intro.js'

function App() {
    const loading = useFittingStore(state => state.loading)
    const enableLearn = useFittingStore(state => state.enableLearn)
    const setEnableLearn = useFittingStore(state => state.setEnableLearn)
    const toggleVisibleFitControllers = useFittingStore(state => state.toggleVisibleFitControllers)
    const fetchFittingInitData = useFittingStore(state => state.fetchFittingInitData)
    const selected = useFittingStore(state => state.selected)
    const viewed = useFittingStore(state => state.viewed)
    const {isDesktop, isFullscreen} = useMatchMedia()
    const {wrapper, title, container, views, products} = styles

    const isSelected = getBooleanVal(selected)
    const isViewed = getBooleanVal(viewed)
    const isThereData = isSelected || isViewed

    useEffect(() => {
        fetchFittingInitData()
    }, [fetchFittingInitData])

    useEffect(() => {
        window.document.addEventListener("fitting-update", fetchFittingInitData);
        return () => window.document.removeEventListener("fitting-update", fetchFittingInitData)
    }, [fetchFittingInitData])

    const introRef = useRef<IntroJs | null>(null)

    const handleAfterChange = () => {
        if (introRef.current) {
            introRef.current.refresh()
        }
    }

    const steps: Step[] = [
        {
            element: '[data-guide="sketch"]',
            intro: 'Вначале необходимо добавить изображение интерьера на эскиз примерки, кликнув на одну из картинок в галерее',
        },
    ]

    if (isThereData) {
        steps.push({
            element: '[data-guide="product"]',
            intro: 'Клик по изображению товара позволит добавить его на эскиз примерки',
        })
    }

    steps.push(...[
        {
            element: '[data-guide="fit-controllers"]',
            intro: 'С помощью элементов управления можно изменять вид товара на холсте',
        },
        {
            element: '[data-guide="remove"]',
            intro: 'Клик по иконке корзины позволит удалить товар с эскиза примерки',
            position: 'top'
        },
        {
            element: '[data-guide="increase"]',
            intro: 'С помощью увеличительного стекла со знаком + (плюс) можно увеличить товар',
            position: 'top'
        },
        {
            element: '[data-guide="decrease"]',
            intro: 'А увеличительное стекло со знаком - (минус) поможет уменьшить товар',
            position: 'top'
        },
        {
            element: '[data-guide="scale"]',
            intro: 'Клик по этой иконке поможет отобразить товар по горизонтали',
            position: 'top'
        },
        {
            element: '[data-guide="right"]',
            intro: 'Для того чтобы повернуть товар по часовой стрелке, нужно кликнуть на круговую иконку со стрелкой вправо',
            position: 'top'
        },
        {
            element: '[data-guide="left"]',
            intro: 'А чтобы повернуть товар на эскизе против часовой стрелки, нужно будет кликнуть по круговой иконке со стрелкой влево',
            position: 'top'
        },
        {
            element: '[data-guide="upload"]',
            intro: 'Кликнув по иконке фотоаппарата, можно загрузить свой интерьер в виджет',
        },
        {
            element: '[data-guide="download"]',
            intro: 'Клик по дискетке позволит сохранить результат примерки на устройство',
        },
        {
            element: '[data-guide="guide"]',
            intro: 'В любой момент можно заново запустить Гид по виджету',
        },
        {
            element: '[data-guide="backlink"]',
            intro: 'Иконка домика нужна чтобы вернуться на главную страницу',
        }

    ])

    if (isDesktop || isFullscreen) {
        steps.push({
            element: '[data-guide="toggle"]',
            intro: 'Клик по этой иконке покажет или скроет панель управления виджетом',
        })
    }

    return (
        <>
            <div className={wrapper}>
                <h2 className={title}>Примерка</h2>
                <div className={container}>
                    {loading
                        ? <Preloader/>
                        : <>
                            <section className={views}>
                                <Views/>
                            </section>
                            <section className={products}>
                                <Products/>
                            </section>
                        </>
                    }
                </div>
            </div>
            <Steps
                ref={introRef}
                steps={steps}
                initialStep={0}
                enabled={enableLearn}
                options={{
                    nextLabel: 'След.',
                    prevLabel: 'Пред.',
                    doneLabel: 'Завершить',
                    showBullets: false,
                    showProgress: false,
                    hidePrev: true,
                    tooltipClass: 'customGuide',
                    disableInteraction: true,
                    showStepNumbers: true,
                    exitOnOverlayClick: false,
                    stepNumbersOfLabel: 'из',
                    buttonClass: 'customGuide__btn'
                }}
                onExit={() => {
                    setEnableLearn(false)
                    toggleVisibleFitControllers(false)
                }}
                onAfterChange={handleAfterChange}
                // Задрежка перед сметой шагов
                // onBeforeChange={() => {
                //     return new Promise(function (resolve) {
                //         setTimeout(resolve, 100)
                //     })
                // }}
            />
        </>
    )
}

export default App
