import { useEffect, useState } from "react";
import styled from "styled-components";

import { usePatients } from "../../modules/patients/hooks/usePatients";
import Input from "../common/Input";
import Button from "../common/Button";

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.lg};
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

const FullWidthField = styled(Field)`
    grid-column: 1 / -1;
`;

const Label = styled.label`
    color: ${({ theme }) => theme.colors.text};

    font-size: ${({ theme }) => theme.typography.body};
    font-weight: 600;
`;

const ErrorMessage = styled.div`
    padding: ${({ theme }) => theme.spacing.sm}
        ${({ theme }) => theme.spacing.md};

    border: 1px solid ${({ theme }) => theme.colors.danger};
    border-radius: ${({ theme }) => theme.radius.sm};

    background: rgba(220, 38, 38, 0.08);
    color: ${({ theme }) => theme.colors.danger};

    font-size: ${({ theme }) => theme.typography.small};
`;

const FormActions = styled.div`
    display: flex;
    justify-content: flex-end;

    grid-column: 1 / -1;

    padding-top: ${({ theme }) => theme.spacing.sm};
`;

function PatientForm({ patient }) {
    const {
        addPatient,
        editPatient,
        loading,
        error
    } = usePatients();

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        if (patient) {
            const data = patient.encrypted_data?.split(", ");

            setName(data?.[0] || "");
            setAge(data?.[1] || "");
            setGender(data?.[2] || "");
            setPhone(data?.[3] || "");
            setAddress(data?.[4] || "");
        }
    }, [patient]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const encryptedData = {
            encrypted_data: `${name}, ${age}, ${gender}, ${phone}, ${address}`
        };

        if (patient) {
            editPatient(patient.id, encryptedData);
        } else {
            addPatient(encryptedData);
        }
    };

    return (
        <FormContainer>
            <Form onSubmit={handleSubmit}>
                <Field>
                    <Label htmlFor="name">
                        Name
                    </Label>

                    <Input
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        placeholder="Enter patient name"
                        required
                    />
                </Field>

                <Field>
                    <Label htmlFor="age">
                        Age
                    </Label>

                    <Input
                        id="age"
                        name="age"
                        type="number"
                        value={age}
                        onChange={(e) =>
                            setAge(e.target.value)
                        }
                        placeholder="Enter age"
                        required
                    />
                </Field>

                <Field>
                    <Label htmlFor="gender">
                        Gender
                    </Label>

                    <Input
                        id="gender"
                        name="gender"
                        value={gender}
                        onChange={(e) =>
                            setGender(e.target.value)
                        }
                        placeholder="Enter gender"
                        required
                    />
                </Field>

                <Field>
                    <Label htmlFor="phone">
                        Phone
                    </Label>

                    <Input
                        id="phone"
                        name="phone"
                        value={phone}
                        onChange={(e) =>
                            setPhone(e.target.value)
                        }
                        placeholder="Enter phone number"
                        required
                    />
                </Field>

                <FullWidthField>
                    <Label htmlFor="address">
                        Address
                    </Label>

                    <Input
                        id="address"
                        name="address"
                        value={address}
                        onChange={(e) =>
                            setAddress(e.target.value)
                        }
                        placeholder="Enter address"
                        required
                    />
                </FullWidthField>

                {error && (
                    <FullWidthField>
                        <ErrorMessage>
                            {error}
                        </ErrorMessage>
                    </FullWidthField>
                )}

                <FormActions>
                    <Button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Saving..."
                            : patient
                                ? "Update Patient"
                                : "Add Patient"}
                    </Button>
                </FormActions>
            </Form>
        </FormContainer>
    );
}

export default PatientForm;