import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    getInvoicesRequest,
    getInvoiceRequest,
    createInvoiceRequest,
    updateInvoiceStatusRequest,
    createPaymentRequest,
    getPaymentsRequest,
    getBillingSummaryRequest,
    clearBillingError
} from "../billingSlice";

function useBilling() {
    const dispatch = useDispatch();

    const {
        invoices,
        selectedInvoice,
        payments,
        summary,
        loading,
        error
    } = useSelector((state) => state.billing);

    const fetchInvoices = useCallback(() => {
        dispatch(getInvoicesRequest());
    }, [dispatch]);

    const fetchInvoice = useCallback((invoiceId) => {
        dispatch(getInvoiceRequest(invoiceId));
    }, [dispatch]);

    const addInvoice = useCallback((invoiceData) => {
        dispatch(createInvoiceRequest(invoiceData));
    }, [dispatch]);

    const changeInvoiceStatus = useCallback(
        (invoiceId, status) => {
            dispatch(
                updateInvoiceStatusRequest({
                    invoiceId,
                    status
                })
            );
        },
        [dispatch]
    );

    const addPayment = useCallback((paymentData) => {
        dispatch(createPaymentRequest(paymentData));
    }, [dispatch]);

    const fetchPayments = useCallback((invoiceId) => {
        dispatch(getPaymentsRequest(invoiceId));
    }, [dispatch]);

    const fetchBillingSummary = useCallback(() => {
        dispatch(getBillingSummaryRequest());
    }, [dispatch]);

    const clearError = useCallback(() => {
        dispatch(clearBillingError());
    }, [dispatch]);

    return {
        invoices,
        selectedInvoice,
        payments,
        summary,
        loading,
        error,
        fetchInvoices,
        fetchInvoice,
        addInvoice,
        changeInvoiceStatus,
        addPayment,
        fetchPayments,
        fetchBillingSummary,
        clearError
    };
}

export default useBilling;