import { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { usePatients } from "../../modules/patients/hooks/usePatients";
import PatientForm from "../../components/forms/PatientForm";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xl};
`;

const PageHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${({ theme }) => theme.spacing.md};
`;

const PageTitle = styled.h1`
    margin: 0;

    color: ${({ theme }) => theme.colors.text};
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

const PatientGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(
        auto-fill,
        minmax(280px, 1fr)
    );

    gap: ${({ theme }) => theme.spacing.lg};
`;

const PatientCard = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    min-height: 180px;
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

const PatientContent = styled.div`
    margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const PatientTitle = styled.h3`
    margin-bottom: ${({ theme }) => theme.spacing.sm};

    color: ${({ theme }) => theme.colors.primary};
`;

const PatientData = styled.p`
    margin: 0;

    color: ${({ theme }) => theme.colors.textSecondary};

    word-break: break-word;
`;

const PatientActions = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};

    flex-wrap: wrap;
`;

const ViewLink = styled(Link)`
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

function PatientList() {
    const {
        patients,
        loading,
        error,
        loadPatients,
        removePatient
    } = usePatients();

    useEffect(() => {
        loadPatients();
    }, [loadPatients]);

    return (
        <PageContainer>
            <PageHeader>
                <PageTitle>Patients</PageTitle>
            </PageHeader>

            <FormSection>
                <SectionTitle>
                    Add Patient
                </SectionTitle>

                <PatientForm />
            </FormSection>

            {loading && <Loader />}

            {error && (
                <ErrorMessage>
                    {error}
                </ErrorMessage>
            )}

            {!loading &&
                !error &&
                patients.length === 0 && (
                    <Message>
                        No patients found.
                    </Message>
                )}

            {!loading &&
                !error &&
                patients.length > 0 && (
                    <PatientGrid>
                        {patients.map((patient) => (
                            <PatientCard key={patient.id}>
                                <PatientContent>
                                    <PatientTitle>
                                        Patient
                                    </PatientTitle>

                                    <PatientData>
                                        {patient.encrypted_data}
                                    </PatientData>
                                </PatientContent>

                                <PatientActions>
                                    <ViewLink
                                        to={`/patients/${patient.id}`}
                                    >
                                        View / Edit
                                    </ViewLink>

                                    <Button
                                        type="button"
                                        onClick={() =>
                                            removePatient(
                                                patient.id
                                            )
                                        }
                                    >
                                        Delete
                                    </Button>
                                </PatientActions>
                            </PatientCard>
                        ))}
                    </PatientGrid>
                )}
        </PageContainer>
    );
}

export default PatientList;