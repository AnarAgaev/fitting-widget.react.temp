import {create} from 'zustand'
import {devtools} from 'zustand/middleware'
import {immer} from 'zustand/middleware/immer'
import {nanoid} from 'nanoid'

interface itemInterface {
    id: string | number
    active: boolean
    name: string | undefined
    height: string | undefined
    width: string | undefined
    length: string | undefined
    image: string | undefined
    preview: string | undefined
    link: string | undefined
}

interface sketcheInterface {
    id: string | number,
    active: boolean,
    image: string | undefined,
    preview: string | undefined
}

interface productInterface {
    src: string,
    top: number,
    left: number,
    size: number,
    rotate: number,
    scale: number,
    id: string | number,
    active: boolean,
    visibility: boolean
}

interface fittingStoreInterface {
    selected: itemInterface
    viewed: itemInterface[]
    sketches: sketcheInterface[]
    backlink: string | undefined
    sketchesVisible: boolean
    loading: boolean
    enableLearn: boolean
    setEnableLearn: (enable: boolean) => void
    error: string | null
    product: productInterface[]
    blockIncProduct: boolean
    blockDecProduct: boolean
    visibleFitControllers: boolean
    toggleVisibleFitControllers: (direction: boolean) => void
    fetchFittingInitData: () => void
    toggleSketchesVisible: (show?: boolean) => void
    setActiveSketch: (id: string | number) => void
    setProduct: (src: string, id: string | number) => void
    removeProduct: () => void
    resizeProduct: (direction: number) => void
    checkResizeButtons: () => void
    toggleScaleProduct: () => void
    rotateProduct: (direction: number) => void
    uploadSketch: (src: string | null) => void
    positionProduct: (top: number, left: number, idx: number) => void
    setActiveProduct: (idx: number) => void
    resetActiveProduct: () => void
}

const useFittingStore = create<fittingStoreInterface>()(
    // persist(
    devtools(
        immer(
            (set, get) => ({
                selected: {
                    id: 0,
                    active: false,
                    name: '',
                    height: '',
                    width: '',
                    length: '',
                    image: '',
                    preview: '',
                    link: ''
                },
                viewed: [],
                sketches: [],
                backlink: undefined,
                sketchesVisible: true,
                loading: false,
                enableLearn: false,
                error: null,
                blockIncProduct: false,
                blockDecProduct: false,
                visibleFitControllers: false,
                product: [],

                fetchFittingInitData: async () => {
                    set({loading: true})

                    try {
                        const url = window.fitting?.source || "https://aws.massive.ru/fitting/fitting-mock-data.json"
                        const products = window.fitting?.products || []
                        let getParam = "?"

                        products.forEach(product => {
                            getParam += "&p[]=" + product
                        })

                        if (window.fitting?.selected) {
                            getParam += "&s=" + window.fitting?.selected
                        }

                        const res = await fetch(url + getParam, {
                            method: "GET"
                        })

                        // const res = await fetch("data-empty.json")
                        // const res = await fetch("data.json")

                        if (!res.ok) throw new Error('Failed to fetch json initial data!')

                        const data = await res.json()
                        const {selected = undefined, viewed = undefined, sketches, backlink} = data

                        set(() => ({
                            selected, viewed, sketches,
                            backlink, loading: false, error: null
                        }))
                    } catch (error: Error | unknown) {
                        if (error instanceof Error) {
                            set({ error: error.message });
                        } else {
                            set({ error: "Unknown error occurred." });
                        }
                    } finally {
                        set({loading: false})
                    }
                },

                toggleSketchesVisible: (show) => {
                    const visible = show !== true
                        ? !get().sketchesVisible
                        : show

                    set({sketchesVisible: visible})
                },

                setActiveSketch: (id: string | number) => {
                    const newSketches = get()
                        .sketches
                        .map(sketch => {
                            return {
                                ...sketch,
                                active: sketch.id === id
                            }
                        })

                    set({sketches: [...newSketches]})
                },

                setProduct: (src, id) => {
                    const defaultProduct = {
                        src: '',
                        size: 30,
                        top: 0,
                        left: 0,
                        rotate: 0,
                        scale: 1,
                        active: false,
                        visibility: true
                    }

                    const isActiveSketch = get().sketches
                        .filter(sketch => sketch.active === true)
                        .length <= 0

                    if (isActiveSketch) return

                    /*
                     * Устанавливаем картинку от выбранного продукта в стэйт
                     * 1. Сбрасываем все активные
                     * 2. Добовляем новый в статусе active
                    */
                    let newProducts = [...get().product]
                    newProducts = newProducts.map(prod => ({ ...prod, active: false }))
                    newProducts.push({...defaultProduct, src, id, active: true})
                    set({ product: newProducts })

                    /*
                     * Выделяем продукт в списке
                     * Сначала проверяем выбранный и если клинкули
                     * по нему, то, его active ставим в true
                    */
                    if (get().selected.id === id) {
                        set({selected: {...get().selected, active: true}})
                        return
                    }

                    /*
                     * Выделяем продукт в списке
                     * Если кликнули по одному из просмотренных,
                     * то клинутому просмотренному ставим true
                    */
                    set({
                        viewed: [...get().viewed.map(item => {
                            return {
                                ...item,
                                active: item.id === id ? true : item.active
                            }
                        })]
                    })
                },

                removeProduct: () => {
                    let deletedProdId: number | string | null = null

                    const newProducts = [...get().product]
                        .map(prod => {
                            if (prod.active === false) return prod

                            const activeProd = {...prod}
                            activeProd.visibility = false
                            activeProd.active = false
                            deletedProdId = activeProd.id

                            return activeProd
                        })

                    set({ product: newProducts })

                    // Деактивинуем карточку товара если на холсте больше нет товаров с удаляемым id
                    const checkActiveProd = () => {
                        const filtered = newProducts.filter(prod => prod.id === deletedProdId && prod.visibility)
                        return filtered.length > 0
                    }

                    if (!checkActiveProd()) {
                        if (deletedProdId === null) return

                        // Сначала проверяем товар в выбранном
                        if (deletedProdId === get().selected.id) {
                            const newSelected = { ...get().selected }
                            newSelected.active = false
                            set({selected: newSelected})
                            return
                        }

                        // Помот проверяем товар в просмотренных
                        let newViewed = [...get().viewed]
                        newViewed = newViewed.map(prod => {
                            if (prod.id !== deletedProdId) return prod

                            prod.active = false
                            return prod
                        })
                        set({viewed: [...newViewed]})
                    }
                },

                resizeProduct: (direction) => {
                    const products = [...get().product]

                    products.forEach(prod => {
                        if (prod.active === true) {
                            let newSize = prod.size

                            if (direction === 1 && newSize < 100) {
                                newSize += 2
                            } else if (direction === -1 && newSize > 10) {
                                newSize -= 2
                            }

                            prod.size = newSize
                        }
                    })

                    set({ product: products })
                    get().checkResizeButtons()
                },

                checkResizeButtons: () => {
                    const product = [...get().product]
                        .filter(product => product.active)

                    if (product.length === 0) return

                    product[0].size >= 100
                        ? set({blockIncProduct: true})
                        : set({blockIncProduct: false})

                    product[0].size <= 10
                        ? set({blockDecProduct: true})
                        : set({blockDecProduct: false})
                },

                toggleScaleProduct: () => {
                    const newProducts = [...get().product]

                    newProducts.forEach(prod => {
                        if (prod.active === true) {
                            prod.scale = prod.scale * -1
                        }
                    })

                    set({ product: newProducts })
                },

                rotateProduct: (direction) => {
                    const newProducts = [...get().product]

                    newProducts.forEach(prod => {
                        if (prod.active === true) {
                            const currentRotate = prod.rotate
                            const newRotate = currentRotate + 5 * direction
                            prod.rotate = newRotate
                        }
                    })

                    set({ product: newProducts })
                },

                positionProduct: (top: number, left: number, idx: number) => {
                    const newProducts = [...get().product]

                    newProducts[idx].top = top
                    newProducts[idx].left = left

                    set({ product: newProducts })
                    get().checkResizeButtons()
                },

                setActiveProduct: (idx: number) => {
                    const newProducts = [...get().product]

                    newProducts.forEach((product, index) => product.active = index === idx)

                    set({ product: newProducts })
                    get().checkResizeButtons()
                },

                resetActiveProduct: () => {
                    const newProducts = [...get().product]
                    newProducts.forEach(product => product.active = false)
                    set({ product: newProducts })
                },

                uploadSketch: (src) => {
                    if (!src) return

                    const newSketch = {
                        id: nanoid(),
                        active: true,
                        image: src,
                        preview: src
                    }

                    const oldSketches = get()
                        .sketches
                        .map(sketch => ({
                            ...sketch,
                            active: false
                        }))

                    set({
                        sketches: [
                            newSketch,
                            ...oldSketches
                        ]
                    })
                },

                setEnableLearn: (enable: boolean) => {
                    set({ enableLearn: enable })
                },

                toggleVisibleFitControllers: (direction: boolean) => {
                    const isLearning = get().enableLearn

                    if (isLearning && direction) {
                        set({ visibleFitControllers: direction })
                        return
                    }

                    if (!isLearning && !direction) {
                        set({ visibleFitControllers: direction })
                        return
                    }

                    if (get().product.length === 0) return
                    set({ visibleFitControllers: direction })
                }
            })
        )
    )
);

export default useFittingStore;
