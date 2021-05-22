export const API_URL = "https://spoilerlibrarybackend.herokuapp.com/"
export const defaultCustomer = {
    id: 0,
    customerName: "",
    customerPhone: "",
    customerAddress: ""
}
export const defaultProduct = {
    id: 0,
    productName: "",
    productPrice: 0.0,
    sellingPrice: 0.0,
    stock: 0
}
export const defaultOrder = {
    id: 0,
    customer: defaultCustomer,
    product: defaultProduct,
    productCount: 0,
    sellingPrice: 0,
    orderDate: ""
}
