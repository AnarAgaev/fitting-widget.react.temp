import {LazyLoadImage} from 'react-lazy-load-image-component'
import styles from './InstructionItem.module.scss'

interface props {
  id: number,
  src: string,
  message: string
}

const InstructionItem: React.FC<props> = ({ id, src, message }) => {
  const { item, example, img, description, number, text } = styles

  return (
    <li className={item}>
      <div className={example}>
        <LazyLoadImage className={img} alt='' src={src} />
      </div>
      <div className={description}>
        <span className={number}>({id})</span>
        <p className={text}>{message}</p>
      </div>
    </li>
  )
}

export default InstructionItem
