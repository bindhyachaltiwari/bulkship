export function addItem(payload) {
    return {
        type: 'ADD',
        payload
    }
}
export function getApiActionCal() {
    return {
        type: 'APICALL'
    }
}
export function getDataLoaded(payload) {
    return {
        type: 'DATA-LOADED',
        payload
    }
}
export function getDataError() {
    return {
        type: 'DATA-ERROR'
    }
}