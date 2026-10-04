import { useEffect } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";

import { usePrescriptions } from "../../modules/prescriptions/hooks/usePrescriptions";
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

const DetailsCard = styled.section`
    padding: ${({ theme }) => theme.spacing.xl};

    background: ${({ theme }) => theme.colors.surface};

    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.lg};

    box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const BasicDetails = styled.div`
    display: grid;

    grid-template-columns: repeat(3, minmax(0, 1fr));

    gap: ${({ theme }) => theme.spacing.md};

    margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const DetailItem = styled.div`
    padding: ${({ theme }) => theme.spacing.md};

    background: ${({ theme }) => theme.colors.surfaceHover};

    border-radius: ${({ theme }) => theme.radius.md};
`;

const DetailLabel = styled.p`
    margin-bottom: ${({ theme }) => theme.spacing.xs};

    color: ${({ theme }) => theme.colors.textSecondary};

    font-size: ${({ theme }) => theme.typography.small};
    font-weight: 600;
`;

const DetailValue = styled.p`
    margin: 0;

    color: ${({ theme }) => theme.colors.text};

    font-size: ${({ theme }) => theme.typography.body};
`;

const StatusBadge = styled.span`
    display: inline-flex;
    align-items: center;

    width: fit-content;

    padding: 5px 12px;

    border-radius: ${({ theme }) => theme.radius.pill};

    background: ${({ theme }) => theme.colors.warning};
    color: #ffffff;

    font-size: ${({ theme }) => theme.typography.small};
    font-weight: 600;
`;

const Section = styled.section`
    margin-top: ${({ theme }) => theme.spacing.lg};
`;

const SectionTitle = styled.h2`
    margin-bottom: ${({ theme }) => theme.spacing.md};

    color: ${({ theme }) => theme.colors.text};
`;

const MedicationList = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
`;

const MedicationCard = styled.div`
    padding: ${({ theme }) => theme.spacing.lg};

    background: ${({ theme }) => theme.colors.surface};

    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.md};

    box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const MedicationHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const MedicineName = styled.h3`
    margin: 0;

    color: ${({ theme }) => theme.colors.primary};
`;

const MedicationGrid = styled.div`
    display: grid;

    grid-template-columns: repeat(3, minmax(0, 1fr));

    gap: ${({ theme }) => theme.spacing.md};
`;

const MedicationItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xs};
`;

const MedicationLabel = styled.span`
    color: ${({ theme }) => theme.colors.textSecondary};

    font-size: ${({ theme }) => theme.typography.small};
    font-weight: 600;
`;

const MedicationValue = styled.span`
    color: ${({ theme }) => theme.colors.text};
`;

const InstructionsCard = styled.div`
    padding: ${({ theme }) => theme.spacing.lg};

    background: ${({ theme }) => theme.colors.surfaceHover};

    border-left: 4px solid
        ${({ theme }) => theme.colors.primary};

    border-radius: ${({ theme }) => theme.radius.md};
`;

const InstructionsText = styled.p`
    margin: 0;

    color: ${({ theme }) => theme.colors.text};

    line-height: 1.6;
`;

const EmptyMessage = styled.p`
    margin: 0;

    color: ${({ theme }) => theme.colors.textSecondary};
`;

const BackLink = styled(Link)`
    display: inline-flex;
    align-items: center;
    justify-content: center;

    width: fit-content;
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

const Message = styled.div`
    padding: ${({ theme }) => theme.spacing.xl};

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

function PrescriptionDetails() {
    const { id } = useParams();

    const {
        selectedPrescription,
        loading,
        error,
        loadPrescription
    } = usePrescriptions();

    useEffect(() => {
        loadPrescription(id);
    }, [id, loadPrescription]);

    const medications =
        selectedPrescription?.details?.medications || [];

    const instructions =
        selectedPrescription?.details?.instructions || "";

    return (
        <PageContainer>
            <PageHeader>
                <PageTitle>
                    Prescription Details
                </PageTitle>

                <PageSubtitle>
                    View prescription information
                </PageSubtitle>
            </PageHeader>

            {loading && <Loader />}

            {error && (
                <ErrorMessage>
                    {error}
                </ErrorMessage>
            )}

            {!loading &&
                !error &&
                selectedPrescription && (
                    <>
                        <DetailsCard>
                            <BasicDetails>
                                <DetailItem>
                                    <DetailLabel>
                                        Prescription ID
                                    </DetailLabel>

                                    <DetailValue>
                                        {
                                            selectedPrescription.id
                                        }
                                    </DetailValue>
                                </DetailItem>

                                <DetailItem>
                                    <DetailLabel>
                                        Patient ID
                                    </DetailLabel>

                                    <DetailValue>
                                        {
                                            selectedPrescription.patient_id
                                        }
                                    </DetailValue>
                                </DetailItem>

                                <DetailItem>
                                    <DetailLabel>
                                        Status
                                    </DetailLabel>

                                    <StatusBadge>
                                        {
                                            selectedPrescription.status
                                        }
                                    </StatusBadge>
                                </DetailItem>
                            </BasicDetails>

                            <Section>
                                <SectionTitle>
                                    Medications
                                </SectionTitle>

                                {medications.length > 0 ? (
                                    <MedicationList>
                                        {medications.map(
                                            (medication, index) => (
                                                <MedicationCard
                                                    key={index}
                                                >
                                                    <MedicationHeader>
                                                        <MedicineName>
                                                            {
                                                                medication.name
                                                            }
                                                        </MedicineName>
                                                    </MedicationHeader>

                                                    <MedicationGrid>
                                                        <MedicationItem>
                                                            <MedicationLabel>
                                                                Dosage
                                                            </MedicationLabel>

                                                            <MedicationValue>
                                                                {
                                                                    medication.dosage
                                                                }
                                                            </MedicationValue>
                                                        </MedicationItem>

                                                        <MedicationItem>
                                                            <MedicationLabel>
                                                                Frequency
                                                            </MedicationLabel>

                                                            <MedicationValue>
                                                                {
                                                                    medication.frequency
                                                                }
                                                            </MedicationValue>
                                                        </MedicationItem>

                                                        <MedicationItem>
                                                            <MedicationLabel>
                                                                Duration
                                                            </MedicationLabel>

                                                            <MedicationValue>
                                                                {
                                                                    medication.duration
                                                                }
                                                            </MedicationValue>
                                                        </MedicationItem>
                                                    </MedicationGrid>
                                                </MedicationCard>
                                            )
                                        )}
                                    </MedicationList>
                                ) : (
                                    <EmptyMessage>
                                        No medication details
                                        available.
                                    </EmptyMessage>
                                )}
                            </Section>

                            <Section>
                                <SectionTitle>
                                    Instructions
                                </SectionTitle>

                                <InstructionsCard>
                                    <InstructionsText>
                                        {instructions ||
                                            "No instructions provided."}
                                    </InstructionsText>
                                </InstructionsCard>
                            </Section>
                        </DetailsCard>

                        <BackLink to="/prescriptions">
                            Back to Prescriptions
                        </BackLink>
                    </>
                )}

            {!loading &&
                !error &&
                !selectedPrescription && (
                    <Message>
                        Prescription details not found.
                    </Message>
                )}
        </PageContainer>
    );
}

export default PrescriptionDetails;