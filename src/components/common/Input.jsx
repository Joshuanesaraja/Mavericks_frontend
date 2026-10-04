import styled from "styled-components";

const StyledInput = styled.input`
    min-height: 40px;
    padding: 10px 12px;

    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.md};

    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};

    font-size: ${({ theme }) => theme.typography.body};

    transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease;

    &::placeholder {
        color: ${({ theme }) => theme.colors.textLight};
    }

    &:focus {
        border-color: ${({ theme }) => theme.colors.primary};
        box-shadow: 0 0 0 3px
            rgba(15, 118, 110, 0.12);
        outline: none;
    }

    &:disabled {
        background: ${({ theme }) => theme.colors.surfaceHover};
        cursor: not-allowed;
        opacity: 0.7;
    }
`;

function Input({
    type = "text",
    value,
    onChange,
    placeholder,
    name,
    id,
    disabled = false,
    required = false
}) {
    return (
        <StyledInput
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            name={name}
            id={id}
            disabled={disabled}
            required={required}
        />
    );
}

export default Input;