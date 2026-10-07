import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth } from "../../modules/auth/hooks/useAuth";

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xl};
    width: 100%;
`;
const WelcomeSection = styled.section`
    position: relative;

    overflow: hidden;

    padding: ${({ theme }) => theme.spacing.xxl};

    background: ${({ theme }) => theme.colors.surface};

    border: 1px solid ${({ theme }) => theme.colors.border};

    border-radius: ${({ theme }) => theme.radius.lg};

    box-shadow: ${({ theme }) => theme.shadows.md};

    &::before {
        content: "";

        position: absolute;

        width: 280px;

        height: 280px;

        right: -100px;

        top: -140px;

        border-radius: 50%;

        background: ${({ theme }) => theme.colors.primary};

        opacity: 0.07;
    }

    &::after {
        content: "";

        position: absolute;

        width: 160px;

        height: 160px;

        right: 140px;

        bottom: -100px;

        border-radius: 50%;

        background: ${({ theme }) => theme.colors.secondary};

        opacity: 0.05;
    }
`;

const WelcomeContent = styled.div`
    position: relative;
    z-index: 1;
`;

const WelcomeLabel = styled.p`
    margin: 0 0 ${({ theme }) => theme.spacing.xs};

    color: ${({ theme }) => theme.colors.primary};

    font-size: ${({ theme }) => theme.typography.small};
    font-weight: 600;

    text-transform: uppercase;
    letter-spacing: 0.08em;
`;

const PageTitle = styled.h1`
    margin: 0 0 ${({ theme }) => theme.spacing.xs};

    color: ${({ theme }) => theme.colors.text};

    font-size: 30px;
    font-weight: ${({ theme }) => theme.typography.headingWeight};
`;

const WelcomeText = styled.p`
    margin: 0 0 ${({ theme }) => theme.spacing.lg};

    color: ${({ theme }) => theme.colors.textSecondary};

    font-size: 15px;
`;

const UserDetails = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing.sm};
`;

const RoleBadge = styled.span`
    display: inline-flex;
    align-items: center;

    padding: 6px 14px;

    border-radius: ${({ theme }) => theme.radius.pill};

    background: ${({ theme }) => theme.colors.primary};
    color: #ffffff;

    font-size: ${({ theme }) => theme.typography.small};
    font-weight: 600;
`;

const Section = styled.section`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
`;

const SectionHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const SectionTitle = styled.h2`
    margin: 0;

    color: ${({ theme }) => theme.colors.text};

    font-size: ${({ theme }) => theme.typography.h2};
`;

const SectionDescription = styled.p`
    margin: ${({ theme }) => theme.spacing.xs} 0 0;

    color: ${({ theme }) => theme.colors.textSecondary};

    font-size: ${({ theme }) => theme.typography.small};
`;

const NavigationGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(
        auto-fit,
        minmax(220px, 1fr)
    );

    gap: ${({ theme }) => theme.spacing.md};
`;

const NavigationCard = styled(Link)`
    display: flex;
    flex-direction: column;

    min-height: 160px;
    padding: ${({ theme }) => theme.spacing.lg};

    background: ${({ theme }) => theme.colors.surface};

    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.md};

    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;

    box-shadow: ${({ theme }) => theme.shadows.sm};

    transition:
        transform 0.2s ease,
        border-color 0.2s ease,
        box-shadow 0.2s ease;

    &:hover {
        transform: translateY(-3px);

        border-color: ${({ theme }) => theme.colors.primary};

        box-shadow: ${({ theme }) => theme.shadows.md};
    }
`;

const CardIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 46px;
    height: 46px;

    margin-bottom: ${({ theme }) => theme.spacing.md};

    border-radius: ${({ theme }) => theme.radius.md};

    background: ${({ theme }) => theme.colors.surfaceHover};
    color: ${({ theme }) => theme.colors.primary};

    font-size: 20px;
`;

const CardTitle = styled.span`
    margin-bottom: ${({ theme }) => theme.spacing.xs};

    color: ${({ theme }) => theme.colors.text};

    font-size: 16px;
    font-weight: 600;
`;

const CardDescription = styled.span`
    color: ${({ theme }) => theme.colors.textSecondary};

    font-size: ${({ theme }) => theme.typography.small};
    line-height: 1.5;
`;

const CardArrow = styled.span`
    margin-top: auto;
    padding-top: ${({ theme }) => theme.spacing.md};

    color: ${({ theme }) => theme.colors.primary};

    font-size: 18px;
    font-weight: 600;

    transition: transform 0.2s ease;

    ${NavigationCard}:hover & {
        transform: translateX(4px);
    }
`;

const UserSummary = styled.div`
    display: grid;

    grid-template-columns: repeat(
        auto-fit,
        minmax(180px, 1fr)
    );

    gap: ${({ theme }) => theme.spacing.md};

    margin-top: ${({ theme }) => theme.spacing.xl};
`;

const SummaryCard = styled.div`
    padding: ${({ theme }) => theme.spacing.md};

    background: ${({ theme }) => theme.colors.surfaceHover};

    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.md};
`;

const SummaryLabel = styled.p`
    margin: 0 0 ${({ theme }) => theme.spacing.xs};

    color: ${({ theme }) => theme.colors.textSecondary};

    font-size: ${({ theme }) => theme.typography.small};
`;

const SummaryValue = styled.p`
    margin: 0;

    color: ${({ theme }) => theme.colors.text};

    font-size: 16px;
    font-weight: 600;
`;

function DashboardPage() {
    const { user } = useAuth();

    const roles = user?.roles || [];

    const navigationItems = [];

    if (roles.includes("Admin")) {
        navigationItems.push(
            {
                path: "/staff",
                title: "Staff Management",
                description: "Manage healthcare staff",
                icon: "👥"
            },
            {
                path: "/appointments",
                title: "Appointments",
                description: "Manage appointments and scheduling",
                icon: "📅"
            },
            {
                path: "/prescriptions",
                title: "Prescriptions",
                description: "View and manage prescriptions",
                icon: "💊"
            },
            {
                path: "/communication",
                title: "Communication",
                description: "Access healthcare communication",
                icon: "💬"
            },
            {
                path: "/calendar",
                title: "Calendar",
                description: "View and manage calendar events",
                icon: "🗓"
            }
        );
    }

    if (roles.includes("Provider")) {
        navigationItems.push(
            {
                path: "/patients",
                title: "Patients",
                description: "Manage patient records",
                icon: "👤"
            },
            {
                path: "/appointments",
                title: "Appointments",
                description: "Manage appointments and scheduling",
                icon: "📅"
            },
            {
                path: "/prescriptions",
                title: "Prescriptions",
                description: "View and manage prescriptions",
                icon: "💊"
            },
            {
                path: "/communication",
                title: "Communication",
                description: "Access healthcare communication",
                icon: "💬"
            },
            {
                path: "/calendar",
                title: "Calendar",
                description: "View and manage calendar events",
                icon: "🗓"
            }
        );
    }

    if (roles.includes("Nurse")) {
        navigationItems.push(
            {
                path: "/patients",
                title: "Patients",
                description: "View and manage patient records",
                icon: "👤"
            },
            {
                path: "/appointments",
                title: "Appointments",
                description: "View appointments and scheduling",
                icon: "📅"
            },
            {
                path: "/prescriptions",
                title: "Prescriptions",
                description: "View prescriptions",
                icon: "💊"
            },
            {
                path: "/communication",
                title: "Communication",
                description: "Access healthcare communication",
                icon: "💬"
            },
            {
                path: "/calendar",
                title: "Calendar",
                description: "View calendar events",
                icon: "🗓"
            }
        );
    }

    if (roles.includes("Patient")) {
        navigationItems.push(
            {
                path: "/appointments",
                title: "Appointments",
                description: "View your appointments",
                icon: "📅"
            },
            {
                path: "/prescriptions",
                title: "Prescriptions",
                description: "View your prescriptions",
                icon: "💊"
            },
            {
                path: "/communication",
                title: "Communication",
                description: "Access healthcare communication",
                icon: "💬"
            },
            {
                path: "/calendar",
                title: "Calendar",
                description: "View your calendar",
                icon: "🗓"
            }
        );
    }

    if (roles.includes("Pharmacist")) {
        navigationItems.push(
            {
                path: "/prescriptions",
                title: "Prescriptions",
                description: "Manage prescription status",
                icon: "💊"
            },
            {
                path: "/communication",
                title: "Communication",
                description: "Access healthcare communication",
                icon: "💬"
            },
            {
                path: "/calendar",
                title: "Calendar",
                description: "View calendar events",
                icon: "🗓"
            }
        );
    }

    const uniqueNavigationItems = navigationItems.filter(
        (item, index, items) =>
            items.findIndex(
                (existingItem) =>
                    existingItem.path === item.path
            ) === index
    );

    return (
        <PageContainer>
            <WelcomeSection>
                <WelcomeContent>
                    <WelcomeLabel>
                        Healthcare MVP
                    </WelcomeLabel>

                    <PageTitle>
                        Welcome back, {user?.name || "User"}
                    </PageTitle>

                    <WelcomeText>
                        Manage your healthcare activities
                        from your dashboard.
                    </WelcomeText>

                    <UserDetails>
                        {roles.map((role) => (
                            <RoleBadge key={role}>
                                {role}
                            </RoleBadge>
                        ))}
                    </UserDetails>

                    <UserSummary>
                        <SummaryCard>
                            <SummaryLabel>
                                User
                            </SummaryLabel>

                            <SummaryValue>
                                {user?.name || "User"}
                            </SummaryValue>
                        </SummaryCard>

                        <SummaryCard>
                            <SummaryLabel>
                                Email
                            </SummaryLabel>

                            <SummaryValue>
                                {user?.email || "Not available"}
                            </SummaryValue>
                        </SummaryCard>

                        <SummaryCard>
                            <SummaryLabel>
                                Role
                            </SummaryLabel>

                            <SummaryValue>
                                {roles.join(", ") || "User"}
                            </SummaryValue>
                        </SummaryCard>
                    </UserSummary>
                </WelcomeContent>
            </WelcomeSection>

            <Section>
                <SectionHeader>
                    <div>
                        <SectionTitle>
                            Quick Access
                        </SectionTitle>

                        <SectionDescription>
                            Access the healthcare modules available
                            to you.
                        </SectionDescription>
                    </div>
                </SectionHeader>

                <NavigationGrid>
                    {uniqueNavigationItems.map((item) => (
                        <NavigationCard
                            key={item.path}
                            to={item.path}
                        >
                            <CardIcon>
                                {item.icon}
                            </CardIcon>

                            <CardTitle>
                                {item.title}
                            </CardTitle>

                            <CardDescription>
                                {item.description}
                            </CardDescription>

                            <CardArrow>
                                →
                            </CardArrow>
                        </NavigationCard>
                    ))}
                </NavigationGrid>
            </Section>
        </PageContainer>
    );
}

export default DashboardPage;