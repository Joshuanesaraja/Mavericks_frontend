import styled from "styled-components";

const LoaderWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${({ theme }) => theme.spacing.lg};
`;

const Spinner = styled.div`
    width: 32px;
    height: 32px;

    border: 3px solid ${({ theme }) => theme.colors.border};
    border-top-color: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;

    animation: spin 0.8s linear infinite;

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`;

function Loader() {
    return (
        <LoaderWrapper>
            <Spinner />
        </LoaderWrapper>
    );
}

export default Loader;