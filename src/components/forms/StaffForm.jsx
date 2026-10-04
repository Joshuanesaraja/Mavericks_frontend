import {
    useEffect,
    useState
} from "react";

import styled from "styled-components";

import Button from "../common/Button";
import Input from "../common/Input";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) =>
        theme.spacing.lg};
`;

const FieldGrid = styled.div`
    display: grid;
    grid-template-columns:
        repeat(2, minmax(0, 1fr));

    gap: ${({ theme }) =>
        theme.spacing.md};

    @media (max-width: 700px) {
        grid-template-columns: 1fr;
    }
`;

const Field = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) =>
        theme.spacing.xs};
`;

const Label = styled.label`
    color: ${({ theme }) =>
        theme.colors.text};

    font-size: ${({ theme }) =>
        theme.typography.small};

    font-weight: ${({ theme }) =>
        theme.typography.subHeadingWeight};
`;

const StyledSelect = styled.select`
    min-height: 40px;
    padding: 10px 12px;

    border: 1px solid
        ${({ theme }) =>
            theme.colors.border};

    border-radius: ${({ theme }) =>
        theme.radius.md};

    background: ${({ theme }) =>
        theme.colors.surface};

    color: ${({ theme }) =>
        theme.colors.text};

    font-size: ${({ theme }) =>
        theme.typography.body};

    &:focus {
        border-color:
            ${({ theme }) =>
                theme.colors.primary};

        box-shadow:
            0 0 0 3px
            rgba(15, 118, 110, 0.12);

        outline: none;
    }
`;

const HelpText = styled.p`
    margin: 0;

    color: ${({ theme }) =>
        theme.colors.textSecondary};

    font-size: ${({ theme }) =>
        theme.typography.small};
`;

const FormActions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: ${({ theme }) =>
        theme.spacing.sm};

    flex-wrap: wrap;
`;

const SecondaryButton = styled.button`
    min-height: 40px;
    padding: 10px 18px;

    border: 1px solid
        ${({ theme }) =>
            theme.colors.border};

    border-radius: ${({ theme }) =>
        theme.radius.md};

    background: transparent;

    color: ${({ theme }) =>
        theme.colors.text};

    font-size: ${({ theme }) =>
        theme.typography.body};

    font-weight: 600;

    cursor: pointer;

    &:hover {
        background:
            ${({ theme }) =>
                theme.colors.surfaceHover};
    }
`;

function StaffForm({
    initialValues = null,
    editing = false,
    saving = false,
    onSubmit,
    onCancel
}) {
    const [form, setForm] =
        useState({
            name: "",
            email: "",
            password: "",
            staff_type: "provider"
        });

    useEffect(() => {
        setForm({
            name:
                initialValues?.name || "",
            email:
                initialValues?.email || "",
            password: "",
            staff_type:
                initialValues?.staff_type ||
                "provider"
        });
    }, [initialValues]);

    const handleChange = (event) => {
        const {
            name,
            value
        } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const payload = {
            name: form.name.trim(),
            email: form.email.trim(),
            staff_type:
                form.staff_type
        };

        if (!editing) {
            payload.password =
                form.password;
        }

        onSubmit(payload);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FieldGrid>
                <Field>
                    <Label htmlFor="staff-name">
                        Full name
                    </Label>

                    <Input
                        id="staff-name"
                        name="name"
                        value={form.name}
                        onChange={
                            handleChange
                        }
                        placeholder="Enter full name"
                        required
                        disabled={saving}
                    />
                </Field>

                <Field>
                    <Label htmlFor="staff-email">
                        Email
                    </Label>

                    <Input
                        id="staff-email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={
                            handleChange
                        }
                        placeholder="staff@example.com"
                        required
                        disabled={saving}
                    />
                </Field>

                {!editing && (
                    <Field>
                        <Label htmlFor="staff-password">
                            Temporary password
                        </Label>

                        <Input
                            id="staff-password"
                            type="password"
                            name="password"
                            value={
                                form.password
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="Minimum 8 characters"
                            required
                            disabled={saving}
                        />

                        <HelpText>
                            The backend requires
                            at least 8 characters.
                        </HelpText>
                    </Field>
                )}

                <Field>
                    <Label htmlFor="staff-type">
                        Staff type
                    </Label>

                    <StyledSelect
                        id="staff-type"
                        name="staff_type"
                        value={
                            form.staff_type
                        }
                        onChange={
                            handleChange
                        }
                        disabled={saving}
                        required
                    >
                        <option value="provider">
                            Provider
                        </option>

                        <option value="nurse">
                            Nurse
                        </option>

                        <option value="pharmacist">
                            Pharmacist
                        </option>
                    </StyledSelect>

                    <HelpText>
                        Staff type determines
                        the corresponding
                        backend RBAC role.
                    </HelpText>
                </Field>
            </FieldGrid>

            <FormActions>
                {onCancel && (
                    <SecondaryButton
                        type="button"
                        onClick={onCancel}
                        disabled={saving}
                    >
                        Cancel
                    </SecondaryButton>
                )}

                <Button
                    type="submit"
                    disabled={saving}
                >
                    {saving
                        ? editing
                            ? "Saving..."
                            : "Creating..."
                        : editing
                            ? "Save changes"
                            : "Add staff"}
                </Button>
            </FormActions>
        </Form>
    );
}

export default StaffForm;