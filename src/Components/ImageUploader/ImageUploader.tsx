import React, {ChangeEvent} from 'react'
import useFittingStore from '../../store'
import styles from './ImageUploader.module.scss'

const ImageUploader: React.FC = () => {
    const uploadSketch = useFittingStore(state => state.uploadSketch)

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedImage = e.target.files && e.target.files[0]

        const imgUrl = selectedImage
            ? URL.createObjectURL(selectedImage)
            : null

        uploadSketch(imgUrl)
    }

    return (
        <input type="file"
            className={styles.input}
            onChange={handleImageChange} />
    )
}

export default ImageUploader
