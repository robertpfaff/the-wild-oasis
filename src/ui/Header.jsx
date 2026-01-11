import Styled from 'styled-components';

const StyledHeader = Styled.header`
    background-color: var(--color-white);
    padding: 1.2rem 4.8rem;
    border-bottom: 1px solid var(--color-grey-200);
`;

function Header() {
    return (
        <StyledHeader>
         <h2>Header</h2>
        </StyledHeader>
    )
}

export default Header;