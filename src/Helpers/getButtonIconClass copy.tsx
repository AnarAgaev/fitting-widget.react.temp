type ButtonType = string | undefined
type StylesType = CSSModuleClasses

const getButtonIconClass = (type: ButtonType, styles: StylesType): string => {
    const {
        btn,
        select,
        upload,
        download,
        guide,
        backlink,
        toggle,
        remove,
        increase,
        decrease,
        left,
        right,
        scale,
        shortcut
    } = styles;

    switch (type) {
        case 'select':
            return `${btn} ${select}`;
        case 'upload':
            return `${btn} ${upload}`;
        case 'download':
            return `${btn} ${download}`;
        case 'guide':
            return `${btn} ${guide}`;
        case 'backlink':
            return `${btn} ${backlink}`;
        case 'toggle':
            return `${btn} ${toggle}`;
        case 'remove':
            return `${btn} ${remove}`;
        case 'increase':
            return `${btn} ${increase}`;
        case 'decrease':
            return `${btn} ${decrease}`;
        case 'left':
            return `${btn} ${left}`;
        case 'right':
            return `${btn} ${right}`;
        case 'scale':
            return `${btn} ${scale}`;
        case 'shortcut':
            return `${btn} ${shortcut}`;
        default:
            return btn;
    }
};

export default getButtonIconClass;
