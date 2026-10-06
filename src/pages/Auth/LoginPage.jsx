import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useAuth } from "../../modules/auth/hooks/useAuth";
import { getRoleLandingPath } from "../../routes/RoleBasedRoute";

import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

const PageContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 120px;

    min-height: 100vh;

    padding: ${({ theme }) => theme.spacing.xxl};

    background: ${({ theme }) => theme.colors.background};

    @media (max-width: 900px) {
        flex-direction: column;
        justify-content: center;

        gap: ${({ theme }) => theme.spacing.xxl};
    }
`;

const MarketingPanel = styled.div`
    width: 48%;

    display: flex;
    flex-direction: column;

    padding: ${({ theme }) => theme.spacing.xl};

    @media (max-width: 900px) {
        width: 100%;
        max-width: 600px;
    }
`;

const MarketingBrand = styled.div`
    margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const MarketingBrandTitle = styled.h1`
    margin: 0;

    color: ${({ theme }) => theme.colors.secondary};

    font-size: 28px;
    font-weight: 700;
`;

const MarketingBrandSubtitle = styled.p`
    margin: ${({ theme }) => theme.spacing.xs} 0 0;

    color: ${({ theme }) => theme.colors.textSecondary};

    font-size: ${({ theme }) => theme.typography.body};
`;

const MarketingContent = styled.div`
    max-width: 600px;
`;

const MarketingTitle = styled.h2`
    margin: 0;

    color: ${({ theme }) => theme.colors.text};

    font-size: 48px;
    line-height: 1.15;
    font-weight: 700;
`;

const MarketingHighlight = styled.span`
    color: ${({ theme }) => theme.colors.secondary};
`;

const MarketingDescription = styled.p`
    margin: ${({ theme }) => theme.spacing.lg} 0 0;

    color: ${({ theme }) => theme.colors.textSecondary};

    font-size: 16px;
    line-height: 1.7;
`;

const LoginCard = styled.div`
    width: 100%;
    max-width: 480px;

    padding: ${({ theme }) => theme.spacing.xxl};

    background: ${({ theme }) => theme.colors.surface};

    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.lg};

    box-shadow: ${({ theme }) => theme.shadows.lg};
`;

const LoginTitle = styled.h2`
    margin: 0;

    color: ${({ theme }) => theme.colors.text};

    text-align: center;
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

const RegisterLink = styled.button`
    width: 100%;

    margin-top: ${({ theme }) => theme.spacing.md};

    border: none;
    background: transparent;

    color: ${({ theme }) => theme.colors.primary};

    font-size: ${({ theme }) => theme.typography.body};
    font-weight: 600;

    cursor: pointer;

    &:hover {
        color: ${({ theme }) => theme.colors.primaryHover};
    }
`;

function LoginPage() {
    const navigate = useNavigate();

    const {
        login,
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
        }
    }, [isAuthenticated, user, navigate]);

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
            <MarketingPanel>
                <MarketingBrand>
                    <MarketingBrandTitle>
                        Healthcare MVP
                    </MarketingBrandTitle>

                    <MarketingBrandSubtitle>
                        Team Mavericks
                    </MarketingBrandSubtitle>
                </MarketingBrand>

                <MarketingContent>
                    <MarketingTitle>
                        Better Care
                        <br />
                        for a <MarketingHighlight>
                            Healthier
                        </MarketingHighlight>
                        <br />
                        <MarketingHighlight>
                            Tomorrow
                        </MarketingHighlight>
                    </MarketingTitle>

                    <MarketingDescription>
                        Manage patients, appointments, prescriptions
                        <br />
                        and more with a secure and modern healthcare
                        <br />
                        platform.
                    </MarketingDescription>
                </MarketingContent>
            </MarketingPanel>

            <LoginCard>
                <LoginTitle>
                    Sign in to your account
                </LoginTitle>

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
                        {loading
                            ? "Signing in..."
                            : "Sign In"}
                    </LoginButton>

                    <RegisterLink
                        type="button"
                        onClick={() => navigate("/register")}
                    >
                        Don't have an account?
                        {" "}Click here to register
                    </RegisterLink>
                </Form>
            </LoginCard>
        </PageContainer>
    );
}

export default LoginPage;