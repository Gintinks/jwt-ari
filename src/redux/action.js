import { SHOW_USER_DATA } from './constant'

export const getUser = (data) => {
    return {
        type: SHOW_USER_DATA,
        payload: data
    }
}

