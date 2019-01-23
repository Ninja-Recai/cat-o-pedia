import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import styled, { withTheme } from 'styled-components';
import Container from 'components/Container';
import H1 from 'components/H1';
import { themePropType } from '../theme';

const PlainAppHeader = styled.header`
  background-color: rgba(22, 15, 46, 0.9);
  box-shadow: 0 0 20px 15px rgba(0, 0, 0, 0.7);
  z-index: 3;
  position: relative;
  ${Container} {
    padding: 1rem 1.5rem 3rem;
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

  .header__logo {
    height: 10rem;
    display: block;
    margin: 0 auto;
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
          <img
            className="header__logo"
            src="http://rs298.pbsrc.com/albums/mm272/nancysthings/Ron/cats38.gif~c200"
            alt="Cat-o-pedia"
          />
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
