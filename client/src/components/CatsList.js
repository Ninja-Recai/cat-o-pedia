import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Cat } from './Cat';
import Button from './Button';
import { Link } from 'react-router-dom';

export const PlainList = styled.div`
  display: flex;
  flex-wrap: wrap;
  a {
    padding-bottom: 2.5rem;
    margin-bottom: 2.5rem;
    border-bottom: 0.1rem solid ${props => props.theme.alt};
    width: 100%;
    @media (min-width: 400px) {
      width: calc(100% / 2 - 2rem);
    }
    @media (min-width: 1023px) {
      width: calc(100% / 3 - 2rem);
    }
    &:not(:nth-child(3n)) {
      margin-right: 2rem;
    }
    &:hover {
      .cat__img::after {
        opacity: 1;
      }
    }
  }
  .cat {
    &__img {
      height: 50vw;
      @media (min-width: 400px) {
        height: 30vw;
      }
      @media (min-width: 1023px) {
        height: 20vw;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
`;

export class CatsList extends Component {
  state = {
    visibleItems: 3,
  };

  static propTypes = {
    cats: PropTypes.arrayOf(PropTypes.object).isRequired,
    getCats: PropTypes.func,
  };

  componentDidMount() {
    this.fetchCats();
  }

  fetchCats = () => {
    this.props.getCats();
  };

  showMoreItems = () => {
    this.setState({
      visibleItems: this.state.visibleItems + 3,
    });
  };

  render() {
    const cats = this.props.cats
      .slice(0, this.state.visibleItems)
      .map((cat, index, cats) => {
        const link = `cat/${cat.title}`;
        return (
          <Link to={link} key={cat.title} className="fade-in">
            <Cat
              imgUri={cat.imgUri}
              title={cat.title}
              desc={cat.desc}
              likes={cat.likes}
              maxLength={150}
            />
          </Link>
        );
      });
    return (
      <React.Fragment>
        <PlainList>{cats}</PlainList>
        {this.state.visibleItems < this.props.cats.length && (
          <Button onClick={this.showMoreItems}> Show me more memes! </Button>
        )}
      </React.Fragment>
    );
  }
}
