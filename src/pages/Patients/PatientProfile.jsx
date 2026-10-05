import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { usePatients } from "../../modules/patients/hooks/usePatients";
import PatientForm from "../../components/forms/PatientForm";
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

    font-size: ${({ theme }) => theme.typography.h1};
`;

const PageSubtitle = styled.p`
    margin: 0;

    color: ${({ theme }) => theme.colors.textSecondary};

    font-size: ${({ theme }) => theme.typography.body};
`;

const PatientCard = styled.section`
    padding: ${({ theme }) => theme.spacing.xl};

    background: ${({ theme }) => theme.colors.surface};

    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.lg};

    box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const PatientCardHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: ${({ theme }) => theme.spacing.md};

    margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const PatientCardTitle = styled.h2`
    margin: 0;

    color: ${({ theme }) => theme.colors.text};

    font-size: ${({ theme }) => theme.typography.h2};
`;

const PatientBadge = styled.span`
    display: inline-flex;
    align-items: center;

    padding: 6px 12px;

    border-radius: ${({ theme }) => theme.radius.pill};

    background: ${({ theme }) => theme.colors.primary};
    color: #ffffff;

    font-size: ${({ theme }) => theme.typography.small};
    font-weight: 600;
`;

const PatientDetails = styled.div`
    display: grid;

    grid-template-columns: repeat(
        2,
        minmax(0, 1fr)
    );

    gap: ${({ theme }) => theme.spacing.md};

    @media (max-width: 700px) {
        grid-template-columns: 1fr;
    }
`;

const DetailItem = styled.div`
    padding: ${({ theme }) => theme.spacing.md};

    background: ${({ theme }) => theme.colors.surfaceHover};

    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.md};
`;

const DetailLabel = styled.p`
    margin: 0 0 ${({ theme }) => theme.spacing.xs};

    color: ${({ theme }) => theme.colors.textSecondary};

    font-size: ${({ theme }) => theme.typography.small};
    font-weight: 600;
`;

const DetailValue = styled.p`
    margin: 0;

    color: ${({ theme }) => theme.colors.text};

    word-break: break-word;
`;

const FormSection = styled.section`
    padding: ${({ theme }) => theme.spacing.xl};

    background: ${({ theme }) => theme.colors.surface};

    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.lg};

    box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const SectionHeader = styled.div`
    margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SectionTitle = styled.h2`
    margin: 0;

    color: ${({ theme }) => theme.colors.text};

    font-size: ${({ theme }) => theme.typography.h2};
`;

const SectionDescription = styled.p`
    margin: ${({ theme }) => theme.spacing.xs} 0 0;

    color: ${({ theme }) => theme.colors.textSecondary};

    font-size: ${({ theme }) => theme.typography.small};
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

function PatientProfile() {
    const { id } = useParams();

    const {
        selectedPatient,
        loading,
        error,
        loadPatient
    } = usePatients();

    useEffect(() => {
        loadPatient(id);
    }, [id, loadPatient]);

    return (
        <PageContainer>
            <PageHeader>
                <PageTitle>Patient Profile</PageTitle>

                <PageSubtitle>
                    View and update patient information
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
                selectedPatient && (
                    <>
                        <PatientCard>
                            <PatientCardHeader>
                                <PatientCardTitle>
                                    Patient Information
                                </PatientCardTitle>

                                <PatientBadge>
                                    ID: {selectedPatient.id}
                                </PatientBadge>
                            </PatientCardHeader>

                            <PatientDetails>
                                <DetailItem>
                                    <DetailLabel>
                                        Patient ID
                                    </DetailLabel>

                                    <DetailValue>
                                        {selectedPatient.id}
                                    </DetailValue>
                                </DetailItem>

                                <DetailItem>
                                    <DetailLabel>
                                        Patient Data
                                    </DetailLabel>

                                    <DetailValue>
                                        {selectedPatient.encrypted_data}
                                    </DetailValue>
                                </DetailItem>
                            </PatientDetails>
                        </PatientCard>

                        <FormSection>
                            <SectionHeader>
                                <SectionTitle>
                                    Edit Patient
                                </SectionTitle>

                                <SectionDescription>
                                    Update the patient's information below.
                                </SectionDescription>
                            </SectionHeader>

                            <PatientForm
                                patient={selectedPatient}
                            />
                        </FormSection>
                    </>
                )}

            {!loading &&
                !error &&
                !selectedPatient && (
                    <Message>
                        Patient not found.
                    </Message>
                )}
        </PageContainer>
    );
}

export default PatientProfile;