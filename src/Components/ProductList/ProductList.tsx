import React from 'react'
import useFittingStore from '../../store'
import Card from '../Card'

interface ProductListProps {
    hasScrollbar: boolean;
}

const ProductList: React.FC<ProductListProps> = ({hasScrollbar}) => {
    const products = useFittingStore(state => state.viewed)
    return (<>
        {
            products.map(item => <Card
                hasScrollbar={hasScrollbar}
                key={item.id}
                id={item.id}
                name={item.name}
                height={item.height}
                width={item.width}
                length={item.length}
                image={item.image}
                preview={item.preview}
                link={item.link}
                active={item.active} />)
        }
    </>)
}

export default ProductList
