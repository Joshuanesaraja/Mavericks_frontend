import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const LayoutContainer = styled.div`
    min-height: 100vh;

    display: flex;
    flex-direction: column;

    background: ${({ theme }) => theme.colors.background};
`;

const MainArea = styled.div`
    flex: 1;

    display: flex;
`;

const ContentArea = styled.main`
    flex: 1;

    min-width: 0;

    padding: ${({ theme }) => theme.spacing.xl};

    overflow-x: auto;
`;

function DashboardLayout({ children }) {
    return (
        <LayoutContainer>
            <Header />

            <MainArea>
                <Sidebar />

                <ContentArea>
                    {children}
                </ContentArea>
            </MainArea>

            <Footer />
        </LayoutContainer>
    );
}

export default DashboardLayout;