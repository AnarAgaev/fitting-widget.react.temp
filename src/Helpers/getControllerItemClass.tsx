type ButtonType = string | undefined
type StylesType = CSSModuleClasses

const getControllerItemClass = (type: ButtonType, styles: StylesType): string => {

    const {item, item_select, item_toggle} = styles

    switch (type) {
        case 'select':
            return `${item} ${item_select}`

        case 'toggle':
            return `${item} ${item_toggle}`

        default:
            return item
    }
};

export default getControllerItemClass;
