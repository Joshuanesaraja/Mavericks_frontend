import {
    useEffect,
    useMemo,
    useState
} from "react";

import styled from "styled-components";

import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Loader from "../../components/common/Loader";
import Modal from "../../components/common/Modal";
import Table from "../../components/common/Table";

import StaffForm from "../../components/forms/StaffForm";

import useStaff from "../../modules/staff/hooks/useStaff";

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) =>
        theme.spacing.xl};
`;

const PageHeader = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    gap: ${({ theme }) =>
        theme.spacing.md};

    flex-wrap: wrap;
`;

const HeaderContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) =>
        theme.spacing.xs};
`;

const PageTitle = styled.h1`
    margin: 0;

    color: ${({ theme }) =>
        theme.colors.text};

    font-size: ${({ theme }) =>
        theme.typography.h1};
`;

const PageSubtitle = styled.p`
    margin: 0;

    color: ${({ theme }) =>
        theme.colors.textSecondary};
`;

const Card = styled.section`
    padding: ${({ theme }) =>
        theme.spacing.xl};

    background: ${({ theme }) =>
        theme.colors.surface};

    border: 1px solid
        ${({ theme }) =>
            theme.colors.border};

    border-radius: ${({ theme }) =>
        theme.radius.lg};

    box-shadow: ${({ theme }) =>
        theme.shadows.sm};
`;

const Toolbar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: ${({ theme }) =>
        theme.spacing.md};

    margin-bottom: ${({ theme }) =>
        theme.spacing.lg};

    flex-wrap: wrap;
`;

const SearchWrapper = styled.div`
    width: 100%;
    max-width: 360px;
`;

const Message = styled.div`
    padding: ${({ theme }) =>
        theme.spacing.lg};

    background: ${({ theme }) =>
        theme.colors.surface};

    border: 1px solid
        ${({ theme }) =>
            theme.colors.border};

    border-radius: ${({ theme }) =>
        theme.radius.md};

    color: ${({ theme }) =>
        theme.colors.textSecondary};

    text-align: center;
`;

const ErrorMessage = styled(Message)`
    border-color:
        ${({ theme }) =>
            theme.colors.danger};

    color:
        ${({ theme }) =>
            theme.colors.danger};
`;

const SuccessMessage = styled(Message)`
    border-color:
        ${({ theme }) =>
            theme.colors.success};

    color:
        ${({ theme }) =>
            theme.colors.success};
`;

const ActionGroup = styled.div`
    display: flex;
    align-items: center;

    gap: ${({ theme }) =>
        theme.spacing.xs};

    flex-wrap: wrap;
`;

const SmallButton = styled.button`
    min-height: 34px;
    padding: 7px 12px;

    border: 1px solid
        ${({ theme }) =>
            theme.colors.border};

    border-radius:
        ${({ theme }) =>
            theme.radius.sm};

    background:
        ${({ theme }) =>
            theme.colors.surface};

    color:
        ${({ theme }) =>
            theme.colors.text};

    font-size:
        ${({ theme }) =>
            theme.typography.small};

    font-weight: 600;

    cursor: pointer;

    transition:
        background 0.2s ease,
        border-color 0.2s ease;

    &:hover:not(:disabled) {
        background:
            ${({ theme }) =>
                theme.colors.surfaceHover};

        border-color:
            ${({ theme }) =>
                theme.colors.primary};
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

const DangerButton = styled(SmallButton)`
    color:
        ${({ theme }) =>
            theme.colors.danger};

    border-color:
        ${({ theme }) =>
            theme.colors.danger};
`;

const StatusBadge = styled.span`
    display: inline-flex;
    align-items: center;

    min-height: 26px;
    padding: 4px 10px;

    border-radius:
        ${({ theme }) =>
            theme.radius.pill};

    background: ${({ theme, $status }) =>
        $status === "active"
            ? "rgba(22, 163, 74, 0.12)"
            : "rgba(100, 116, 139, 0.12)"};

    color: ${({ theme, $status }) =>
        $status === "active"
            ? theme.colors.success
            : theme.colors.textSecondary};

    font-size:
        ${({ theme }) =>
            theme.typography.small};

    font-weight: 600;

    text-transform: capitalize;
`;

const TypeBadge = styled.span`
    display: inline-flex;
    align-items: center;

    min-height: 26px;
    padding: 4px 10px;

    border-radius:
        ${({ theme }) =>
            theme.radius.pill};

    background:
        ${({ theme }) =>
            theme.colors.surfaceHover};

    color:
        ${({ theme }) =>
            theme.colors.text};

    font-size:
        ${({ theme }) =>
            theme.typography.small};

    font-weight: 600;

    text-transform: capitalize;
`;

const DetailsGrid = styled.div`
    display: grid;

    grid-template-columns:
        repeat(2, minmax(0, 1fr));

    gap: ${({ theme }) =>
        theme.spacing.md};

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;

const DetailItem = styled.div`
    padding: ${({ theme }) =>
        theme.spacing.md};

    background:
        ${({ theme }) =>
            theme.colors.surfaceHover};

    border-radius:
        ${({ theme }) =>
            theme.radius.md};
`;

const DetailLabel = styled.div`
    margin-bottom:
        ${({ theme }) =>
            theme.spacing.xs};

    color:
        ${({ theme }) =>
            theme.colors.textSecondary};

    font-size:
        ${({ theme }) =>
            theme.typography.small};
`;

const DetailValue = styled.div`
    color:
        ${({ theme }) =>
            theme.colors.text};

    font-weight: 600;

    word-break: break-word;
`;

const RoleList = styled.div`
    display: flex;
    flex-wrap: wrap;

    gap: ${({ theme }) =>
        theme.spacing.xs};
`;

const EmptyState = styled(Message)`
    padding: ${({ theme }) =>
        theme.spacing.xxl};
`;

const ConfirmContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.lg};
`;

const ConfirmText = styled.p`
    margin: 0;

    color: ${({ theme }) =>
        theme.colors.textSecondary};

    line-height: 1.6;
`;

const ConfirmActions = styled.div`
    display: flex;
    justify-content: flex-end;

    gap: ${({ theme }) =>
        theme.spacing.sm};
`;

const CancelButton = styled.button`
    min-height: 40px;
    padding: 10px 18px;

    border: 1px solid
        ${({ theme }) =>
            theme.colors.border};

    border-radius:
        ${({ theme }) =>
            theme.radius.md};

    background:
        ${({ theme }) =>
            theme.colors.surface};

    color:
        ${({ theme }) =>
            theme.colors.text};

    font-weight: 600;

    cursor: pointer;

    &:hover:not(:disabled) {
        background:
            ${({ theme }) =>
                theme.colors.surfaceHover};
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

const ConfirmDeleteButton = styled.button`
    min-height: 40px;
    padding: 10px 18px;

    border: none;

    border-radius:
        ${({ theme }) =>
            theme.radius.md};

    background:
        ${({ theme }) =>
            theme.colors.danger};

    color: white;

    font-weight: 600;

    cursor: pointer;

    &:hover:not(:disabled) {
        opacity: 0.9;
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

function formatLabel(value) {
    if (!value) {
        return "—";
    }

    return String(value)
        .charAt(0)
        .toUpperCase() +
        String(value)
            .slice(1)
            .toLowerCase();
}

function StaffManagement() {
    const {
        staff,
        selectedStaff,
        loading,
        saving,
        deleting,
        error,
        successMessage,

        getStaff,
        getStaffMember,
        createStaff,
        updateStaff,
        updateStaffStatus,
        deleteStaff,

        clearError,
        clearSuccess,
        clearSelected
    } = useStaff();

    const [search, setSearch] =
        useState("");

    const [isAddOpen, setIsAddOpen] =
        useState(false);

    const [isEditOpen, setIsEditOpen] =
        useState(false);

    const [isDetailsOpen, setIsDetailsOpen] =
        useState(false);

    const [editingStaff, setEditingStaff] =
        useState(null);

    const [staffToDelete, setStaffToDelete] =
        useState(null);

    const [isDeleteOpen, setIsDeleteOpen] =
        useState(false);

    useEffect(() => {
        getStaff();
    }, [getStaff]);

    useEffect(() => {
        if (!successMessage) {
            return undefined;
        }

        const timer =
            setTimeout(() => {
                clearSuccess();
            }, 3500);

        return () => {
            clearTimeout(timer);
        };
    }, [
        successMessage,
        clearSuccess
    ]);

    useEffect(() => {
        if (
            isDeleteOpen &&
            successMessage ===
                "Staff deleted successfully"
        ) {
            setIsDeleteOpen(false);
            setStaffToDelete(null);
        }
    }, [
        isDeleteOpen,
        successMessage
    ]);

    const filteredStaff =
        useMemo(() => {
            const term =
                search
                    .trim()
                    .toLowerCase();

            if (!term) {
                return staff;
            }

            return staff.filter(
                (member) => {
                    const name =
                        member.name
                            ?.toLowerCase() ||
                        "";

                    const email =
                        member.email
                            ?.toLowerCase() ||
                        "";

                    const type =
                        member.staff_type
                            ?.toLowerCase() ||
                        "";

                    const roles =
                        Array.isArray(
                            member.roles
                        )
                            ? member.roles
                                  .join(" ")
                                  .toLowerCase()
                            : "";

                    return (
                        name.includes(term) ||
                        email.includes(term) ||
                        type.includes(term) ||
                        roles.includes(term)
                    );
                }
            );
        }, [staff, search]);

    const handleAdd = (payload) => {
        createStaff(payload);
    };

    useEffect(() => {
        if (
            isAddOpen &&
            successMessage ===
                "Staff created successfully"
        ) {
            setIsAddOpen(false);
        }
    }, [
        isAddOpen,
        successMessage
    ]);

    const handleEditSubmit = (
        payload
    ) => {
        if (!editingStaff) {
            return;
        }

        updateStaff(
            editingStaff.id,
            payload
        );
    };

    useEffect(() => {
        if (
            isEditOpen &&
            successMessage ===
                "Staff updated successfully"
        ) {
            setIsEditOpen(false);
            setEditingStaff(null);
        }
    }, [
        isEditOpen,
        successMessage
    ]);

    const handleView = (member) => {
        clearError();
        getStaffMember(member.id);
        setIsDetailsOpen(true);
    };

    const handleEdit = (member) => {
        clearError();

        setEditingStaff(member);
        setIsEditOpen(true);
    };

    const handleToggleStatus = (
        member
    ) => {
        const nextStatus =
            member.status === "active"
                ? "inactive"
                : "active";

        updateStaffStatus(
            member.id,
            nextStatus
        );
    };

    const handleDelete = (member) => {
        clearError();

        setStaffToDelete(member);
        setIsDeleteOpen(true);
    };

    const handleConfirmDelete = () => {
        if (!staffToDelete) {
            return;
        }

        deleteStaff(staffToDelete.id);
    };

    const closeDetails = () => {
        setIsDetailsOpen(false);
        clearSelected();
    };

    const closeAdd = () => {
        if (saving) {
            return;
        }

        setIsAddOpen(false);
        clearError();
    };

    const closeEdit = () => {
        if (saving) {
            return;
        }

        setIsEditOpen(false);
        setEditingStaff(null);
        clearError();
    };

    const columns = [
        {
            key: "name",
            label: "Staff"
        },
        {
            key: "email",
            label: "Email"
        },
        {
            key: "staff_type",
            label: "Type"
        },
        {
            key: "roles",
            label: "RBAC Role"
        },
        {
            key: "status",
            label: "Status"
        },
        {
            key: "actions",
            label: "Actions"
        }
    ];

    return (
        <PageContainer>
            <PageHeader>
                <HeaderContent>
                    <PageTitle>
                        Staff Management
                    </PageTitle>

                    <PageSubtitle>
                        Manage staff members,
                        staff types, status,
                        and account details.
                    </PageSubtitle>
                </HeaderContent>

                <Button
                    type="button"
                    onClick={() => {
                        clearError();
                        setIsAddOpen(true);
                    }}
                >
                    + Add staff
                </Button>
            </PageHeader>

            {error && (
                <ErrorMessage>
                    {error}

                    <SmallButton
                        type="button"
                        onClick={clearError}
                        style={{
                            marginLeft: "12px"
                        }}
                    >
                        Dismiss
                    </SmallButton>
                </ErrorMessage>
            )}

            {successMessage && (
                <SuccessMessage>
                    {successMessage}
                </SuccessMessage>
            )}

            <Card>
                <Toolbar>
                    <SearchWrapper>
                        <Input
                            type="search"
                            value={search}
                            onChange={(event) =>
                                setSearch(
                                    event.target
                                        .value
                                )
                            }
                            placeholder="Search staff by name, email, type..."
                        />
                    </SearchWrapper>

                    <SmallButton
                        type="button"
                        onClick={getStaff}
                        disabled={loading}
                    >
                        {loading
                            ? "Refreshing..."
                            : "Refresh"}
                    </SmallButton>
                </Toolbar>

                {loading &&
                    staff.length === 0 && (
                        <Loader />
                    )}

                {!loading &&
                    !error &&
                    staff.length === 0 && (
                        <EmptyState>
                            No staff members
                            found. Add your
                            first staff member.
                        </EmptyState>
                    )}

                {!loading &&
                    staff.length > 0 &&
                    filteredStaff.length ===
                        0 && (
                        <EmptyState>
                            No staff members
                            match your search.
                        </EmptyState>
                    )}

                {filteredStaff.length > 0 && (
                    <Table
                        columns={columns}
                        data={filteredStaff}
                        renderRow={(
                            member,
                            TableCell
                        ) => (
                            <>
                                <TableCell>
                                    <strong>
                                        {member.name}
                                    </strong>
                                </TableCell>

                                <TableCell>
                                    {member.email}
                                </TableCell>

                                <TableCell>
                                    <TypeBadge>
                                        {formatLabel(
                                            member.staff_type
                                        )}
                                    </TypeBadge>
                                </TableCell>

                                <TableCell>
                                    <RoleList>
                                        {Array.isArray(
                                            member.roles
                                        ) &&
                                        member.roles
                                            .length >
                                            0 ? (
                                            member.roles.map(
                                                (
                                                    role
                                                ) => (
                                                    <TypeBadge
                                                        key={
                                                            role
                                                        }
                                                    >
                                                        {
                                                            role
                                                        }
                                                    </TypeBadge>
                                                )
                                            )
                                        ) : (
                                            <span>
                                                —
                                            </span>
                                        )}
                                    </RoleList>
                                </TableCell>

                                <TableCell>
                                    <StatusBadge
                                        $status={
                                            member.status
                                        }
                                    >
                                        {
                                            member.status
                                        }
                                    </StatusBadge>
                                </TableCell>

                                <TableCell>
                                    <ActionGroup>
                                        <SmallButton
                                            type="button"
                                            onClick={() =>
                                                handleView(
                                                    member
                                                )
                                            }
                                        >
                                            View
                                        </SmallButton>

                                        <SmallButton
                                            type="button"
                                            onClick={() =>
                                                handleEdit(
                                                    member
                                                )
                                            }
                                        >
                                            Edit
                                        </SmallButton>

                                        <SmallButton
                                            type="button"
                                            disabled={
                                                saving
                                            }
                                            onClick={() =>
                                                handleToggleStatus(
                                                    member
                                                )
                                            }
                                        >
                                            {member.status ===
                                            "active"
                                                ? "Deactivate"
                                                : "Activate"}
                                        </SmallButton>

                                        <DangerButton
                                            type="button"
                                            disabled={
                                                deleting
                                            }
                                            onClick={() =>
                                                handleDelete(
                                                    member
                                                )
                                            }
                                        >
                                            Delete
                                        </DangerButton>
                                    </ActionGroup>
                                </TableCell>
                            </>
                        )}
                    />
                )}
            </Card>

            <Modal
                isOpen={isAddOpen}
                onClose={closeAdd}
                title="Add staff member"
            >
                <StaffForm
                    editing={false}
                    saving={saving}
                    onSubmit={
                        handleAdd
                    }
                    onCancel={
                        closeAdd
                    }
                />
            </Modal>

            <Modal
                isOpen={isEditOpen}
                onClose={closeEdit}
                title="Edit staff member"
            >
                <StaffForm
                    initialValues={
                        editingStaff
                    }
                    editing
                    saving={saving}
                    onSubmit={
                        handleEditSubmit
                    }
                    onCancel={
                        closeEdit
                    }
                />
            </Modal>
            
            <Modal
                isOpen={isDeleteOpen}
                onClose={() => {
                    if (deleting) {
                        return;
                    }

                    setIsDeleteOpen(false);
                    setStaffToDelete(null);
                }}
                title="Delete staff member"
            >
                <ConfirmContent>
                    <ConfirmText>
                        Are you sure you want to delete{" "}
                        <strong>
                            {staffToDelete?.name}
                        </strong>
                        ?
                        <br />
                        <br />
                        This will remove the staff member
                        from the active staff list.
                    </ConfirmText>

                    <ConfirmActions>
                        <CancelButton
                            type="button"
                            disabled={deleting}
                            onClick={() => {
                                setIsDeleteOpen(false);
                                setStaffToDelete(null);
                            }}
                        >
                            Cancel
                        </CancelButton>

                        <ConfirmDeleteButton
                            type="button"
                            disabled={deleting}
                            onClick={
                                handleConfirmDelete
                            }
                        >
                            {deleting
                                ? "Deleting..."
                                : "Delete"}
                        </ConfirmDeleteButton>
                    </ConfirmActions>
                </ConfirmContent>
            </Modal>
            
            <Modal
                isOpen={isDetailsOpen}
                onClose={
                    closeDetails
                }
                title="Staff details"
            >
                {loading &&
                    !selectedStaff ? (
                    <Loader />
                ) : selectedStaff ? (
                    <DetailsGrid>
                        <DetailItem>
                            <DetailLabel>
                                Staff ID
                            </DetailLabel>

                            <DetailValue>
                                {
                                    selectedStaff.id
                                }
                            </DetailValue>
                        </DetailItem>

                        <DetailItem>
                            <DetailLabel>
                                User ID
                            </DetailLabel>

                            <DetailValue>
                                {
                                    selectedStaff.user_id
                                }
                            </DetailValue>
                        </DetailItem>

                        <DetailItem>
                            <DetailLabel>
                                Name
                            </DetailLabel>

                            <DetailValue>
                                {
                                    selectedStaff.name
                                }
                            </DetailValue>
                        </DetailItem>

                        <DetailItem>
                            <DetailLabel>
                                Email
                            </DetailLabel>

                            <DetailValue>
                                {
                                    selectedStaff.email
                                }
                            </DetailValue>
                        </DetailItem>

                        <DetailItem>
                            <DetailLabel>
                                Staff type
                            </DetailLabel>

                            <DetailValue>
                                <TypeBadge>
                                    {formatLabel(
                                        selectedStaff.staff_type
                                    )}
                                </TypeBadge>
                            </DetailValue>
                        </DetailItem>

                        <DetailItem>
                            <DetailLabel>
                                Status
                            </DetailLabel>

                            <DetailValue>
                                <StatusBadge
                                    $status={
                                        selectedStaff.status
                                    }
                                >
                                    {
                                        selectedStaff.status
                                    }
                                </StatusBadge>
                            </DetailValue>
                        </DetailItem>

                        <DetailItem>
                            <DetailLabel>
                                RBAC roles
                            </DetailLabel>

                            <DetailValue>
                                <RoleList>
                                    {Array.isArray(
                                        selectedStaff.roles
                                    ) &&
                                    selectedStaff
                                        .roles
                                        .length >
                                        0 ? (
                                        selectedStaff.roles.map(
                                            (
                                                role
                                            ) => (
                                                <TypeBadge
                                                    key={
                                                        role
                                                    }
                                                >
                                                    {
                                                        role
                                                    }
                                                </TypeBadge>
                                            )
                                        )
                                    ) : (
                                        "—"
                                    )}
                                </RoleList>
                            </DetailValue>
                        </DetailItem>

                        <DetailItem>
                            <DetailLabel>
                                Created
                            </DetailLabel>

                            <DetailValue>
                                {selectedStaff.created_at ||
                                    "—"}
                            </DetailValue>
                        </DetailItem>

                        <DetailItem>
                            <DetailLabel>
                                Updated
                            </DetailLabel>

                            <DetailValue>
                                {selectedStaff.updated_at ||
                                    "—"}
                            </DetailValue>
                        </DetailItem>
                    </DetailsGrid>
                ) : (
                    <Message>
                        Staff details could
                        not be loaded.
                    </Message>
                )}
            </Modal>
        </PageContainer>
    );
}

export default StaffManagement;