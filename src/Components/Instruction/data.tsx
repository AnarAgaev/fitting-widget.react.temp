interface dataItem {
  id: number,
  src: string,
  message: string
}

const data: dataItem[] = [
  {
    id: 1,
    src: 'https://9d2c73b6-1b6d-45e9-9faa-7fb794647734.selcdn.net/i/823/fbb753ac8e.png',
    message: 'Выбери фотографию интерьера или добавь свое изображение, кликнув по иконке фотоаппарата'
  },
  {
    id: 2,
    src: 'https://9d2c73b6-1b6d-45e9-9faa-7fb794647734.selcdn.net/i/824/7ead109e32.png',
    message: `Добавь один или несколько товаров, кликнув на\u00A0его изображение в\u00A0списке`
  },
  {
    id: 3,
    src: 'https://9d2c73b6-1b6d-45e9-9faa-7fb794647734.selcdn.net/i/825/c8b113bcf6.png',
    message: 'Измени размер и положение товара с\u00A0помощью элементов управления внизу'
  },
  {
    id: 4,
    src: 'https://9d2c73b6-1b6d-45e9-9faa-7fb794647734.selcdn.net/i/826/3ca2341d84.png',
    message: 'Сохрани результат, кликнув по\u00A0иконке дискеты вверху или поделись в\u00A0социальных сетях'
  },
  {
    id: 5,
    src: 'https://9d2c73b6-1b6d-45e9-9faa-7fb794647734.selcdn.net/i/827/9a19b1545e.png',
    message: 'Если будут вопросы, можно в\u00A0любой момент запустить обучение, кликнув на\u00A0иконку «шапочка»'
  }
]

export default data