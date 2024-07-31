export const fetchStoreItems = async () => {
    const api = "https://fakestoreapi.com/products?limit=20"
    const response = await fetch(`${api}`)
    const responseJson = await response.json()
    return responseJson
}

export const fetchStoreItem = async (id) => {
    const api = `https://fakestoreapi.com/products/${id}`
    const response = await fetch(`${api}`)
    const responseJson = await response.json()
    return responseJson
}

export default { fetchStoreItems, fetchStoreItem }