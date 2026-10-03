import styled from "styled-components";

const StyledButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;

    min-height: 40px;
    padding: 10px 18px;

    border: none;
    border-radius: ${({ theme }) => theme.radius.md};

    background: ${({ theme }) => theme.colors.primary};
    color: #ffffff;

    font-size: ${({ theme }) => theme.typography.body};
    font-weight: 600;

    transition:
        background 0.2s ease,
        transform 0.2s ease,
        box-shadow 0.2s ease;

    &:hover:not(:disabled) {
        background: ${({ theme }) => theme.colors.primaryHover};
        box-shadow: ${({ theme }) => theme.shadows.sm};
    }

    &:active:not(:disabled) {
        transform: translateY(1px);
    }

    &:disabled {
        opacity: 0.6;
    }
`;

function Button({
    children,
    type = "button",
    onClick,
    disabled = false
}) {
    return (
        <StyledButton
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </StyledButton>
    );
}

export default Button;