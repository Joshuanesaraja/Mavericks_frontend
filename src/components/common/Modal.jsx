import styled from "styled-components";

const Overlay = styled.div`
    position: fixed;
    inset: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: ${({ theme }) => theme.spacing.lg};

    background: rgba(15, 23, 42, 0.55);

    z-index: 1000;
`;

const ModalContainer = styled.div`
    width: 100%;
    max-width: 520px;
    max-height: 90vh;

    overflow-y: auto;

    padding: ${({ theme }) => theme.spacing.xl};

    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};

    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.lg};

    box-shadow: ${({ theme }) => theme.shadows.lg};
`;

const ModalHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const CloseButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 32px;
    height: 32px;

    border: none;
    border-radius: ${({ theme }) => theme.radius.sm};

    background: transparent;
    color: ${({ theme }) => theme.colors.textSecondary};

    font-size: 20px;

    &:hover {
        background: ${({ theme }) => theme.colors.surfaceHover};
        color: ${({ theme }) => theme.colors.text};
    }
`;

function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) {
        return null;
    }

    return (
        <Overlay onClick={onClose}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    <h2>{title}</h2>

                    <CloseButton
                        type="button"
                        onClick={onClose}
                        aria-label="Close modal"
                    >
                        ×
                    </CloseButton>
                </ModalHeader>

                {children}
            </ModalContainer>
        </Overlay>
    );
}

export default Modal;