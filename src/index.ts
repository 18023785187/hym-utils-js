import {
    formatDate,
    throttle,
    debounce,
    stringify,
    isMobile,
} from 'utils'

export {
    formatDate,
    throttle,
    debounce,
    stringify,
    isMobile,
}

process!.env!.NODE_ENV === 'development' && import('./test')
