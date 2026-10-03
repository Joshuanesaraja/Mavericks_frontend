import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    selectedUser: null,
    loading: false,
    error: null
};

const userSlice = createSlice({
    name: "users",
    initialState,

    reducers: {
        getUsersRequest: (state) => {
            state.loading = true;
            state.error = null;
        },

        getUsersSuccess: (state, action) => {
            state.loading = false;
            state.users = action.payload;
            state.error = null;
        },

        getUsersFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        getUserRequest: (state) => {
            state.loading = true;
            state.error = null;
        },

        getUserSuccess: (state, action) => {
            state.loading = false;
            state.selectedUser = action.payload;
            state.error = null;
        },

        getUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        createUserRequest: (state) => {
            state.loading = true;
            state.error = null;
        },

        createUserSuccess: (state, action) => {
            state.loading = false;
            state.users.push(action.payload);
            state.error = null;
        },

        createUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        updateUserRequest: (state) => {
            state.loading = true;
            state.error = null;
        },

        updateUserSuccess: (state, action) => {
            state.loading = false;

            const index = state.users.findIndex(
                (user) => user.id === action.payload.id
            );

            if (index !== -1) {
                state.users[index] = action.payload;
            }

            state.selectedUser = action.payload;
            state.error = null;
        },

        updateUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        assignUserRoleRequest: (state) => {
            state.loading = true;
            state.error = null;
        },

        assignUserRoleSuccess: (state, action) => {
            state.loading = false;

            const index = state.users.findIndex(
                (user) => user.id === action.payload.id
            );

            if (index !== -1) {
                state.users[index] = action.payload;
            }

            state.selectedUser = action.payload;
            state.error = null;
        },

        assignUserRoleFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        updateUserStatusRequest: (state) => {
            state.loading = true;
            state.error = null;
        },

        updateUserStatusSuccess: (state, action) => {
            state.loading = false;

            const index = state.users.findIndex(
                (user) => user.id === action.payload.id
            );

            if (index !== -1) {
                state.users[index] = action.payload;
            }

            state.selectedUser = action.payload;
            state.error = null;
        },

        updateUserStatusFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        clearUserError: (state) => {
            state.error = null;
        }
    }
});

export const {
    getUsersRequest,
    getUsersSuccess,
    getUsersFailure,
    getUserRequest,
    getUserSuccess,
    getUserFailure,
    createUserRequest,
    createUserSuccess,
    createUserFailure,
    updateUserRequest,
    updateUserSuccess,
    updateUserFailure,
    assignUserRoleRequest,
    assignUserRoleSuccess,
    assignUserRoleFailure,
    updateUserStatusRequest,
    updateUserStatusSuccess,
    updateUserStatusFailure,
    clearUserError
} = userSlice.actions;

export default userSlice.reducer;