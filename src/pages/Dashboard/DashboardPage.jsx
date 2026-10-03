import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth } from "../../modules/auth/hooks/useAuth";


const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xl};
`;

const WelcomeSection = styled.section`
    padding: ${({ theme }) => theme.spacing.xl};

    background: ${({ theme }) => theme.colors.surface};

    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.lg};

    box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const PageTitle = styled.h1`
    margin-bottom: ${({ theme }) => theme.spacing.xs};

    color: ${({ theme }) => theme.colors.text};
`;

const WelcomeText = styled.p`
    margin-bottom: ${({ theme }) => theme.spacing.md};

    color: ${({ theme }) => theme.colors.textSecondary};
`;

const UserDetails = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing.sm};
`;

const RoleBadge = styled.span`
    display: inline-flex;
    align-items: center;

    padding: 6px 12px;

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

const SectionTitle = styled.h2`
    margin: 0;

    color: ${({ theme }) => theme.colors.text};
`;

const NavigationGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: ${({ theme }) => theme.spacing.md};
`;

const NavigationCard = styled(Link)`
    display: flex;
    flex-direction: column;
    justify-content: center;

    min-height: 110px;
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
        transform: translateY(-2px);

        border-color: ${({ theme }) => theme.colors.primary};

        box-shadow: ${({ theme }) => theme.shadows.md};
    }
`;

const CardTitle = styled.span`
    margin-bottom: ${({ theme }) => theme.spacing.xs};

    color: ${({ theme }) => theme.colors.primary};

    font-size: 16px;
    font-weight: 600;
`;

const CardDescription = styled.span`
    color: ${({ theme }) => theme.colors.textSecondary};

    font-size: ${({ theme }) => theme.typography.small};
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
                description: "Manage healthcare staff"
            },
            {
                path: "/appointments",
                title: "Appointments",
                description: "Manage appointments and scheduling"
            },
            {
                path: "/prescriptions",
                title: "Prescriptions",
                description: "View and manage prescriptions"
            },
            {
                path: "/communication",
                title: "Communication",
                description: "Access healthcare communication"
            },
            {
                path: "/calendar",
                title: "Calendar",
                description: "View and manage calendar events"
            }
        );
    }

    if (roles.includes("Provider")) {
        navigationItems.push(
            {
                path: "/patients",
                title: "Patients",
                description: "Manage patient records"
            },
            {
                path: "/appointments",
                title: "Appointments",
                description: "Manage appointments and scheduling"
            },
            {
                path: "/prescriptions",
                title: "Prescriptions",
                description: "View and manage prescriptions"
            },
            {
                path: "/communication",
                title: "Communication",
                description: "Access healthcare communication"
            },
            {
                path: "/calendar",
                title: "Calendar",
                description: "View and manage calendar events"
            }
        );
    }

    if (roles.includes("Nurse")) {
        navigationItems.push(
            {
                path: "/patients",
                title: "Patients",
                description: "View and manage patient records"
            },
            {
                path: "/appointments",
                title: "Appointments",
                description: "View appointments and scheduling"
            },
            {
                path: "/prescriptions",
                title: "Prescriptions",
                description: "View prescriptions"
            },
            {
                path: "/communication",
                title: "Communication",
                description: "Access healthcare communication"
            },
            {
                path: "/calendar",
                title: "Calendar",
                description: "View calendar events"
            }
        );
    }

    if (roles.includes("Patient")) {
        navigationItems.push(
            {
                path: "/appointments",
                title: "Appointments",
                description: "View your appointments"
            },
            {
                path: "/prescriptions",
                title: "Prescriptions",
                description: "View your prescriptions"
            },
            {
                path: "/communication",
                title: "Communication",
                description: "Access healthcare communication"
            },
            {
                path: "/calendar",
                title: "Calendar",
                description: "View your calendar"
            }
        );
    }

    if (roles.includes("Pharmacist")) {
        navigationItems.push(
            {
                path: "/prescriptions",
                title: "Prescriptions",
                description: "Manage prescription status"
            },
            {
                path: "/communication",
                title: "Communication",
                description: "Access healthcare communication"
            },
            {
                path: "/calendar",
                title: "Calendar",
                description: "View calendar events"
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
                <PageTitle>Dashboard</PageTitle>

                <WelcomeText>
                    Welcome, {user?.name || "User"}
                </WelcomeText>

                <UserDetails>
                    {roles.map((role) => (
                        <RoleBadge key={role}>
                            {role}
                        </RoleBadge>
                    ))}
                </UserDetails>
            </WelcomeSection>

            <Section>
                <SectionTitle>Quick Access</SectionTitle>

                <NavigationGrid>
                    {uniqueNavigationItems.map((item) => (
                        <NavigationCard
                            key={item.path}
                            to={item.path}
                        >
                            <CardTitle>
                                {item.title}
                            </CardTitle>

                            <CardDescription>
                                {item.description}
                            </CardDescription>
                        </NavigationCard>
                    ))}
                </NavigationGrid>
            </Section>

        </PageContainer>
    );
}

export default DashboardPage;