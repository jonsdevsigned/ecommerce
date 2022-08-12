import { createSlice } from '@reduxjs/toolkit';
import getConfig from '../../utils/getConfig';
import { setIsLoading } from './isLoading.slice';
import axios from 'axios';


export const cartSlice = createSlice({
	name: 'cart',
    initialState: [],
    reducers: {
        setCart: (state, action) => {
            const cart = action.payload
            return cart
        }       
    }
})

export const getCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true))
    return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/cart', getConfig())
        .then(res => dispatch(setCart(res.data.data.cart.products)))
        .finally(() => dispatch(setIsLoading(false)))
}

export const addCartThunk = cart => (dispatch) => {
    dispatch(setIsLoading(true))
    return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/cart', cart, getConfig())
        .then(res => dispatch(getCartThunk()))
        .finally(() => dispatch(setIsLoading(false)))
}

export const buyCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true))
    return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/purchases', {}, getConfig())
        .then(res => dispatch(setCart([])))
        .finally(() => dispatch(setIsLoading(false)))
}

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;