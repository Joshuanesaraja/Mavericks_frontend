import {
    useEffect,
    useMemo,
    useState
} from "react";

import styled from "styled-components";
import { Link } from "react-router-dom";

import { usePatients } from "../../modules/patients/hooks/usePatients";

import PatientForm from "../../components/forms/PatientForm";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";

const UI_PAGE_SIZE = 5;

/*
 * =========================================================
 * PAGE STYLES
 * =========================================================
 */

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

const FormSection = styled.section`
    padding: ${({ theme }) => theme.spacing.xl};

    background: ${({ theme }) => theme.colors.surface};

    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.lg};

    box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const Section = styled.section`
    display: flex;
    flex-direction: column;

    gap: ${({ theme }) => theme.spacing.md};
`;

const SectionHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: ${({ theme }) => theme.spacing.md};

    @media (max-width: 700px) {
        align-items: flex-start;
        flex-direction: column;
    }
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
    display: flex;
    flex-direction: column;

    gap: ${({ theme }) => theme.spacing.md};
`;

const PatientCard = styled.article`
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: ${({ theme }) => theme.spacing.lg};

    padding: ${({ theme }) => theme.spacing.lg};

    background: ${({ theme }) => theme.colors.surface};

    border: 1px solid ${({ theme }) => theme.colors.border};

    border-radius: ${({ theme }) => theme.radius.md};

    box-shadow: ${({ theme }) => theme.shadows.sm};

    transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease;

    &:hover {
        border-color:
            ${({ theme }) => theme.colors.primary};

        box-shadow:
            ${({ theme }) => theme.shadows.md};
    }

    @media (max-width: 700px) {
        flex-direction: column;

        align-items: stretch;
    }
`;

const PatientContent = styled.div`
    min-width: 0;

    flex: 1;
`;

const PatientTitle = styled.h3`
    margin: 0 0 ${({ theme }) => theme.spacing.xs};

    color: ${({ theme }) => theme.colors.primary};

    font-size: 16px;

    font-weight: 600;
`;

const PatientData = styled.p`
    margin: 0;

    color: ${({ theme }) => theme.colors.text};

    font-size: ${({ theme }) => theme.typography.body};

    word-break: break-word;
`;

const PatientActions = styled.div`
    display: flex;
    align-items: center;

    gap: ${({ theme }) => theme.spacing.sm};

    flex-shrink: 0;

    @media (max-width: 700px) {
        width: 100%;
    }
`;

const ViewLink = styled(Link)`
    display: inline-flex;
    align-items: center;
    justify-content: center;

    min-height: 40px;

    padding: 10px 18px;

    border: 1px solid
        ${({ theme }) => theme.colors.primary};

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
        background:
            ${({ theme }) => theme.colors.primary};

        color: #ffffff;
    }
`;

/*
 * =========================================================
 * PAGINATION
 * =========================================================
 */

const PaginationContainer = styled.div`
    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: ${({ theme }) => theme.spacing.md};

    padding-top: ${({ theme }) => theme.spacing.sm};

    @media (max-width: 700px) {
        flex-direction: column;
    }
`;

const PaginationInfo = styled.span`
    color: ${({ theme }) =>
        theme.colors.textSecondary};

    font-size: ${({ theme }) =>
        theme.typography.small};

    text-align: center;
`;

const PaginationActions = styled.div`
    display: flex;

    align-items: center;

    gap: ${({ theme }) => theme.spacing.sm};
`;

const PaginationButton = styled.button`
    display: inline-flex;

    align-items: center;

    justify-content: center;

    min-width: 96px;

    min-height: 40px;

    padding: 10px 18px;

    border: none;

    border-radius:
        ${({ theme }) => theme.radius.md};

    background:
        ${({ theme }) => theme.colors.primary};

    color: #ffffff;

    font-size:
        ${({ theme }) => theme.typography.body};

    font-weight: 600;

    cursor: pointer;

    transition:
        background 0.2s ease,
        transform 0.2s ease,
        box-shadow 0.2s ease;

    &:hover:not(:disabled) {
        background:
            ${({ theme }) =>
                theme.colors.primaryHover};

        box-shadow:
            ${({ theme }) => theme.shadows.sm};
    }

    &:active:not(:disabled) {
        transform: translateY(1px);
    }

    &:disabled {
        opacity: 0.5;

        cursor: not-allowed;
    }
`;

const PaginationPage = styled.span`
    min-width: 70px;

    color:
        ${({ theme }) => theme.colors.text};

    font-size:
        ${({ theme }) => theme.typography.small};

    font-weight: 600;

    text-align: center;
`;

/*
 * =========================================================
 * COMPONENT
 * =========================================================
 */

function PatientList() {
    const {
        patients,
        loading,
        error,

        pagination,
        loadedBatches,

        prefetchLoading,
        prefetchError,

        loadPatients,
        prefetchPatients,
        setCachedPatients,

        removePatient
    } = usePatients();

    /*
     * UI page inside the current 10-record API batch.
     *
     * 1 = first 5
     * 2 = second 5
     */
    const [
        displayPage,
        setDisplayPage
    ] = useState(1);

    /*
     * Initial API request.
     *
     * This fetches exactly 10.
     */
    useEffect(() => {
        loadPatients(1);
    }, [loadPatients]);

    /*
     * =========================================================
     * BACKGROUND PREFETCH
     * =========================================================
     *
     * When UI page 2 / 4 / 6 / ... is displayed,
     * fetch the NEXT 10 in the background.
     *
     * The current 5 patients remain untouched.
     */

    useEffect(() => {
        /*
         * Only prefetch on the SECOND HALF
         * of the current 10-patient batch.
         */
        if (displayPage !== 2) {
            return;
        }

        if (!pagination.hasMore) {
            return;
        }

        const nextApiPage =
            pagination.page + 1;

        /*
         * Already fetched?
         *
         * Then don't make another API request.
         */
        if (
            loadedBatches[
                nextApiPage
            ]
        ) {
            return;
        }

        /*
         * A background request is already running.
         */
        if (prefetchLoading) {
            return;
        }

        /*
         * Don't automatically hammer the API
         * after a failed background request.
         */
        if (
            prefetchError?.page ===
            nextApiPage
        ) {
            return;
        }

        prefetchPatients(
            nextApiPage
        );
    }, [
        displayPage,
        pagination.page,
        pagination.hasMore,
        loadedBatches,
        prefetchLoading,
        prefetchError,
        prefetchPatients
    ]);

    /*
     * =========================================================
     * CURRENT 5 PATIENTS
     * =========================================================
     */

    const visiblePatients =
        useMemo(() => {
            const start =
                (displayPage - 1) *
                UI_PAGE_SIZE;

            const end =
                start +
                UI_PAGE_SIZE;

            return patients.slice(
                start,
                end
            );
        }, [
            patients,
            displayPage
        ]);

    /*
     * =========================================================
     * PAGINATION STATE
     * =========================================================
     */

    const previousApiPage =
        pagination.page - 1;

    const nextApiPage =
        pagination.page + 1;

    const hasPreviousPage =
        displayPage === 2 ||
        (
            pagination.page > 1 &&
            Boolean(
                loadedBatches[
                    previousApiPage
                ]
            )
        );

    const nextBatchIsReady =
        Boolean(
            loadedBatches[
                nextApiPage
            ]
        );

    const hasNextPage =
        displayPage === 1
            ? patients.length > UI_PAGE_SIZE
            : (
                pagination.hasMore &&
                nextBatchIsReady
            );

    /*
     * =========================================================
     * PREVIOUS
     * =========================================================
     */

    const handlePrevious = () => {
        if (loading) {
            return;
        }

        /*
         * Page 2 -> Page 1
         *
         * No API request.
         */
        if (displayPage === 2) {
            setDisplayPage(1);
            return;
        }

        /*
         * Page 3 -> Page 2
         * Page 5 -> Page 4
         * Page 7 -> Page 6
         *
         * The previous 10 are already cached.
         */
        if (
            pagination.page > 1 &&
            loadedBatches[
                previousApiPage
            ]
        ) {
            setCachedPatients(
                previousApiPage
            );

            /*
             * We are moving to the SECOND
             * half of the previous 10.
             */
            setDisplayPage(2);
        }
    };

    /*
     * =========================================================
     * NEXT
     * =========================================================
     */

    const handleNext = () => {
        if (loading) {
            return;
        }

        /*
         * Page 1 -> Page 2
         *
         * The existing second 5 are already loaded.
         *
         * Once page 2 is displayed, the useEffect above
         * silently starts fetching the NEXT 10.
         */
        if (displayPage === 1) {
            if (
                patients.length >
                UI_PAGE_SIZE
            ) {
                setDisplayPage(2);
            }

            return;
        }

        /*
         * Page 2 -> Page 3
         *
         * The next 10 must already be prefetched.
         *
         * There is NO API call here.
         */
        if (
            pagination.hasMore &&
            loadedBatches[
                nextApiPage
            ]
        ) {
            setCachedPatients(
                nextApiPage
            );

            /*
             * Show the first 5 of the newly
             * loaded 10.
             */
            setDisplayPage(1);
        }
    };

    /*
     * =========================================================
     * DISPLAY RANGE
     * =========================================================
     */

    const visibleStart =
        (
            (pagination.page - 1) *
            10
        ) +
        (
            (displayPage - 1) *
            UI_PAGE_SIZE
        ) +
        1;

    const visibleEnd =
        Math.min(
            visibleStart +
                visiblePatients.length -
                1,
            pagination.total
        );

    return (
        <PageContainer>
            <PageHeader>
                <PageTitle>
                    Patients
                </PageTitle>

                <PageDescription>
                    Manage and view patient records
                </PageDescription>
            </PageHeader>

            <FormSection>
                <SectionTitle>
                    Add Patient
                </SectionTitle>

                <PatientForm />
            </FormSection>

            {/*
             * IMPORTANT:
             *
             * Loader is ONLY shown when there are
             * currently no patients.
             *
             * Therefore a background prefetch will
             * NEVER replace the visible patient list
             * with a loader.
             */}
            {loading &&
                patients.length === 0 && (
                    <Loader />
                )}

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

            {!error &&
                patients.length > 0 && (
                    <Section>
                        <SectionHeader>
                            <div>
                                <SectionTitle>
                                    Patient Records
                                </SectionTitle>

                                <SectionDescription>
                                    View and manage your patients
                                </SectionDescription>
                            </div>
                        </SectionHeader>

                        <PatientGrid>
                            {visiblePatients.map(
                                (patient) => (
                                    <PatientCard
                                        key={
                                            patient.id
                                        }
                                    >
                                        <PatientContent>
                                            <PatientTitle>
                                                Patient
                                            </PatientTitle>

                                            <PatientData>
                                                {
                                                    patient.encrypted_data
                                                }
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
                                )
                            )}
                        </PatientGrid>

                        <PaginationContainer>
                            <PaginationInfo>
                                Showing{" "}
                                {visibleStart}-
                                {visibleEnd}{" "}
                                of{" "}
                                {pagination.total}
                            </PaginationInfo>

                            <PaginationActions>
                                <PaginationButton
                                    type="button"
                                    onClick={
                                        handlePrevious
                                    }
                                    disabled={
                                        !hasPreviousPage ||
                                        loading
                                    }
                                >
                                    Previous
                                </PaginationButton>

                                <PaginationPage>
                                    Page{" "}
                                    {(
                                        (
                                            pagination.page -
                                            1
                                        ) *
                                        2
                                    ) +
                                        displayPage}
                                </PaginationPage>

                                <PaginationButton
                                    type="button"
                                    onClick={
                                        handleNext
                                    }
                                    disabled={
                                        !hasNextPage ||
                                        loading
                                    }
                                >
                                    Next
                                </PaginationButton>
                            </PaginationActions>
                        </PaginationContainer>

                        {/*
                         * Intentionally NO loader here.
                         *
                         * If prefetchLoading === true,
                         * the current patients stay exactly
                         * where they are.
                         *
                         * Next is simply disabled until
                         * the next 10 are ready.
                         */}
                    </Section>
                )}
        </PageContainer>
    );
}

export default PatientList;