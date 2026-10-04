import { useEffect, useState } from "react";
import styled from "styled-components";


import { useUsers } from "../../modules/users/hooks/useUsers";

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

const Section = styled.section`
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

const SubSectionTitle = styled.h3`
    margin-bottom: ${({ theme }) => theme.spacing.md};

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


const Label = styled.label`
    color: ${({ theme }) => theme.colors.text};

    font-size: ${({ theme }) => theme.typography.body};
    font-weight: 600;
`;

const StyledSelect = styled.select`
    width: 100%;
    min-height: 40px;

    padding: 10px 12px;

    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.md};

    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};

    font-size: ${({ theme }) => theme.typography.body};

    &:focus {
        border-color: ${({ theme }) => theme.colors.primary};

        box-shadow: 0 0 0 3px
            rgba(15, 118, 110, 0.12);

        outline: none;
    }
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

const UserGrid = styled.div`
    display: grid;

    grid-template-columns: repeat(
        auto-fill,
        minmax(280px, 1fr)
    );

    gap: ${({ theme }) => theme.spacing.lg};
`;

const UserCard = styled.article`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};

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

const UserHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: ${({ theme }) => theme.spacing.md};
`;

const UserName = styled.h3`
    margin: 0;

    color: ${({ theme }) => theme.colors.primary};
`;

const UserId = styled.span`
    color: ${({ theme }) => theme.colors.textSecondary};

    font-size: ${({ theme }) => theme.typography.small};
`;

const UserDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.sm};
`;

const DetailRow = styled.div`
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

const BadgeRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing.xs};
`;

const RoleBadge = styled.span`
    display: inline-flex;
    align-items: center;

    width: fit-content;

    padding: 5px 10px;

    border-radius: ${({ theme }) => theme.radius.pill};

    background: ${({ theme }) => theme.colors.primary};
    color: #ffffff;

    font-size: ${({ theme }) => theme.typography.small};
    font-weight: 600;
`;

const StatusBadge = styled.span`
    display: inline-flex;
    align-items: center;

    width: fit-content;

    padding: 5px 10px;

    border-radius: ${({ theme }) => theme.radius.pill};

    background: ${({ theme, $status }) =>
        $status === "active"
            ? theme.colors.success
            : theme.colors.danger};

    color: #ffffff;

    font-size: ${({ theme }) => theme.typography.small};
    font-weight: 600;
`;

const UserActions = styled.div`
    display: flex;
    flex-wrap: wrap;

    gap: ${({ theme }) => theme.spacing.sm};

    padding-top: ${({ theme }) => theme.spacing.sm};

    border-top: 1px solid
        ${({ theme }) => theme.colors.border};
`;

const DetailsSection = styled.section`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xl};

    padding: ${({ theme }) => theme.spacing.xl};

    background: ${({ theme }) => theme.colors.surface};

    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.lg};

    box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const SelectedUserHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: ${({ theme }) => theme.spacing.md};
`;

const SelectedUserInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xs};
`;

const ActionSection = styled.div`
    padding-top: ${({ theme }) => theme.spacing.lg};

    border-top: 1px solid
        ${({ theme }) => theme.colors.border};
`;

function UserManagement() {


    const {
        users,
        selectedUser,
        loading,
        error,
        loadUsers,
        loadUser,
        addUser,
        editUser,
        assignRole,
        updateStatus
    } = useUsers();

    const [selectedUserId, setSelectedUserId] =
        useState(null);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Provider");

    const [editName, setEditName] = useState("");
    const [editEmail, setEditEmail] = useState("");

    const [selectedRole, setSelectedRole] =
        useState("Provider");

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    useEffect(() => {
        if (selectedUser) {
            setEditName(selectedUser.name || "");
            setEditEmail(selectedUser.email || "");
        }
    }, [selectedUser]);

    const handleCreateUser = (e) => {
        e.preventDefault();

        addUser({
            name,
            email,
            password,
            role
        });
    };

    const handleEditUser = (e) => {
        e.preventDefault();

        editUser(selectedUser.id, {
            name: editName,
            email: editEmail
        });
    };

    const handleAssignRole = (e) => {
        e.preventDefault();

        assignRole(selectedUser.id, {
            role: selectedRole
        });
    };

    const handleUpdateStatus = (e) => {
        e.preventDefault();

        updateStatus(selectedUser.id, {
            status:
                selectedUser.status === "active"
                    ? "inactive"
                    : "active"
        });
    };

    return (
        <PageContainer>
            <PageHeader>
                <PageTitle>
                    User Management
                </PageTitle>

                <PageSubtitle>
                    User and Role Management
                </PageSubtitle>
            </PageHeader>

            <Section>
                <SectionTitle>
                    Create User
                </SectionTitle>

                <Form onSubmit={handleCreateUser}>
                    <Field>
                        <Label htmlFor="name">
                            Name
                        </Label>

                        <Input
                            id="name"
                            name="name"
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            placeholder="Enter user name"
                            required
                        />
                    </Field>

                    <Field>
                        <Label htmlFor="email">
                            Email
                        </Label>

                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="Enter email"
                            required
                        />
                    </Field>

                    <Field>
                        <Label htmlFor="password">
                            Password
                        </Label>

                        <Input
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="Enter password"
                            required
                        />
                    </Field>

                    <Field>
                        <Label htmlFor="role">
                            Role
                        </Label>

                        <StyledSelect
                            id="role"
                            value={role}
                            onChange={(e) =>
                                setRole(e.target.value)
                            }
                        >
                            <option value="Admin">
                                Admin
                            </option>

                            <option value="Provider">
                                Provider
                            </option>

                            <option value="Nurse">
                                Nurse
                            </option>

                            <option value="Patient">
                                Patient
                            </option>

                            <option value="Pharmacist">
                                Pharmacist
                            </option>
                        </StyledSelect>
                    </Field>

                    <FormActions>
                        <Button
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Creating..."
                                : "Create User"}
                        </Button>
                    </FormActions>
                </Form>
            </Section>

            {loading && <Loader />}

            {error && (
                <ErrorMessage>
                    {error}
                </ErrorMessage>
            )}

            {!loading &&
                !error &&
                users.length === 0 && (
                    <Message>
                        No users found.
                    </Message>
                )}

            {!loading &&
                !error &&
                users.length > 0 && (
                    <Section>
                        <SectionTitle>
                            Users
                        </SectionTitle>

                        <UserGrid>
                            {users.map((user) => (
                                <UserCard key={user.id}>
                                    <UserHeader>
                                        <UserName>
                                            {user.name}
                                        </UserName>

                                        <UserId>
                                            ID: {user.id}
                                        </UserId>
                                    </UserHeader>

                                    <UserDetails>
                                        <DetailRow>
                                            <DetailLabel>
                                                Email
                                            </DetailLabel>

                                            <DetailValue>
                                                {user.email}
                                            </DetailValue>
                                        </DetailRow>

                                        <DetailRow>
                                            <DetailLabel>
                                                Role
                                            </DetailLabel>

                                            <BadgeRow>
                                                {user.roles?.map(
                                                    (userRole) => (
                                                        <RoleBadge
                                                            key={
                                                                userRole
                                                            }
                                                        >
                                                            {
                                                                userRole
                                                            }
                                                        </RoleBadge>
                                                    )
                                                )}
                                            </BadgeRow>
                                        </DetailRow>

                                        <DetailRow>
                                            <DetailLabel>
                                                Status
                                            </DetailLabel>

                                            <StatusBadge $status={user.status}>
                                                {user.status}
                                            </StatusBadge>
                                        </DetailRow>
                                    </UserDetails>

                                    <UserActions>
                                        <Button
                                            type="button"
                                            onClick={() => {
                                                setSelectedUserId(
                                                    user.id
                                                );

                                                loadUser(
                                                    user.id
                                                );
                                            }}
                                            disabled={loading}
                                        >
                                            View Details
                                        </Button>
                                    </UserActions>
                                </UserCard>
                            ))}
                        </UserGrid>
                    </Section>
                )}

            {selectedUserId &&
                selectedUser && (
                    <DetailsSection>
                        <SelectedUserHeader>
                            <SelectedUserInfo>
                                <SectionTitle>
                                    User Details
                                </SectionTitle>

                                <PageSubtitle>
                                    Manage the selected
                                    user's information,
                                    role, and status.
                                </PageSubtitle>
                            </SelectedUserInfo>
                        </SelectedUserHeader>

                        <UserDetails>
                            <DetailRow>
                                <DetailLabel>
                                    User ID
                                </DetailLabel>

                                <DetailValue>
                                    {selectedUser.id}
                                </DetailValue>
                            </DetailRow>

                            <DetailRow>
                                <DetailLabel>
                                    Name
                                </DetailLabel>

                                <DetailValue>
                                    {selectedUser.name}
                                </DetailValue>
                            </DetailRow>

                            <DetailRow>
                                <DetailLabel>
                                    Email
                                </DetailLabel>

                                <DetailValue>
                                    {selectedUser.email}
                                </DetailValue>
                            </DetailRow>

                            <DetailRow>
                                <DetailLabel>
                                    Role
                                </DetailLabel>

                                <BadgeRow>
                                    {selectedUser.roles?.map(
                                        (userRole) => (
                                            <RoleBadge
                                                key={userRole}
                                            >
                                                {userRole}
                                            </RoleBadge>
                                        )
                                    )}
                                </BadgeRow>
                            </DetailRow>

                            <DetailRow>
                                <DetailLabel>
                                    Status
                                </DetailLabel>

                                <StatusBadge $status={selectedUser.status}>
                                    {selectedUser.status}
                                </StatusBadge>
                            </DetailRow>
                        </UserDetails>

                        <ActionSection>
                            <SubSectionTitle>
                                Edit User
                            </SubSectionTitle>

                            <Form
                                onSubmit={handleEditUser}
                            >
                                <Field>
                                    <Label htmlFor="editName">
                                        Name
                                    </Label>

                                    <Input
                                        id="editName"
                                        name="editName"
                                        type="text"
                                        value={editName}
                                        onChange={(e) =>
                                            setEditName(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </Field>

                                <Field>
                                    <Label htmlFor="editEmail">
                                        Email
                                    </Label>

                                    <Input
                                        id="editEmail"
                                        name="editEmail"
                                        type="email"
                                        value={editEmail}
                                        onChange={(e) =>
                                            setEditEmail(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </Field>

                                <FormActions>
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading
                                            ? "Updating..."
                                            : "Update User"}
                                    </Button>
                                </FormActions>
                            </Form>
                        </ActionSection>

                        <ActionSection>
                            <SubSectionTitle>
                                Assign Role
                            </SubSectionTitle>

                            <Form
                                onSubmit={
                                    handleAssignRole
                                }
                            >
                                <Field>
                                    <Label htmlFor="selectedRole">
                                        Role
                                    </Label>

                                    <StyledSelect
                                        id="selectedRole"
                                        value={selectedRole}
                                        onChange={(e) =>
                                            setSelectedRole(
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="Admin">
                                            Admin
                                        </option>

                                        <option value="Provider">
                                            Provider
                                        </option>

                                        <option value="Nurse">
                                            Nurse
                                        </option>

                                        <option value="Patient">
                                            Patient
                                        </option>

                                        <option value="Pharmacist">
                                            Pharmacist
                                        </option>
                                    </StyledSelect>
                                </Field>

                                <FormActions>
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading
                                            ? "Updating..."
                                            : "Assign Role"}
                                    </Button>
                                </FormActions>
                            </Form>
                        </ActionSection>

                        <ActionSection>
                            <SubSectionTitle>
                                Update Status
                            </SubSectionTitle>

                            <Form
                                onSubmit={
                                    handleUpdateStatus
                                }
                            >
                                <FormActions>
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading
                                            ? "Updating..."
                                            : selectedUser.status ===
                                                "active"
                                                ? "Deactivate User"
                                                : "Activate User"}
                                    </Button>
                                </FormActions>
                            </Form>
                        </ActionSection>
                    </DetailsSection>
                )}
        </PageContainer>
    );
}

export default UserManagement;