import {createSlice} from "@reduxjs/toolkit"

const initVal={
    token:localStorage.getItem("token")||"",
    role:localStorage.getItem("role")||"user"
}

const tokenSlice=createSlice({
    name:"token",
    initialState:initVal,
    reducers:{
        createToken:(state,action)=>{
            localStorage.setItem("token",action.payload.token)
            // const token=action.payload.token
            // state.token=token
            localStorage.setItem("role",action.payload.role)
            state.token=localStorage.getItem("token")
            state.role=localStorage.getItem("role")
        },
        clearToken:(state,action)=>{
            localStorage.clear()
            state.token=""
            state.role="user"
            
        }


    }
})

export const {createToken,clearToken} = tokenSlice.actions
export default tokenSlice.reducer
