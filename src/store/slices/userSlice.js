import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: '',
        image: {
            public_id: '',
            url: ''
        },
        email: '',
        token: null,
        role: '',
        id: ''
    },
    reducers: {
        addUser: (state, action) => {
            return action.payload;
        },
        updateUserName: (state, action) => {
            return {
                ...state,
                name: action.payload
            };
        },
        updateImage: (state, action) => {
            return {
                ...state,
                image: action.payload
            };
        },
        userLogout: (state, action) => {
            return action.payload;
        }

    }

});

export const { addUser, userLogout, updateImage, updateUserName } = userSlice.actions;
export const userReducer = userSlice.reducer;

