import moment from 'moment'

export const dateFormating = (date) => {
    return moment(date).format('MM/DD/YYYY')
}
 