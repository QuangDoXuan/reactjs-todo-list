export const setLocalStorage = (key: string, item: string) => {
    localStorage.setItem(key, item)
}
export const getLocalStorage = (key: string) => {
    return JSON.parse(localStorage.getItem(key) || '[]')
}