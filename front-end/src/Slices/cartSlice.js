import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem("cart")
? JSON.parse(localStorage.getItem("cart")): {cartItems: []};

const addDecimals = (num) =>{
    return  (Math.round(num * 100) / 100).toFixed(2)
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;

            const itemExist = state.cartItems.find((x)=> x._id === item._id)

            if(itemExist){
                state.cartItems = state.cartItems.map((x)=> x._id === itemExist._id
                ? item : x);
            }else{
                state.cartItems = [...state.cartItems, item]
            }

            //Calculate items price

            state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item)=>
            acc + item.price * item.qty, 0))

            //Calculate Shipping price


            //Calculate Tax price
            //Calculate Total price

        }
    }
});

export default cartSlice.reducer;