import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useAuth } from "../../modules/auth/hooks/useAuth";
import { getRoleLandingPath } from "../../routes/RoleBasedRoute";

import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

const PageContainer = styled.div`
    min-height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: ${({ theme }) => theme.spacing.lg};

    background: ${({ theme }) => theme.colors.background};
`;

const LoginCard = styled.div`
    width: 100%;
    max-width: 440px;

    padding: ${({ theme }) => theme.spacing.xxl};

    background: ${({ theme }) => theme.colors.surface};

    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.lg};

    box-shadow: ${({ theme }) => theme.shadows.lg};
`;

const Brand = styled.div`
    margin-bottom: ${({ theme }) => theme.spacing.xl};

    text-align: center;
`;

const BrandTitle = styled.h1`
    margin-bottom: ${({ theme }) => theme.spacing.xs};

    color: ${({ theme }) => theme.colors.primary};

    font-size: 30px;
`;

const BrandSubtitle = styled.p`
    margin: 0;

    color: ${({ theme }) => theme.colors.textSecondary};
`;

const LoginTitle = styled.h2`
    margin-bottom: ${({ theme }) => theme.spacing.lg};

    color: ${({ theme }) => theme.colors.text};
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
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

const ErrorMessage = styled.div`
    padding: ${({ theme }) => theme.spacing.sm}
        ${({ theme }) => theme.spacing.md};

    border-radius: ${({ theme }) => theme.radius.sm};

    background: rgba(220, 38, 38, 0.08);
    color: ${({ theme }) => theme.colors.danger};

    font-size: ${({ theme }) => theme.typography.small};
`;

const LoginButton = styled(Button)`
    width: 100%;
    margin-top: ${({ theme }) => theme.spacing.sm};
`;

function LoginPage() {
    const navigate = useNavigate();

    const {
        login,
        loadProfile,
        loading,
        error,
        clearError,
        isAuthenticated,
        user
    } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (isAuthenticated) {
            navigate(getRoleLandingPath(user?.roles || []), {
                replace: true
            });

            return;
        }

        loadProfile();
    }, [isAuthenticated, user, loadProfile, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        clearError();

        login({
            email,
            password
        });
    };

    return (
        <PageContainer>
            <LoginCard>
                <Brand>
                    <BrandTitle>Healthcare MVP</BrandTitle>

                    <BrandSubtitle>
                        Team Mavericks
                    </BrandSubtitle>
                </Brand>

                <LoginTitle>Sign in to your account</LoginTitle>

                {error && (
                    <ErrorMessage>
                        {error}
                    </ErrorMessage>
                )}

                <Form onSubmit={handleSubmit}>
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
                            placeholder="Enter your email"
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
                            placeholder="Enter your password"
                            required
                        />
                    </Field>

                    <LoginButton
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </LoginButton>
                </Form>
            </LoginCard>
        </PageContainer>
    );
}

export default LoginPage;