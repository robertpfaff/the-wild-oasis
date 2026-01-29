import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--color-grey-0);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
`;

function Home() {
  return (
    <Wrapper>
      <Title>Welcome to The Wild Oasis!</Title>
      <p>Book your perfect cabin getaway. Please log in or sign up to continue.</p>
      <Nav>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </Nav>
    </Wrapper>
  );
}

export default Home;
