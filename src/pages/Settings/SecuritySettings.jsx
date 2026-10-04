import { useState } from "react";
import styled from "styled-components";

import { useAuth } from "../../modules/auth/hooks/useAuth";

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

const SecurityCard = styled.section`
    max-width: 760px;

    padding: ${({ theme }) => theme.spacing.xl};

    background: ${({ theme }) => theme.colors.surface};

    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.lg};

    box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const SectionTitle = styled.h2`
    margin-bottom: ${({ theme }) => theme.spacing.xs};

    color: ${({ theme }) => theme.colors.text};
`;

const SectionDescription = styled.p`
    margin-bottom: ${({ theme }) => theme.spacing.xl};

    color: ${({ theme }) => theme.colors.textSecondary};
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;

    gap: ${({ theme }) => theme.spacing.lg};
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

const FormActions = styled.div`
    display: flex;
    justify-content: flex-end;

    padding-top: ${({ theme }) => theme.spacing.sm};
`;

const ErrorMessage = styled.div`
    margin-bottom: ${({ theme }) => theme.spacing.lg};

    padding: ${({ theme }) => theme.spacing.md};

    border: 1px solid ${({ theme }) => theme.colors.danger};
    border-radius: ${({ theme }) => theme.radius.md};

    background: rgba(220, 38, 38, 0.08);
    color: ${({ theme }) => theme.colors.danger};
`;

const SecurityInfo = styled.div`
    margin-top: ${({ theme }) => theme.spacing.xl};

    padding: ${({ theme }) => theme.spacing.lg};

    border-left: 4px solid
        ${({ theme }) => theme.colors.primary};

    border-radius: ${({ theme }) => theme.radius.md};

    background: ${({ theme }) => theme.colors.surfaceHover};
`;

const SecurityInfoTitle = styled.h3`
    margin-bottom: ${({ theme }) => theme.spacing.xs};

    color: ${({ theme }) => theme.colors.text};
`;

const SecurityInfoText = styled.p`
    margin: 0;

    color: ${({ theme }) => theme.colors.textSecondary};

    line-height: 1.6;
`;

function SecuritySettings() {
    const {
        changePassword,
        loading,
        error,
        clearError
    } = useAuth();

    const [currentPassword, setCurrentPassword] =
        useState("");

    const [newPassword, setNewPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            return;
        }

        changePassword({
            current_password: currentPassword,
            new_password: newPassword
        });
    };

    return (
        <PageContainer>
            <PageHeader>
                <PageTitle>
                    Security Settings
                </PageTitle>

                <PageSubtitle>
                    Manage your account security
                    settings
                </PageSubtitle>
            </PageHeader>

            <SecurityCard>
                <SectionTitle>
                    Change Password
                </SectionTitle>

                <SectionDescription>
                    Update your account password using
                    your current password.
                </SectionDescription>

                {error && (
                    <ErrorMessage>
                        <p>{error}</p>

                        <Button
                            type="button"
                            onClick={clearError}
                        >
                            Clear Error
                        </Button>
                    </ErrorMessage>
                )}

                <Form onSubmit={handleSubmit}>
                    <Field>
                        <Label htmlFor="currentPassword">
                            Current Password
                        </Label>

                        <Input
                            id="currentPassword"
                            name="currentPassword"
                            type="password"
                            value={currentPassword}
                            onChange={(e) =>
                                setCurrentPassword(
                                    e.target.value
                                )
                            }
                            placeholder="Enter current password"
                            required
                        />
                    </Field>

                    <Field>
                        <Label htmlFor="newPassword">
                            New Password
                        </Label>

                        <Input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            value={newPassword}
                            onChange={(e) =>
                                setNewPassword(
                                    e.target.value
                                )
                            }
                            placeholder="Enter new password"
                            required
                        />
                    </Field>

                    <Field>
                        <Label htmlFor="confirmPassword">
                            Confirm New Password
                        </Label>

                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(
                                    e.target.value
                                )
                            }
                            placeholder="Confirm new password"
                            required
                        />
                    </Field>

                    {newPassword !==
                        confirmPassword &&
                        confirmPassword && (
                            <ErrorMessage>
                                Passwords do not match.
                            </ErrorMessage>
                        )}

                    <FormActions>
                        <Button
                            type="submit"
                            disabled={
                                loading ||
                                newPassword !==
                                confirmPassword
                            }
                        >
                            {loading
                                ? "Changing..."
                                : "Change Password"}
                        </Button>
                    </FormActions>
                </Form>

                <SecurityInfo>
                    <SecurityInfoTitle>
                        Account Security
                    </SecurityInfoTitle>

                    <SecurityInfoText>
                        Use a strong password and avoid
                        reusing your password across
                        different accounts.
                    </SecurityInfoText>
                </SecurityInfo>
            </SecurityCard>

            {loading && <Loader />}
        </PageContainer>
    );
}

export default SecuritySettings;