import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { useAuth } from "../../modules/auth/hooks/useAuth";
import { usePrescriptions } from "../../modules/prescriptions/hooks/usePrescriptions";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";

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
`;

const PageSubtitle = styled.p`
    margin: 0;

    color: ${({ theme }) => theme.colors.textSecondary};
`;

const FormSection = styled.section`
    padding: ${({ theme }) => theme.spacing.xl};

    background: ${({ theme }) => theme.colors.surface};

    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.lg};

    box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const SectionTitle = styled.h2`
    margin-bottom: ${({ theme }) => theme.spacing.lg};

    color: ${({ theme }) => theme.colors.text};
`;

const Form = styled.form`
    display: grid;

    grid-template-columns: repeat(2, minmax(0, 1fr));

    gap: ${({ theme }) => theme.spacing.md};
`;

const Field = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xs};
`;

const FullWidthField = styled(Field)`
    grid-column: 1 / -1;
`;

const Label = styled.label`
    color: ${({ theme }) => theme.colors.text};

    font-size: ${({ theme }) => theme.typography.body};
    font-weight: 600;
`;

const FormActions = styled.div`
    display: flex;
    justify-content: flex-end;

    grid-column: 1 / -1;

    padding-top: ${({ theme }) => theme.spacing.sm};
`;

const Message = styled.div`
    padding: ${({ theme }) => theme.spacing.lg};

    background: ${({ theme }) => theme.colors.surface};

    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.md};

    color: ${({ theme }) => theme.colors.textSecondary};

    text-align: center;
`;

const ErrorMessage = styled(Message)`
    border-color: ${({ theme }) => theme.colors.danger};

    color: ${({ theme }) => theme.colors.danger};
`;

const PrescriptionGrid = styled.div`
    display: grid;

    grid-template-columns: repeat(
        auto-fill,
        minmax(280px, 1fr)
    );

    gap: ${({ theme }) => theme.spacing.lg};
`;

const PrescriptionCard = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    min-height: 220px;

    padding: ${({ theme }) => theme.spacing.lg};

    background: ${({ theme }) => theme.colors.surface};

    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.md};

    box-shadow: ${({ theme }) => theme.shadows.sm};

    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: ${({ theme }) => theme.shadows.md};
    }
`;

const PrescriptionDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.sm};
`;

const DetailItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xs};
`;

const DetailLabel = styled.span`
    color: ${({ theme }) => theme.colors.textSecondary};

    font-size: ${({ theme }) => theme.typography.small};
    font-weight: 600;
`;

const DetailValue = styled.span`
    color: ${({ theme }) => theme.colors.text};
`;

const StatusBadge = styled.span`
    display: inline-flex;
    align-items: center;

    width: fit-content;

    padding: 5px 10px;

    border-radius: ${({ theme }) => theme.radius.pill};

    background: ${({ theme }) =>
        theme.colors.warning};

    color: #ffffff;

    font-size: ${({ theme }) => theme.typography.small};
    font-weight: 600;
`;

const CardActions = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    gap: ${({ theme }) => theme.spacing.sm};

    margin-top: ${({ theme }) => theme.spacing.lg};
`;

const DetailsLink = styled(Link)`
    display: inline-flex;
    align-items: center;
    justify-content: center;

    min-height: 40px;

    padding: 10px 18px;

    border: 1px solid ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.radius.md};

    background: transparent;
    color: ${({ theme }) => theme.colors.primary};

    font-size: ${({ theme }) => theme.typography.body};
    font-weight: 600;

    text-decoration: none;

    transition:
        background 0.2s ease,
        color 0.2s ease;

    &:hover {
        background: ${({ theme }) => theme.colors.primary};
        color: #ffffff;
    }
`;

function PrescriptionList() {
    const { user } = useAuth();

    const {
        prescriptions,
        loading,
        error,
        loadPrescriptions,
        addPrescription,
        updateStatus
    } = usePrescriptions();

    const roles = user?.roles || [];

    const [patientId, setPatientId] = useState("");
    const [medicineName, setMedicineName] = useState("");
    const [dosage, setDosage] = useState("");
    const [frequency, setFrequency] = useState("");
    const [duration, setDuration] = useState("");
    const [instructions, setInstructions] = useState("");

    useEffect(() => {
        loadPrescriptions();
    }, [loadPrescriptions]);

    const handleCreatePrescription = (e) => {
        e.preventDefault();

        addPrescription({
            patient_id: Number(patientId),
            details: {
                medications: [
                    {
                        name: medicineName,
                        dosage,
                        frequency,
                        duration
                    }
                ],
                instructions
            }
        });
    };

    const handleStatusUpdate = (id, status) => {
        updateStatus({
            id,
            status
        });
    };

    return (
        <PageContainer>
            <PageHeader>
                <PageTitle>
                    Prescriptions
                </PageTitle>

                <PageSubtitle>
                    Prescription Management
                </PageSubtitle>
            </PageHeader>

            {(roles.includes("Admin") ||
                roles.includes("Provider")) && (
                    <FormSection>
                        <SectionTitle>
                            Create Prescription
                        </SectionTitle>

                        <Form
                            onSubmit={handleCreatePrescription}
                        >
                            <Field>
                                <Label htmlFor="patientId">
                                    Patient ID
                                </Label>

                                <Input
                                    id="patientId"
                                    name="patientId"
                                    type="number"
                                    value={patientId}
                                    onChange={(e) =>
                                        setPatientId(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter patient ID"
                                    required
                                />
                            </Field>

                            <Field>
                                <Label htmlFor="medicineName">
                                    Medicine Name
                                </Label>

                                <Input
                                    id="medicineName"
                                    name="medicineName"
                                    value={medicineName}
                                    onChange={(e) =>
                                        setMedicineName(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter medicine name"
                                    required
                                />
                            </Field>

                            <Field>
                                <Label htmlFor="dosage">
                                    Dosage
                                </Label>

                                <Input
                                    id="dosage"
                                    name="dosage"
                                    value={dosage}
                                    onChange={(e) =>
                                        setDosage(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter dosage"
                                    required
                                />
                            </Field>

                            <Field>
                                <Label htmlFor="frequency">
                                    Frequency
                                </Label>

                                <Input
                                    id="frequency"
                                    name="frequency"
                                    value={frequency}
                                    onChange={(e) =>
                                        setFrequency(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter frequency"
                                    required
                                />
                            </Field>

                            <Field>
                                <Label htmlFor="duration">
                                    Duration
                                </Label>

                                <Input
                                    id="duration"
                                    name="duration"
                                    value={duration}
                                    onChange={(e) =>
                                        setDuration(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter duration"
                                    required
                                />
                            </Field>

                            <FullWidthField>
                                <Label htmlFor="instructions">
                                    Instructions
                                </Label>

                                <Input
                                    id="instructions"
                                    name="instructions"
                                    value={instructions}
                                    onChange={(e) =>
                                        setInstructions(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter instructions"
                                    required
                                />
                            </FullWidthField>

                            <FormActions>
                                <Button
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Creating..."
                                        : "Create Prescription"}
                                </Button>
                            </FormActions>
                        </Form>
                    </FormSection>
                )}

            {loading && <Loader />}

            {error && (
                <ErrorMessage>
                    {error}
                </ErrorMessage>
            )}

            {!loading &&
                !error &&
                prescriptions.length === 0 && (
                    <Message>
                        No prescriptions found.
                    </Message>
                )}

            {!loading &&
                !error &&
                prescriptions.length > 0 && (
                    <PrescriptionGrid>
                        {prescriptions.map(
                            (prescription) => (
                                <PrescriptionCard
                                    key={prescription.id}
                                >
                                    <PrescriptionDetails>
                                        <DetailItem>
                                            <DetailLabel>
                                                Prescription ID
                                            </DetailLabel>

                                            <DetailValue>
                                                {
                                                    prescription.id
                                                }
                                            </DetailValue>
                                        </DetailItem>

                                        <DetailItem>
                                            <DetailLabel>
                                                Patient ID
                                            </DetailLabel>

                                            <DetailValue>
                                                {
                                                    prescription.patient_id
                                                }
                                            </DetailValue>
                                        </DetailItem>

                                        <DetailItem>
                                            <DetailLabel>
                                                Status
                                            </DetailLabel>

                                            <StatusBadge>
                                                {
                                                    prescription.status
                                                }
                                            </StatusBadge>
                                        </DetailItem>
                                    </PrescriptionDetails>

                                    <CardActions>
                                        <DetailsLink
                                            to={`/prescriptions/detail/${prescription.id}`}
                                        >
                                            View Details
                                        </DetailsLink>

                                        {roles.includes(
                                            "Pharmacist"
                                        ) &&
                                            prescription.status ===
                                            "pending" && (
                                                <Button
                                                    type="button"
                                                    onClick={() =>
                                                        handleStatusUpdate(
                                                            prescription.id,
                                                            "verified"
                                                        )
                                                    }
                                                    disabled={
                                                        loading
                                                    }
                                                >
                                                    Verify
                                                </Button>
                                            )}
                                    </CardActions>
                                </PrescriptionCard>
                            )
                        )}
                    </PrescriptionGrid>
                )}
        </PageContainer>
    );
}

export default PrescriptionList;