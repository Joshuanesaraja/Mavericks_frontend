import {
    call,
    put,
    takeLatest
} from "redux-saga/effects";

import chatAPI from "./chatAPI";

import {
    fetchNotesRequest,
    fetchNotesSuccess,
    fetchNotesFailure,

    createNoteRequest,
    createNoteSuccess,
    createNoteFailure,

    fetchMessagesRequest,
    fetchMessagesSuccess,
    fetchMessagesFailure,

    sendMessageRequest,
    sendMessageSuccess,
    sendMessageFailure
} from "./chatSlice";

const getErrorMessage = (
    error
) => {
    return (
        error?.response?.data
            ?.message ||
        error?.response?.data
            ?.error ||
        error?.message ||
        "Communication request failed."
    );
};

function* fetchNotesWorker(
    action
) {
    try {
        const response =
            yield call(
                chatAPI.getNotes,
                action.payload
            );

        yield put(
            fetchNotesSuccess(
                response
            )
        );
    } catch (error) {
        yield put(
            fetchNotesFailure(
                getErrorMessage(error)
            )
        );
    }
}

function* createNoteWorker(
    action
) {
    try {
        const response =
            yield call(
                chatAPI.createNote,
                action.payload
            );

        yield put(
            createNoteSuccess(
                response
            )
        );
    } catch (error) {
        yield put(
            createNoteFailure(
                getErrorMessage(error)
            )
        );
    }
}

function* fetchMessagesWorker(
    action
) {
    try {
        const response =
            yield call(
                chatAPI.getMessageHistory,
                action.payload
            );

        yield put(
            fetchMessagesSuccess(
                response
            )
        );
    } catch (error) {
        yield put(
            fetchMessagesFailure(
                getErrorMessage(error)
            )
        );
    }
}

function* sendMessageWorker(
    action
) {
    try {
        const response =
            yield call(
                chatAPI.sendMessage,
                action.payload
            );

        yield put(
            sendMessageSuccess(
                response
            )
        );
    } catch (error) {
        yield put(
            sendMessageFailure(
                getErrorMessage(error)
            )
        );
    }
}

export default function* chatSaga() {
    yield takeLatest(
        fetchNotesRequest.type,
        fetchNotesWorker
    );

    yield takeLatest(
        createNoteRequest.type,
        createNoteWorker
    );

    yield takeLatest(
        fetchMessagesRequest.type,
        fetchMessagesWorker
    );

    yield takeLatest(
        sendMessageRequest.type,
        sendMessageWorker
    );
}