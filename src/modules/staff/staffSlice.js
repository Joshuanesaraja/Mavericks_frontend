import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    staff: [],
    selectedStaff: null,

    loading: false,
    saving: false,
    deleting: false,

    error: null,
    successMessage: null
};

const staffSlice = createSlice({
    name: "staff",

    initialState,

    reducers: {
        fetchStaffRequest(state) {
            state.loading = true;
            state.error = null;
        },

        fetchStaffSuccess(state, action) {
            state.loading = false;
            state.staff =
                Array.isArray(action.payload)
                    ? action.payload
                    : [];
            state.error = null;
        },

        fetchStaffFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        fetchStaffMemberRequest(state) {
            state.loading = true;
            state.error = null;
            state.selectedStaff = null;
        },

        fetchStaffMemberSuccess(state, action) {
            state.loading = false;
            state.selectedStaff =
                action.payload || null;
            state.error = null;
        },

        fetchStaffMemberFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        createStaffRequest(state) {
            state.saving = true;
            state.error = null;
            state.successMessage = null;
        },

        createStaffSuccess(state, action) {
            state.saving = false;

            const staff =
                action.payload?.data;

            if (staff) {
                state.staff.unshift(staff);
            }

            state.successMessage =
                action.payload?.message ||
                "Staff created successfully";

            state.error = null;
        },

        createStaffFailure(state, action) {
            state.saving = false;
            state.error = action.payload;
        },

        updateStaffRequest(state) {
            state.saving = true;
            state.error = null;
            state.successMessage = null;
        },

        updateStaffSuccess(state, action) {
            state.saving = false;

            const updated =
                action.payload?.data;

            if (updated) {
                state.staff =
                    state.staff.map(
                        (item) =>
                            Number(item.id) ===
                            Number(updated.id)
                                ? updated
                                : item
                    );

                if (
                    state.selectedStaff &&
                    Number(
                        state.selectedStaff.id
                    ) === Number(updated.id)
                ) {
                    state.selectedStaff =
                        updated;
                }
            }

            state.successMessage =
                action.payload?.message ||
                "Staff updated successfully";

            state.error = null;
        },

        updateStaffFailure(state, action) {
            state.saving = false;
            state.error = action.payload;
        },

        updateStaffStatusRequest(state) {
            state.saving = true;
            state.error = null;
            state.successMessage = null;
        },

        updateStaffStatusSuccess(state, action) {
            state.saving = false;

            const updated =
                action.payload?.data;

            if (updated) {
                state.staff =
                    state.staff.map(
                        (item) =>
                            Number(item.id) ===
                            Number(updated.id)
                                ? updated
                                : item
                    );

                if (
                    state.selectedStaff &&
                    Number(
                        state.selectedStaff.id
                    ) === Number(updated.id)
                ) {
                    state.selectedStaff =
                        updated;
                }
            }

            state.successMessage =
                action.payload?.message ||
                "Staff status updated successfully";

            state.error = null;
        },

        updateStaffStatusFailure(
            state,
            action
        ) {
            state.saving = false;
            state.error = action.payload;
        },

        deleteStaffRequest(state) {
            state.deleting = true;
            state.error = null;
            state.successMessage = null;
        },

        deleteStaffSuccess(state, action) {
            state.deleting = false;

            const deletedId =
                action.payload?.id;

            state.staff =
                state.staff.filter(
                    (item) =>
                        Number(item.id) !==
                        Number(deletedId)
                );

            if (
                state.selectedStaff &&
                Number(
                    state.selectedStaff.id
                ) === Number(deletedId)
            ) {
                state.selectedStaff = null;
            }

            state.successMessage =
                action.payload?.message ||
                "Staff deleted successfully";

            state.error = null;
        },

        deleteStaffFailure(state, action) {
            state.deleting = false;
            state.error = action.payload;
        },

        clearStaffError(state) {
            state.error = null;
        },

        clearStaffSuccess(state) {
            state.successMessage = null;
        },

        clearSelectedStaff(state) {
            state.selectedStaff = null;
        }
    }
});

export const {
    fetchStaffRequest,
    fetchStaffSuccess,
    fetchStaffFailure,

    fetchStaffMemberRequest,
    fetchStaffMemberSuccess,
    fetchStaffMemberFailure,

    createStaffRequest,
    createStaffSuccess,
    createStaffFailure,

    updateStaffRequest,
    updateStaffSuccess,
    updateStaffFailure,

    updateStaffStatusRequest,
    updateStaffStatusSuccess,
    updateStaffStatusFailure,

    deleteStaffRequest,
    deleteStaffSuccess,
    deleteStaffFailure,

    clearStaffError,
    clearStaffSuccess,
    clearSelectedStaff
} = staffSlice.actions;

export default staffSlice.reducer;