import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

import {
    registerRequest
} from "../../modules/auth/authSlice";

import {
    selectAuthLoading,
    selectAuthError,
    selectRegistration
} from "../../modules/auth/selectors";

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

const RegisterCard = styled.div`
    width: 100%;
    max-width: 480px;

    padding: ${({ theme }) => theme.spacing.xl};

    background: ${({ theme }) => theme.colors.surface};

    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.lg};

    box-shadow: ${({ theme }) => theme.shadows.lg};
`;


const RegisterTitle = styled.h2`
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

const Hint = styled.span`
    color: ${({ theme }) => theme.colors.textSecondary};

    font-size: ${({ theme }) => theme.typography.small};
`;

const ErrorMessage = styled.div`
    padding: ${({ theme }) => theme.spacing.sm}
        ${({ theme }) => theme.spacing.md};

    border-radius: ${({ theme }) => theme.radius.sm};

    background: rgba(220, 38, 38, 0.08);
    color: ${({ theme }) => theme.colors.danger};

    font-size: ${({ theme }) => theme.typography.small};
`;

const SuccessMessage = styled.div`
    margin-bottom: ${({ theme }) => theme.spacing.md};

    padding: ${({ theme }) => theme.spacing.sm}
        ${({ theme }) => theme.spacing.md};

    border-radius: ${({ theme }) => theme.radius.sm};

    background: rgba(22, 163, 74, 0.08);
    color: ${({ theme }) => theme.colors.success};

    font-size: ${({ theme }) => theme.typography.small};
`;

const RegisterButton = styled(Button)`
    width: 100%;
    margin-top: ${({ theme }) => theme.spacing.sm};
`;

const LoginLink = styled.button`
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

function RegisterPage() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const loading = useSelector(selectAuthLoading);
    const authError = useSelector(selectAuthError);
    const registration = useSelector(selectRegistration);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [subdomain, setSubdomain] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (!registration) {
            return;
        }

        setSuccess(
            `Tenant "${registration.tenant_name}" created successfully. ` +
            `Your tenant is ${registration.subdomain}.localhost:8000. ` +
            "Redirecting to login..."
        );

        const timer = setTimeout(() => {
            window.location.href =
                `http://${registration.subdomain}.localhost:3000/login`;
        }, 2000);

        return () => clearTimeout(timer);
    }, [registration, navigate]);


    const handleSubmit = (e) => {
        e.preventDefault();

        setError("");

        if (password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }

        if (!subdomain) {
            setError("Tenant subdomain is required.");
            return;
        }

        dispatch(
            registerRequest({
                name,
                email,
                password,
                subdomain
            })
        );
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

            <RegisterCard>

                <RegisterTitle>
                    Create your tenant
                </RegisterTitle>

                {(error || authError) && (
                    <ErrorMessage>
                        {error || authError}
                    </ErrorMessage>
                )}

                {success && (
                    <SuccessMessage>
                        {success}
                    </SuccessMessage>
                )}

                <Form onSubmit={handleSubmit}>

                    <Field>
                        <Label htmlFor="name">
                            Hospital / Tenant Name
                        </Label>

                        <Input
                            id="name"
                            name="name"
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            placeholder="Enter tenant name"
                            required
                        />
                    </Field>

                    <Field>
                        <Label htmlFor="subdomain">
                            Tenant Subdomain
                        </Label>

                        <Input
                            id="subdomain"
                            name="subdomain"
                            type="text"
                            value={subdomain}
                            onChange={(e) =>
                                setSubdomain(
                                    e.target.value
                                        .toLowerCase()
                                        .replace(/[^a-z0-9-]/g, "")
                                )
                            }
                            placeholder="e.g. testhospital"
                            required
                        />

                        <Hint>
                            Your tenant URL will use this subdomain.
                        </Hint>
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
                            placeholder="Minimum 8 characters"
                            required
                        />
                    </Field>

                    <RegisterButton
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating Tenant..."
                            : "Create Tenant"}
                    </RegisterButton>

                    <LoginLink
                        type="button"
                        onClick={() => navigate("/login")}
                    >
                        Already have an account? Sign in
                    </LoginLink>

                </Form>

            </RegisterCard>

        </PageContainer>
    );
}

export default RegisterPage;