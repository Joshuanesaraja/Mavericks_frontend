import {
    useCallback
} from "react";

import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    fetchNotesRequest,
    createNoteRequest,

    fetchMessagesRequest,
    sendMessageRequest,

    clearChatError,
    clearChatSuccess,
    clearChat
} from "../chatSlice";

export default function useChat() {
    const dispatch =
        useDispatch();

    const state =
        useSelector(
            (store) =>
                store.chat || {
                    notes: [],
                    messages: [],
                    currentAppointmentId:
                        null,

                    loadingNotes: false,
                    loadingMessages: false,

                    sendingNote: false,
                    sendingMessage: false,

                    error: null,
                    notesError: null,
                    messagesError: null,

                    successMessage: null
                }
        );

    const getNotes =
        useCallback(
            (appointmentId) => {
                dispatch(
                    fetchNotesRequest(
                        Number(
                            appointmentId
                        )
                    )
                );
            },
            [dispatch]
        );

    const createNote =
        useCallback(
            (note) => {
                dispatch(
                    createNoteRequest(
                        note
                    )
                );
            },
            [dispatch]
        );

    const getMessages =
        useCallback(
            (appointmentId) => {
                dispatch(
                    fetchMessagesRequest(
                        Number(
                            appointmentId
                        )
                    )
                );
            },
            [dispatch]
        );

    const sendMessage =
        useCallback(
            (message) => {
                dispatch(
                    sendMessageRequest(
                        message
                    )
                );
            },
            [dispatch]
        );

    const clearError =
        useCallback(
            () =>
                dispatch(
                    clearChatError()
                ),
            [dispatch]
        );

    const clearSuccess =
        useCallback(
            () =>
                dispatch(
                    clearChatSuccess()
                ),
            [dispatch]
        );

    const resetChat =
        useCallback(
            () =>
                dispatch(
                    clearChat()
                ),
            [dispatch]
        );

    return {
        ...state,

        getNotes,
        createNote,

        getMessages,
        sendMessage,

        clearError,
        clearSuccess,
        resetChat
    };
}