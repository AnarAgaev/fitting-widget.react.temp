import useFittingStore from '../../store'
import {calculateProdImgRotate, calculateSketchPosition} from '../../Helpers'
import styles from './ImageDownloader.module.scss'

interface Props {
	sketchRef?: React.RefObject<HTMLImageElement>
	imgRefs?: { [key: string]: React.RefObject<HTMLImageElement> }
}

interface Canvas {
	canvas: HTMLCanvasElement | null,
	context: CanvasRenderingContext2D,
	loaded: boolean
}

const ImageDownloader: React.FC<Props> = ({ sketchRef, imgRefs }) => {
	const products = useFittingStore(store => store.product)

	const canvasWorkspace: {
		background?: Canvas | null,
		[key: number]: Canvas
	} = {}

	const createCanvas = (width: number, height: number) => {
		const canvas = document.createElement('canvas') // создаем canvas
		canvas.width = width // ширина канваса
		canvas.height = height // высота канваса
		const ctx = canvas.getContext('2d') // получаем контекст
		if (!ctx) return null
		return { canvas: canvas, context: ctx, loaded: false }
	}

	const addBackCanvasToWorkspace = (width: number, height: number, src: string) => {
		canvasWorkspace.background = createCanvas(width, height)
		const sketch = new Image()
		sketch.src = src
		sketch.crossOrigin = 'anonymous'
		sketch.onload = () => {
			if (canvasWorkspace.background !== null) {
				let posSketchX: number, posSketchY: number, sketchWidth: number, sketchHeight: number

				if (canvasWorkspace.background?.canvas) {
					[posSketchX, posSketchY, sketchWidth, sketchHeight] = calculateSketchPosition(canvasWorkspace.background.canvas, sketch)
					canvasWorkspace.background?.context.drawImage(sketch, posSketchX, posSketchY, sketchWidth, sketchHeight)
					canvasWorkspace.background.loaded = true
				}
			}
		}
	}

	const addPicCanvasesToWorkspace = (width: number, height: number, imgRefs) => {
		for (const idx in imgRefs) {
			if (products[idx].visibility) {

				// Создаем канвас для видимой картинки
				canvasWorkspace[idx] = createCanvas(width, height)

				// Позиционируем картинку
				const scale = products[idx].scale
				const top = products[idx].top
				const left = products[idx].left

				const image = imgRefs[idx].current
				const picture = new Image()
				if (!image) return
				picture.src = image.src
				picture.crossOrigin = 'anonymous'
				picture.onload = () => {
					const computedStyle = window.getComputedStyle(image)

					// Двигаем картинку
					const pictureWidth = parseFloat(computedStyle.width) // ширина картинки
					const pictureHeight = parseFloat(computedStyle.height) // высота картинки
					const leftOffset = left + pictureWidth / 2
					const topOffset = top + pictureHeight / 2
					canvasWorkspace[idx].context.translate(leftOffset, topOffset)

					// Поворачиваем картинку
					const rotateAngle = Math.round(calculateProdImgRotate(image, scale < 0))
					canvasWorkspace[idx].context.rotate(rotateAngle * Math.PI / 180)

					// Если пользователь отобразил картинку по горизонтали, трансформируем контекст канваса
					if (scale < 0) {
						canvasWorkspace[idx].context.scale(-1, 1)
					}

					// Рисуем картинку на канвасе
					canvasWorkspace[idx].context.drawImage(picture, -pictureWidth / 2, -pictureHeight / 2, pictureWidth, pictureHeight)
					canvasWorkspace[idx].loaded = true
				}
			}
		}
	}

	const buildAndDownloadFinalCanvas = (width: number, height: number) => {
		// Объеденяем все, созданные ранее, канвасы в единый
		const combinedCanvas = document.createElement('canvas')
		combinedCanvas.width = width
		combinedCanvas.height = height
		const combinedCtx = combinedCanvas.getContext('2d')
		if (!combinedCtx) return

		// Добавляем картинку интерьера
		if (canvasWorkspace.background?.canvas) {
			combinedCtx.drawImage(canvasWorkspace.background.canvas, 0, 0)
		}

		// Добавляем картинки продуктов
		for (const idx in imgRefs) {
			if (products[idx].visibility && canvasWorkspace[idx]?.canvas) {
				combinedCtx.drawImage(canvasWorkspace[idx].canvas, 0, 0)
			}
		}

		// Сохраняем финальную картинку (результирующий канвас) на клиенте
		const imgBase64 = combinedCanvas.toDataURL('image/png')
		const link = document.createElement('a')
		link.download = 'fitting-picture.png'
		link.href = "data:image/" + imgBase64
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}

	const checkLoadedWorkspace = () => {
		for (const key in canvasWorkspace) {
			if (!canvasWorkspace[key].loaded) return false
		}
		return true
	}

	const handleSave = async () => {
		// Сохраняем размеры картинки, чтобы использовать их при генерации всех канвасов
		if (!sketchRef) return
		if (!sketchRef.current) return
		const resultImgWidth = sketchRef.current.offsetWidth
		const resultImgHeight = sketchRef.current.offsetHeight

		// Создаем канвас с фоном/интерьером (Sketch)
		addBackCanvasToWorkspace(resultImgWidth, resultImgHeight, sketchRef.current.src)

		// Рисуем картинки продуктов, каждую на своем канвасе
		addPicCanvasesToWorkspace(resultImgWidth, resultImgHeight, imgRefs)

		// Циклически проверяем загрузу всех картинок. Если ок, то скачиваем примерку
		const intervalId = setInterval(() => {
			if (checkLoadedWorkspace()) {
				clearInterval(intervalId)
				buildAndDownloadFinalCanvas(resultImgWidth, resultImgHeight)
			}
		}, 100)
	}

	return (
		<button className={styles.button} onClick={handleSave}></button>
	);
};

export default ImageDownloader;
