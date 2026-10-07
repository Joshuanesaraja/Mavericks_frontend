import { useEffect, useState } from "react";
import styled from "styled-components";

import { useAuth } from "../../modules/auth/hooks/useAuth";
import useBilling from "../../modules/billing/hooks/useBilling";

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xl};
`;

const PageHeader = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xs};
`;

const PageTitle = styled.h1`
    margin: 0;

    color: ${({ theme }) => theme.colors.text};

    font-size: ${({ theme }) => theme.typography.h1};
`;

const PageDescription = styled.p`
    margin: 0;

    color: ${({ theme }) => theme.colors.textSecondary};

    font-size: ${({ theme }) => theme.typography.body};
`;

const Section = styled.section`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};

    padding: ${({ theme }) => theme.spacing.lg};

    background: ${({ theme }) => theme.colors.surface};

    border: 1px solid ${({ theme }) => theme.colors.border};

    border-radius: ${({ theme }) => theme.radius.lg};

    box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const SectionTitle = styled.h2`
    margin: 0;

    color: ${({ theme }) => theme.colors.text};

    font-size: ${({ theme }) => theme.typography.h2};
`;

const SummaryGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: ${({ theme }) => theme.spacing.md};

    @media (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;

const SummaryCard = styled.div`
    padding: ${({ theme }) => theme.spacing.lg};

    background: ${({ theme }) => theme.colors.background};

    border: 1px solid ${({ theme }) => theme.colors.border};

    border-radius: ${({ theme }) => theme.radius.md};
`;

const SummaryLabel = styled.p`
    margin: 0 0 ${({ theme }) => theme.spacing.xs};

    color: ${({ theme }) => theme.colors.textSecondary};

    font-size: ${({ theme }) => theme.typography.small};
`;

const SummaryValue = styled.p`
    margin: 0;

    color: ${({ theme }) => theme.colors.text};

    font-size: ${({ theme }) => theme.typography.h2};
    font-weight: 700;
`;

const FormGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${({ theme }) => theme.spacing.md};

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
    }
`;

const Input = styled.input`
    width: 100%;
    box-sizing: border-box;

    padding: 12px 14px;

    background: ${({ theme }) => theme.colors.background};

    color: ${({ theme }) => theme.colors.text};

    border: 1px solid ${({ theme }) => theme.colors.border};

    border-radius: ${({ theme }) => theme.radius.md};

    font-size: ${({ theme }) => theme.typography.body};

    outline: none;

    transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease;

    &:focus {
        border-color: ${({ theme }) => theme.colors.primary};

        box-shadow:
            0 0 0 3px
            ${({ theme }) => theme.colors.primary}20;
    }

    &::placeholder {
        color: ${({ theme }) => theme.colors.textSecondary};
    }
`;

const ButtonRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing.sm};
`;

const PrimaryButton = styled.button`
    padding: 10px 16px;

    background: ${({ theme }) => theme.colors.primary};

    color: #ffffff;

    border: none;

    border-radius: ${({ theme }) => theme.radius.md};

    font-size: ${({ theme }) => theme.typography.body};
    font-weight: 600;

    cursor: pointer;

    transition:
        background 0.2s ease,
        transform 0.2s ease;

    &:hover {
        background: ${({ theme }) => theme.colors.primaryHover};

        transform: translateY(-1px);
    }
`;

const SecondaryButton = styled.button`
    padding: 10px 16px;

    background: ${({ theme }) => theme.colors.background};

    color: ${({ theme }) => theme.colors.text};

    border: 1px solid ${({ theme }) => theme.colors.border};

    border-radius: ${({ theme }) => theme.radius.md};

    font-size: ${({ theme }) => theme.typography.body};
    font-weight: 600;

    cursor: pointer;

    transition:
        background 0.2s ease,
        border-color 0.2s ease;

    &:hover {
        background: ${({ theme }) => theme.colors.surfaceHover};

        border-color: ${({ theme }) => theme.colors.primary};
    }
`;

const DangerButton = styled.button`
    padding: 10px 16px;

    background: ${({ theme }) => theme.colors.error};

    color: #ffffff;

    border: none;

    border-radius: ${({ theme }) => theme.radius.md};

    font-size: ${({ theme }) => theme.typography.body};
    font-weight: 600;

    cursor: pointer;

    transition:
        background 0.2s ease,
        transform 0.2s ease;

    &:hover {
        background: ${({ theme }) => theme.colors.error};

        transform: translateY(-1px);
    }
`;

const InvoiceGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spacing.md};

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
    }
`;

const InvoiceCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.sm};

    padding: ${({ theme }) => theme.spacing.lg};

    background: ${({ theme }) => theme.colors.background};

    border: 1px solid ${({ theme }) => theme.colors.border};

    border-radius: ${({ theme }) => theme.radius.md};
`;

const InvoiceHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: ${({ theme }) => theme.spacing.md};
`;

const InvoiceTitle = styled.h3`
    margin: 0;

    color: ${({ theme }) => theme.colors.text};

    font-size: ${({ theme }) => theme.typography.h3};
`;

const InvoiceInfo = styled.p`
    margin: 0;

    color: ${({ theme }) => theme.colors.textSecondary};

    font-size: ${({ theme }) => theme.typography.body};
`;

const StatusBadge = styled.span`
    display: inline-flex;
    align-items: center;

    width: fit-content;

    padding: 5px 10px;

    border-radius: 999px;

    background: ${({ theme, $status }) =>
        $status === "paid"
            ? theme.colors.success
            : $status === "cancelled"
                ? theme.colors.text
                : theme.colors.warning};

    color: ${({ theme }) => theme.colors.background};

    font-size: ${({ theme }) => theme.typography.small};
    font-weight: 600;
`;

const DetailGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spacing.md};

    @media (max-width: 700px) {
        grid-template-columns: 1fr;
    }
`;

const DetailItem = styled.div`
    padding: ${({ theme }) => theme.spacing.md};

    background: ${({ theme }) => theme.colors.background};

    border: 1px solid ${({ theme }) => theme.colors.border};

    border-radius: ${({ theme }) => theme.radius.md};
`;

const DetailLabel = styled.p`
    margin: 0 0 ${({ theme }) => theme.spacing.xs};

    color: ${({ theme }) => theme.colors.textSecondary};

    font-size: ${({ theme }) => theme.typography.small};
`;

const DetailValue = styled.p`
    margin: 0;

    color: ${({ theme }) => theme.colors.text};

    font-size: ${({ theme }) => theme.typography.body};
    font-weight: 600;
`;

const PaymentList = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.sm};
`;

const PaymentCard = styled.div`
    padding: ${({ theme }) => theme.spacing.md};

    background: ${({ theme }) => theme.colors.background};

    border: 1px solid ${({ theme }) => theme.colors.border};

    border-radius: ${({ theme }) => theme.radius.md};
`;

const PaymentInfo = styled.p`
    margin: 0 0 ${({ theme }) => theme.spacing.xs};

    color: ${({ theme }) => theme.colors.textSecondary};

    font-size: ${({ theme }) => theme.typography.body};

    &:last-child {
        margin-bottom: 0;
    }
`;

const Message = styled.p`
    margin: 0;

    padding: ${({ theme }) => theme.spacing.md};

    background: ${({ theme }) => theme.colors.background};

    color: ${({ theme }) => theme.colors.textSecondary};

    border: 1px solid ${({ theme }) => theme.colors.border};

    border-radius: ${({ theme }) => theme.radius.md};
`;

const ErrorMessage = styled(Message)`
    color: ${({ theme }) => theme.colors.error};

    border-color: ${({ theme }) => theme.colors.error};
`;

function InvoicePage() {
    const { user } = useAuth();

    const {
        invoices,
        selectedInvoice,
        payments,
        summary,
        loading,
        error,
        fetchInvoices,
        fetchInvoice,
        fetchPayments,
        fetchBillingSummary,
        addInvoice,
        addPayment,
        changeInvoiceStatus
    } = useBilling();

    const [patientId, setPatientId] = useState("");
    const [appointmentId, setAppointmentId] = useState("");
    const [invoiceAmount, setInvoiceAmount] = useState("");
    const [paymentAmount, setPaymentAmount] = useState("");

    const roles = user?.roles || [];

    const canCreateInvoice =
        roles.includes("Admin") ||
        roles.includes("Provider");

    const isAdmin = roles.includes("Admin");

    useEffect(() => {
        fetchInvoices();

        if (isAdmin) {
            fetchBillingSummary();
        }
    }, [
        fetchInvoices,
        fetchBillingSummary,
        isAdmin
    ]);

    const handleViewDetails = (invoiceId) => {
        fetchInvoice(invoiceId);
        fetchPayments(invoiceId);
        setPaymentAmount("");
    };

    const handleCreateInvoice = () => {
        const patient = Number(patientId);
        const amount = Number(invoiceAmount);

        if (patient <= 0 || amount <= 0) {
            return;
        }

        const invoiceData = {
            patient_id: patient,
            amount
        };

        if (appointmentId) {
            invoiceData.appointment_id =
                Number(appointmentId);
        }

        addInvoice(invoiceData);

        setPatientId("");
        setAppointmentId("");
        setInvoiceAmount("");
    };

    const handleAddPayment = () => {
        if (!selectedInvoice) {
            return;
        }

        const amount = Number(paymentAmount);

        if (amount <= 0) {
            return;
        }

        addPayment({
            invoice_id: selectedInvoice.id,
            amount
        });

        setPaymentAmount("");
    };

    const handleCancelInvoice = () => {
        if (!selectedInvoice) {
            return;
        }

        changeInvoiceStatus(
            selectedInvoice.id,
            "cancelled"
        );
    };

    return (
        <PageContainer>
            <PageHeader>
                <PageTitle>Invoices</PageTitle>

                <PageDescription>
                    Billing and Payment
                </PageDescription>
            </PageHeader>

            {summary && (
                <Section>
                    <SectionTitle>
                        Billing Summary
                    </SectionTitle>

                    <SummaryGrid>
                        <SummaryCard>
                            <SummaryLabel>
                                Total Invoices
                            </SummaryLabel>

                            <SummaryValue>
                                {summary.total_invoices}
                            </SummaryValue>
                        </SummaryCard>

                        <SummaryCard>
                            <SummaryLabel>
                                Total Amount
                            </SummaryLabel>

                            <SummaryValue>
                                {summary.total_amount}
                            </SummaryValue>
                        </SummaryCard>

                        <SummaryCard>
                            <SummaryLabel>
                                Paid Amount
                            </SummaryLabel>

                            <SummaryValue>
                                {summary.paid_amount}
                            </SummaryValue>
                        </SummaryCard>

                        <SummaryCard>
                            <SummaryLabel>
                                Pending Amount
                            </SummaryLabel>

                            <SummaryValue>
                                {summary.pending_amount}
                            </SummaryValue>
                        </SummaryCard>
                    </SummaryGrid>
                </Section>
            )}

            {canCreateInvoice && (
                <Section>
                    <SectionTitle>
                        Create Invoice
                    </SectionTitle>

                    <FormGrid>
                        <Input
                            type="number"
                            placeholder="Patient ID"
                            value={patientId}
                            onChange={(event) =>
                                setPatientId(
                                    event.target.value
                                )
                            }
                        />

                        <Input
                            type="number"
                            placeholder="Appointment ID (optional)"
                            value={appointmentId}
                            onChange={(event) =>
                                setAppointmentId(
                                    event.target.value
                                )
                            }
                        />

                        <Input
                            type="number"
                            placeholder="Invoice amount"
                            value={invoiceAmount}
                            onChange={(event) =>
                                setInvoiceAmount(
                                    event.target.value
                                )
                            }
                        />
                    </FormGrid>

                    <ButtonRow>
                        <PrimaryButton
                            onClick={handleCreateInvoice}
                        >
                            Create Invoice
                        </PrimaryButton>
                    </ButtonRow>
                </Section>
            )}

            {loading && (
                <Message>
                    Loading billing information...
                </Message>
            )}

            {error && (
                <ErrorMessage>
                    {error}
                </ErrorMessage>
            )}

            {!loading &&
                !error &&
                invoices.length === 0 && (
                    <Section>
                        <Message>
                            No invoices found.
                        </Message>
                    </Section>
                )}

            {!loading &&
                !error &&
                invoices.length > 0 && (
                    <Section>
                        <SectionTitle>
                            Invoice List
                        </SectionTitle>

                        <InvoiceGrid>
                            {invoices.map((invoice) => (
                                <InvoiceCard key={invoice.id}>
                                    <InvoiceHeader>
                                        <InvoiceTitle>
                                            Invoice #
                                            {invoice.id}
                                        </InvoiceTitle>

                                        <StatusBadge
                                            $status={
                                                invoice.status
                                            }
                                        >
                                            {invoice.status}
                                        </StatusBadge>
                                    </InvoiceHeader>

                                    <InvoiceInfo>
                                        Patient ID:{" "}
                                        {invoice.patient_id}
                                    </InvoiceInfo>

                                    <InvoiceInfo>
                                        Amount:{" "}
                                        {invoice.amount}
                                    </InvoiceInfo>

                                    <ButtonRow>
                                        <SecondaryButton
                                            onClick={() =>
                                                handleViewDetails(
                                                    invoice.id
                                                )
                                            }
                                        >
                                            View Details
                                        </SecondaryButton>
                                    </ButtonRow>
                                </InvoiceCard>
                            ))}
                        </InvoiceGrid>
                    </Section>
                )}

            {selectedInvoice && (
                <Section>
                    <SectionTitle>
                        Invoice Details
                    </SectionTitle>

                    <DetailGrid>
                        <DetailItem>
                            <DetailLabel>
                                Invoice ID
                            </DetailLabel>

                            <DetailValue>
                                {selectedInvoice.id}
                            </DetailValue>
                        </DetailItem>

                        <DetailItem>
                            <DetailLabel>
                                Patient ID
                            </DetailLabel>

                            <DetailValue>
                                {selectedInvoice.patient_id}
                            </DetailValue>
                        </DetailItem>

                        <DetailItem>
                            <DetailLabel>
                                Appointment ID
                            </DetailLabel>

                            <DetailValue>
                                {selectedInvoice.appointment_id ||
                                    "Not linked"}
                            </DetailValue>
                        </DetailItem>

                        <DetailItem>
                            <DetailLabel>
                                Invoice Number
                            </DetailLabel>

                            <DetailValue>
                                {
                                    selectedInvoice.invoice_number
                                }
                            </DetailValue>
                        </DetailItem>

                        <DetailItem>
                            <DetailLabel>
                                Amount
                            </DetailLabel>

                            <DetailValue>
                                {selectedInvoice.amount}
                            </DetailValue>
                        </DetailItem>

                        <DetailItem>
                            <DetailLabel>
                                Status
                            </DetailLabel>

                            <StatusBadge
                                $status={
                                    selectedInvoice.status
                                }
                            >
                                {selectedInvoice.status}
                            </StatusBadge>
                        </DetailItem>

                        <DetailItem>
                            <DetailLabel>
                                Created At
                            </DetailLabel>

                            <DetailValue>
                                {
                                    selectedInvoice.created_at
                                }
                            </DetailValue>
                        </DetailItem>

                        <DetailItem>
                            <DetailLabel>
                                Updated At
                            </DetailLabel>

                            <DetailValue>
                                {
                                    selectedInvoice.updated_at
                                }
                            </DetailValue>
                        </DetailItem>
                    </DetailGrid>

                    <SectionTitle>
                        Payment History
                    </SectionTitle>

                    {payments.length === 0 && (
                        <Message>
                            No payments found.
                        </Message>
                    )}

                    {payments.length > 0 && (
                        <PaymentList>
                            {payments.map((payment) => (
                                <PaymentCard
                                    key={payment.id}
                                >
                                    <PaymentInfo>
                                        Payment ID:{" "}
                                        {payment.id}
                                    </PaymentInfo>

                                    <PaymentInfo>
                                        Amount:{" "}
                                        {payment.amount}
                                    </PaymentInfo>

                                    <PaymentInfo>
                                        Status:{" "}
                                        {payment.status}
                                    </PaymentInfo>

                                    <PaymentInfo>
                                        Paid At:{" "}
                                        {payment.paid_at}
                                    </PaymentInfo>

                                    <PaymentInfo>
                                        Created At:{" "}
                                        {payment.created_at}
                                    </PaymentInfo>
                                </PaymentCard>
                            ))}
                        </PaymentList>
                    )}

                    {isAdmin &&
                        selectedInvoice.status ===
                        "pending" && (
                            <Section>
                                <SectionTitle>
                                    Record Payment
                                </SectionTitle>

                                <Input
                                    type="number"
                                    placeholder="Payment amount"
                                    value={paymentAmount}
                                    onChange={(event) =>
                                        setPaymentAmount(
                                            event.target.value
                                        )
                                    }
                                />

                                <ButtonRow>
                                    <PrimaryButton
                                        onClick={
                                            handleAddPayment
                                        }
                                    >
                                        Record Payment
                                    </PrimaryButton>

                                    <DangerButton
                                        onClick={
                                            handleCancelInvoice
                                        }
                                    >
                                        Cancel Invoice
                                    </DangerButton>
                                </ButtonRow>
                            </Section>
                        )}
                </Section>
            )}
        </PageContainer>
    );
}

export default InvoicePage;