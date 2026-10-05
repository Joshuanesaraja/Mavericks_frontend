import styled from "styled-components";
import Button from "../common/Button";
import { useAuth } from "../../modules/auth/hooks/useAuth";
import { useTheme } from "../../context/ThemeContext";

const HeaderContainer = styled.header`
    height: ${({ theme }) => theme.layout.headerHeight};

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0 ${({ theme }) => theme.spacing.lg};

    background: ${({ theme }) => theme.colors.header};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};

    box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const Brand = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
`;

const BrandTitle = styled.h1`
    margin: 0;

    color: ${({ theme }) => theme.colors.primary};

    font-size: 20px;
    font-weight: ${({ theme }) => theme.typography.headingWeight};
`;

const UserSection = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.md};
`;

function Header() {
    const { logout, loading } = useAuth();
    const { themeMode, toggleTheme } = useTheme();


    return (
        <HeaderContainer>
            <Brand>
                <BrandTitle>Healthcare MVP</BrandTitle>
            </Brand>

            <UserSection>
                <Button
                    type="button"
                    onClick={toggleTheme}
                >
                    {themeMode === "warm"
                        ? "Dark Mode"
                        : "Warm Mode"}
                </Button>

                <Button
                    type="button"
                    onClick={logout}
                    disabled={loading}
                >
                    {loading ? "Logging out..." : "Logout"}
                </Button>
            </UserSection>
        </HeaderContainer>
    );
}

export default Header;