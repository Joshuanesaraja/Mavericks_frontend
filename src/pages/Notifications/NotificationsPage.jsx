import {
    useEffect,
} from "react";

import styled from "styled-components";

import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";

import useNotifications from "../../modules/notifications/hooks/useNotifications";

const Page = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
`;

const Title = styled.h1`
    margin: 0;
`;

const Subtitle = styled.p`
    margin: 6px 0 0;
    color: ${({ theme }) =>
        theme.colors.textSecondary};
`;

const HeaderActions = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const Card = styled.div`
    background: ${({ theme }) =>
        theme.colors.surface};

    border: 1px solid
        ${({ theme }) =>
            theme.colors.border};

    border-radius:
        ${({ theme }) =>
            theme.radius.lg};

    box-shadow:
        ${({ theme }) =>
            theme.shadows.sm};
`;

const SummaryCard = styled(Card)`
    padding: 18px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 16px;
`;

const SummaryTitle = styled.div`
    font-size: 13px;
    color: ${({ theme }) =>
        theme.colors.textSecondary};
`;

const SummaryCount = styled.div`
    margin-top: 4px;
    font-size: 28px;
    font-weight: 700;
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const NotificationCard = styled(Card)`
    padding: 18px;

    border-left: 4px solid
        ${({ $unread, theme }) =>
            $unread
                ? theme.colors.primary
                : theme.colors.border};

    opacity: ${({ $unread }) =>
        $unread ? 1 : 0.88};

    transition:
        box-shadow 0.2s ease,
        transform 0.2s ease;

    &:hover {
        box-shadow:
            ${({ theme }) =>
                theme.shadows.md};

        transform: translateY(-1px);
    }
`;

const NotificationHeader = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    gap: 16px;
`;

const NotificationMain = styled.div`
    min-width: 0;
`;

const NotificationTitle = styled.h2`
    margin: 0;

    font-size: 16px;
    line-height: 1.4;
`;

const NotificationMessage = styled.p`
    margin: 8px 0 0;

    line-height: 1.6;

    color: ${({ theme }) =>
        theme.colors.textSecondary};
`;

const NotificationMeta = styled.div`
    margin-top: 12px;

    display: flex;
    align-items: center;
    gap: 10px;

    flex-wrap: wrap;

    font-size: 12px;

    color: ${({ theme }) =>
        theme.colors.textSecondary};
`;

const TypeBadge = styled.span`
    display: inline-flex;
    align-items: center;

    padding: 4px 9px;

    border-radius: 999px;

    background: ${({ theme }) =>
        theme.colors.surfaceHover};

    color: ${({ theme }) =>
        theme.colors.text};

    font-size: 11px;
    font-weight: 700;

    text-transform: capitalize;
`;

const UnreadBadge = styled.span`
    display: inline-flex;
    align-items: center;

    padding: 4px 9px;

    border-radius: 999px;

    background: ${({ theme }) =>
        theme.colors.primary};

    color: white;

    font-size: 11px;
    font-weight: 700;
`;

const NotificationActions = styled.div`
    flex-shrink: 0;
`;

const Empty = styled.div`
    padding: 60px 20px;

    text-align: center;

    color: ${({ theme }) =>
        theme.colors.textSecondary};
`;

const ErrorBox = styled.div`
    padding: 12px 16px;

    border-radius:
        ${({ theme }) =>
            theme.radius.md};

    background: rgba(220, 38, 38, 0.08);

    border: 1px solid
        ${({ theme }) =>
            theme.colors.danger};

    color:
        ${({ theme }) =>
            theme.colors.danger};
`;

const SuccessBox = styled.div`
    padding: 12px 16px;

    border-radius:
        ${({ theme }) =>
            theme.radius.md};

    background: rgba(22, 163, 74, 0.08);

    border: 1px solid
        ${({ theme }) =>
            theme.colors.success};

    color:
        ${({ theme }) =>
            theme.colors.success};
`;

function formatNotificationDate(
    value
) {
    if (!value) {
        return "";
    }

    const date = new Date(
        String(value).replace(
            " ",
            "T"
        )
    );

    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return value;
    }

    return date.toLocaleString(
        undefined,
        {
            dateStyle: "medium",
            timeStyle: "short",
        }
    );
}

function isUnread(
    notification
) {
    return (
        Number(
            notification?.is_read
        ) === 0
    );
}

function NotificationsPage() {
    const {
        notifications,
        unreadCount,

        loading,

        markingRead,
        markingAllRead,

        error,
        successMessage,

        getNotifications,
        getUnreadCount,

        markAsRead,
        markAllAsRead,

        clearError,
        clearSuccess,
    } = useNotifications();

    useEffect(() => {
        getNotifications();
        getUnreadCount();
    }, [
        getNotifications,
        getUnreadCount,
    ]);

    useEffect(() => {
        if (!successMessage) {
            return undefined;
        }

        const timer =
            setTimeout(
                () => {
                    clearSuccess();
                },
                3000
            );

        return () =>
            clearTimeout(timer);
    }, [
        successMessage,
        clearSuccess,
    ]);

    const handleMarkAsRead =
        (notification) => {
            if (
                !notification ||
                !isUnread(notification) ||
                markingRead
            ) {
                return;
            }

            markAsRead(
                notification.id
            );
        };

    return (
        <Page>
            <Header>
                <div>
                    <Title>
                        Notifications
                    </Title>

                    <Subtitle>
                        Stay informed about
                        appointments,
                        payments and
                        important system
                        updates.
                    </Subtitle>
                </div>

                <HeaderActions>
                    <Button
                        type="button"
                        onClick={
                            getNotifications
                        }
                        disabled={
                            loading
                        }
                    >
                        {loading
                            ? "Refreshing..."
                            : "Refresh"}
                    </Button>

                    {unreadCount > 0 && (
                        <Button
                            type="button"
                            onClick={
                                markAllAsRead
                            }
                            disabled={
                                markingAllRead
                            }
                        >
                            {markingAllRead
                                ? "Updating..."
                                : "Mark all as read"}
                        </Button>
                    )}
                </HeaderActions>
            </Header>

            {error && (
                <ErrorBox>
                    {error}

                    <div
                        style={{
                            marginTop: 8,
                        }}
                    >
                        <Button
                            type="button"
                            onClick={
                                clearError
                            }
                        >
                            Dismiss
                        </Button>
                    </div>
                </ErrorBox>
            )}

            {successMessage && (
                <SuccessBox>
                    {successMessage}
                </SuccessBox>
            )}

            <SummaryCard>
                <div>
                    <SummaryTitle>
                        Unread notifications
                    </SummaryTitle>

                    <SummaryCount>
                        {unreadCount}
                    </SummaryCount>
                </div>

                <TypeBadge>
                    Notification Center
                </TypeBadge>
            </SummaryCard>

            <Card>
                {loading ? (
                    <Empty>
                        <Loader />
                    </Empty>
                ) : notifications.length ===
                  0 ? (
                    <Empty>
                        You have no notifications
                        at the moment.
                    </Empty>
                ) : (
                    <List
                        style={{
                            padding: 16,
                        }}
                    >
                        {notifications.map(
                            (
                                notification
                            ) => {
                                const unread =
                                    isUnread(
                                        notification
                                    );

                                return (
                                    <NotificationCard
                                        key={
                                            notification.id
                                        }
                                        $unread={
                                            unread
                                        }
                                    >
                                        <NotificationHeader>
                                            <NotificationMain>
                                                <NotificationTitle>
                                                    {
                                                        notification.title
                                                    }
                                                </NotificationTitle>

                                                <NotificationMessage>
                                                    {
                                                        notification.message
                                                    }
                                                </NotificationMessage>

                                                <NotificationMeta>
                                                    <TypeBadge>
                                                        {
                                                            notification.type ||
                                                            "system"
                                                        }
                                                    </TypeBadge>

                                                    {unread && (
                                                        <UnreadBadge>
                                                            Unread
                                                        </UnreadBadge>
                                                    )}

                                                    <span>
                                                        {formatNotificationDate(
                                                            notification.created_at
                                                        )}
                                                    </span>
                                                </NotificationMeta>
                                            </NotificationMain>

                                            {unread && (
                                                <NotificationActions>
                                                    <Button
                                                        type="button"
                                                        onClick={() =>
                                                            handleMarkAsRead(
                                                                notification
                                                            )
                                                        }
                                                        disabled={
                                                            markingRead
                                                        }
                                                    >
                                                        Mark as read
                                                    </Button>
                                                </NotificationActions>
                                            )}
                                        </NotificationHeader>
                                    </NotificationCard>
                                );
                            }
                        )}
                    </List>
                )}
            </Card>
        </Page>
    );
}

export default NotificationsPage;