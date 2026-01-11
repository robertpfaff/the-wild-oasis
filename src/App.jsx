import styled from "styled-components";
import { Toaster } from "react-hot-toast";
import CabinTable from "./features/cabins/CabinTable";

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f3f4f6;
`;

const Header = styled.header`
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 1.5rem 2rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
`;

const Subtitle = styled.p`
  color: #6b7280;
  margin-top: 0.25rem;
`;

const Main = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
`;

function App() {
  return (
    <AppContainer>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "white",
            color: "#1f2937",
          },
        }}
      />
      
      <Header>
        <HeaderContent>
          <Title>The Wild Oasis</Title>
          <Subtitle>Cabin Management System</Subtitle>
        </HeaderContent>
      </Header>

      <Main>
        <Section>
          <SectionHeader>
            <SectionTitle>All Cabins</SectionTitle>
          </SectionHeader>
          <CabinTable />
        </Section>
      </Main>
    </AppContainer>
  );
}

export default App;
