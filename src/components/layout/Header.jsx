import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Button from "../common/Button";

import { useAuth } from "../../modules/auth/hooks/useAuth";
import useNotifications from "../../modules/notifications/hooks/useNotifications";
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
    font-weight: ${({ theme }) =>
        theme.typography.headingWeight};
`;


const UserSection = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.md};
`;


/*
 * Notification button.
 */
const NotificationButton = styled.button`
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 42px;
    height: 42px;

    border: 1px solid
        ${({ theme }) => theme.colors.border};

    border-radius: ${({ theme }) =>
        theme.radii?.md || "8px"};

    background: ${({ theme }) =>
        theme.colors.header};

    color: ${({ theme }) =>
        theme.colors.text};

    font-size: 20px;

    cursor: pointer;

    transition:
        background 0.2s ease,
        border-color 0.2s ease;

    &:hover {
        background: ${({ theme }) =>
        theme.colors.background};

        border-color: ${({ theme }) =>
        theme.colors.primary};
    }
`;


/*
 * Red unread notification badge.
 */
const NotificationBadge = styled.span`
    position: absolute;

    top: -5px;
    right: -5px;

    min-width: 20px;
    height: 20px;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0 5px;

    border-radius: 999px;

    background: ${({ theme }) =>
        theme.colors.danger || "#dc2626"};

    color: #ffffff;

    font-size: 11px;
    font-weight: 700;

    line-height: 1;
`;


function Header() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const roles = user?.roles || [];
    const canAccessNotifications =
        roles.includes("Provider") ||
        roles.includes("Nurse")
    const {
        logout,
        loading,
    } = useAuth();

    const {
        unreadCount,
    } = useNotifications({
        autoFetchCount: true,
        pollingInterval: 15000,
    });

    const {
        themeMode,
        toggleTheme,
    } = useTheme();


    const handleNotificationsClick =
        () => {
            navigate("/notifications");
        };


    return (
        <HeaderContainer>
            <Brand>
                <BrandTitle>
                    Healthcare MVP
                </BrandTitle>
            </Brand>


            <UserSection>

                {/* Notification button */}
                {canAccessNotifications && <NotificationButton
                    type="button"
                    onClick={
                        handleNotificationsClick
                    }
                    aria-label="Notifications"
                    title="Notifications"
                >
                    🔔

                    {unreadCount > 0 && (
                        <NotificationBadge>
                            {unreadCount > 99
                                ? "99+"
                                : unreadCount}
                        </NotificationBadge>
                    )}
                </NotificationButton>}


                {/* Theme button */}
                <Button
                    type="button"
                    onClick={toggleTheme}
                >
                    {themeMode === "warm"
                        ? "Dark Mode"
                        : "Warm Mode"}
                </Button>


                {/* Logout button */}
                <Button
                    type="button"
                    onClick={logout}
                    disabled={loading}
                >
                    {loading
                        ? "Logging out..."
                        : "Logout"}
                </Button>

            </UserSection>
        </HeaderContainer>
    );
}


export default Header;