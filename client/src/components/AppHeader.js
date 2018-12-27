import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import styled, { withTheme } from 'styled-components';
import Container from 'components/Container';
import H1 from 'components/H1';
import { themePropType } from '../theme';

const PlainAppHeader = styled.header`
  background-color: ${props => props.theme.prim};
  ${Container} {
    padding-bottom: 3rem;
  }
  .desc {
    color: ${props => props.theme.white};
    text-align: center;
    margin-top: 0.5rem;
  }
  ul {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 2rem;
  }
  li a {
    color: ${props => props.theme.white};
    padding: 0 1rem;
    display: flex;
    align-items: center;
    img {
      width: 2.5rem;
      margin-right: 1rem;
      opacity: 0;
      transform: translateX(1rem);
      transition: opacity 0.3s linear, transform 0.3s ease-in-out;
    }
    &:hover {
      img {
        opacity: 1;
        transform: none;
      }
    }
  }
`;

class AppHeader extends PureComponent {
  static propTypes = {
    theme: themePropType.isRequired,
  };

  render() {
    return (
      <PlainAppHeader>
        <Container>
          <H1
            color={this.props.theme.white}
            fontSize={this.props.theme.fsLg}
            textAlign="center"
          >
            Cat-o-pedia
          </H1>
          <p className="desc">Your purrly dose of meowy cat memes</p>
          <ul>
            <li>
              <Link to="/">
                <img
                  src="http://bestanimations.com/Animals/Mammals/Cats/cats/cute-kitty-animated-gif-3.gif"
                  alt="Running cat"
                />
                Home
              </Link>
            </li>
            <li>
              <Link to="/add">
                <img
                  src="http://bestanimations.com/Animals/Mammals/Cats/cats/cute-kitty-animated-gif-3.gif"
                  alt="Running cat"
                />
                Add a cat
              </Link>
            </li>
          </ul>
        </Container>
      </PlainAppHeader>
    );
  }
}

export default withTheme(AppHeader);
