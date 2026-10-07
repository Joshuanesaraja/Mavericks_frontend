import styled from "styled-components";

const FooterContainer = styled.footer`
    display: flex;
    align-items: center;
    justify-content: center;

    min-height: 56px;
    padding: ${({ theme }) => theme.spacing.md};

    background: ${({ theme }) => theme.colors.surface};
    border-top: 1px solid ${({ theme }) => theme.colors.border};

    color: ${({ theme }) => theme.colors.textSecondary};

    font-size: ${({ theme }) => theme.typography.small};
`;

function Footer() {
    return (
        <FooterContainer>
            Healthcare MVP - Team Mavericks
        </FooterContainer>
    );
}

export default Footer;