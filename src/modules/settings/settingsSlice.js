import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,

  loading: false,
  saving: false,

  error: null,
  successMessage: null,
};

const settingsSlice = createSlice({
  name: "settings",

  initialState,

  reducers: {
    fetchProfileRequest(state) {
      state.loading = true;
      state.error = null;
    },

    fetchProfileSuccess(state, action) {
      state.loading = false;

      state.profile =
        action.payload?.data ||
        null;
    },

    fetchProfileFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    changePasswordRequest(state) {
      state.saving = true;
      state.error = null;
      state.successMessage = null;
    },

    changePasswordSuccess(state, action) {
      state.saving = false;

      state.successMessage =
        action.payload?.message ||
        "Password changed successfully";
    },

    changePasswordFailure(state, action) {
      state.saving = false;
      state.error = action.payload;
    },

    clearSettingsError(state) {
      state.error = null;
    },

    clearSettingsSuccess(state) {
      state.successMessage = null;
    },
  },
});

export const {
  fetchProfileRequest,
  fetchProfileSuccess,
  fetchProfileFailure,

  changePasswordRequest,
  changePasswordSuccess,
  changePasswordFailure,

  clearSettingsError,
  clearSettingsSuccess,
} = settingsSlice.actions;

export default settingsSlice.reducer;