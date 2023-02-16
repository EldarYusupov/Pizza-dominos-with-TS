import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";
import {RootState} from "../store";




type Pizza = {
    title:string,
    price:number,
    imageUrl:string,
    sizes:number[],
    types:number[],
    id:string
}
export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'

}
interface PizzaSliceState {
    items:Pizza[];
    status: Status
}
const initialState: PizzaSliceState = {
    items:[],
    status:Status.LOADING
}

export type SearchPizzaParams = {
    sortBy:string,
    order:string,
    category:string,
    search:string,
    currentPage:string
}
export const fetchPizzas = createAsyncThunk<Pizza[],SearchPizzaParams>(
    'pizza/fetchPizzasStatus',
    async (params, thunkApi) => {
        const {order, sortBy,category,search, currentPage} = params
        const {data} = await axios.get<Pizza[]>(`https://63dbce38c45e08a0434e7f8c.mockapi.io/items/?page=${currentPage}&limit=4&${
            category}&sortBy=${sortBy}&order=${order}${search}`
        )

        return data
    }
)

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action:PayloadAction<Pizza[]>){
            state.items = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state, action) => {
            state.status = Status.LOADING;
            state.items = [];
        });

        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
        });

        builder.addCase(fetchPizzas.rejected, (state, action) => {
            state.status = Status.ERROR;
            state.items = [];
        });
    }
})

export const selectPizzaData = (state:RootState) => state.pizza

export const  {setItems} = pizzaSlice.actions

export default pizzaSlice.reducer