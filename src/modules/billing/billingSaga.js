import { call, put, takeLatest } from "redux-saga/effects";

import {
    getInvoices,
    getInvoice,
    createInvoice,
    updateInvoiceStatus,
    createPayment,
    getPayments,
    getBillingSummary
} from "./billingAPI";

import {
    getInvoicesRequest,
    getInvoicesSuccess,
    getInvoiceRequest,
    getInvoiceSuccess,
    createInvoiceRequest,
    createInvoiceSuccess,
    updateInvoiceStatusRequest,
    updateInvoiceStatusSuccess,
    createPaymentRequest,
    createPaymentSuccess,
    getPaymentsRequest,
    getPaymentsSuccess,
    getBillingSummaryRequest,
    getBillingSummarySuccess,
    billingFailure
} from "./billingSlice";

function getResponseData(response) {
    return response.data?.data ?? response.data;
}

function* handleGetInvoices() {
    try {
        const response = yield call(getInvoices);

        yield put(
            getInvoicesSuccess(
                getResponseData(response)
            )
        );
    } catch (error) {
        yield put(
            billingFailure(
                error.response?.data?.message ||
                "Failed to fetch invoices."
            )
        );
    }
}

function* handleGetInvoice(action) {
    try {
        const response = yield call(
            getInvoice,
            action.payload
        );

        yield put(
            getInvoiceSuccess(
                getResponseData(response)
            )
        );
    } catch (error) {
        yield put(
            billingFailure(
                error.response?.data?.message ||
                "Failed to fetch invoice."
            )
        );
    }
}

function* handleCreateInvoice(action) {
    try {
        const response = yield call(
            createInvoice,
            action.payload
        );

        yield put(
            createInvoiceSuccess(
                getResponseData(response)
            )
        );

        yield put(
            getInvoicesRequest()
        );

    } catch (error) {
        yield put(
            billingFailure(
                error.response?.data?.message ||
                "Failed to create invoice."
            )
        );
    }
}

function* handleUpdateInvoiceStatus(action) {
    try {
        const { invoiceId, status } = action.payload;

        const response = yield call(
            updateInvoiceStatus,
            invoiceId,
            status
        );

        yield put(
            updateInvoiceStatusSuccess(
                getResponseData(response)
            )
        );

        yield put(
            getInvoicesRequest()
        );

        yield put(
            getBillingSummaryRequest()
        );
    } catch (error) {
        yield put(
            billingFailure(
                error.response?.data?.message ||
                "Failed to update invoice status."
            )
        );
    }
}

function* handleCreatePayment(action) {
    try {
        const response = yield call(
            createPayment,
            action.payload
        );

        yield put(
            createPaymentSuccess(
                getResponseData(response)
            )
        );

        yield put(
            getInvoiceRequest(
                action.payload.invoice_id
            )
        );

        yield put(
            getPaymentsRequest(
                action.payload.invoice_id
            )
        );

        yield put(
            getInvoicesRequest()
        );

        yield put(
            getBillingSummaryRequest()
        );
    } catch (error) {
        yield put(
            billingFailure(
                error.response?.data?.message ||
                "Failed to record payment."
            )
        );
    }
}

function* handleGetPayments(action) {
    try {
        const response = yield call(
            getPayments,
            action.payload
        );

        yield put(
            getPaymentsSuccess(
                getResponseData(response)
            )
        );
    } catch (error) {
        yield put(
            billingFailure(
                error.response?.data?.message ||
                "Failed to fetch payments."
            )
        );
    }
}

function* handleGetBillingSummary() {
    try {
        const response = yield call(
            getBillingSummary
        );

        yield put(
            getBillingSummarySuccess(
                getResponseData(response)
            )
        );
    } catch (error) {
        yield put(
            billingFailure(
                error.response?.data?.message ||
                "Failed to fetch billing summary."
            )
        );
    }
}

export default function* billingSaga() {
    yield takeLatest(
        getInvoicesRequest.type,
        handleGetInvoices
    );

    yield takeLatest(
        getInvoiceRequest.type,
        handleGetInvoice
    );

    yield takeLatest(
        createInvoiceRequest.type,
        handleCreateInvoice
    );

    yield takeLatest(
        updateInvoiceStatusRequest.type,
        handleUpdateInvoiceStatus
    );

    yield takeLatest(
        createPaymentRequest.type,
        handleCreatePayment
    );

    yield takeLatest(
        getPaymentsRequest.type,
        handleGetPayments
    );

    yield takeLatest(
        getBillingSummaryRequest.type,
        handleGetBillingSummary
    );
}