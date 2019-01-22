import styled from 'styled-components';

const Button = styled.button`
  padding: 1rem 2rem;
  background-color: ${props => props.theme.alt};
  color: ${props => props.theme.white};
  transition: background-color 0.3s linear;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
  &:hover {
    background-color: ${props => props.theme.prim};
  }
  &.margin--top {
    margin-top: 1rem;
  }
`;

export default Button;
