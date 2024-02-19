import {LazyLoadImage} from 'react-lazy-load-image-component'
import InstructionItem from '../InstructionItem'
import data from './data'
import styles from './Instruction.module.scss'

const Instruction: React.FC = () => {
  const { instruction, background, list } = styles

  return(
    <section className={instruction}>
      <LazyLoadImage className={background} alt=''
        src='https://aws.massive.ru/fitting/fitting-back.jpg' />
      <ul className={list}>
        {
          data.map(i => (
            <InstructionItem key={i.id} id={i.id}
              src={i.src} message={i.message} />
          ))
        }
      </ul>
    </section>
  )
}

export default Instruction
