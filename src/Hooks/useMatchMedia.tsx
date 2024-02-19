import {useLayoutEffect, useState} from 'react'

interface MatchMediaResult {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    isFullscreen: boolean;
}

const queries = [
    '(max-width: 767px)',
    '(min-width: 768px) and (max-width: 991px)',
    '(min-width: 992px) and (max-width: 1199px)',
    '(min-width: 1200px)'
]

const useMatchMedia = (): MatchMediaResult => {
    const mediaQueryLists = queries
        .map(query => matchMedia(query))

    const getValues = () => mediaQueryLists
        .map(mql => mql.matches)

    const [values, setValues] = useState(getValues)

    useLayoutEffect(() => {
        const handler = () => setValues(getValues)

        mediaQueryLists.forEach(mql => mql.addEventListener('change', handler))

        return () => mediaQueryLists.forEach(mql =>
            mql.removeEventListener('change', handler))
    })

    return {
        isMobile: values[0],
        isTablet: values[1],
        isDesktop: values[2],
        isFullscreen: values[3]
    }
}

export default useMatchMedia
