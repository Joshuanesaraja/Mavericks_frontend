import { useCallback } from "react";
import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    getUsersRequest,
    getUserRequest,
    createUserRequest,
    updateUserRequest,
    assignUserRoleRequest,
    updateUserStatusRequest
} from "../userSlice";

function selectUsers(state) {
    return state.users.users;
}

function selectSelectedUser(state) {
    return state.users.selectedUser;
}

function selectUserLoading(state) {
    return state.users.loading;
}

function selectUserError(state) {
    return state.users.error;
}

export function useUsers() {
    const dispatch = useDispatch();

    const users = useSelector(selectUsers);

    const selectedUser = useSelector(
        selectSelectedUser
    );

    const loading = useSelector(
        selectUserLoading
    );

    const error = useSelector(
        selectUserError
    );

    const loadUsers = useCallback(() => {
        dispatch(getUsersRequest());
    }, [dispatch]);

    const loadUser = useCallback(
        (id) => {
            dispatch(
                getUserRequest(id)
            );
        },
        [dispatch]
    );

    const addUser = useCallback(
        (userData) => {
            dispatch(
                createUserRequest(userData)
            );
        },
        [dispatch]
    );

    const editUser = useCallback(
        (id, userData) => {
            dispatch(
                updateUserRequest({
                    id,
                    data: userData
                })
            );
        },
        [dispatch]
    );

    const assignRole = useCallback(
        (id, roleData) => {
            dispatch(
                assignUserRoleRequest({
                    id,
                    data: roleData
                })
            );
        },
        [dispatch]
    );

    const updateStatus = useCallback(
        (id, statusData) => {
            dispatch(
                updateUserStatusRequest({
                    id,
                    data: statusData
                })
            );
        },
        [dispatch]
    );

    return {
        users,
        selectedUser,
        loading,
        error,
        loadUsers,
        loadUser,
        addUser,
        editUser,
        assignRole,
        updateStatus
    };
}