import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Cat } from './Cat';

export const PlainList = styled.div`
  display: flex;
  flex-wrap: wrap;
  a {
    width: calc(100% / 3 - 2rem);
    padding-bottom: 2.5rem;
    margin-bottom: 2.5rem;
    border-bottom: 0.1rem solid ${props => props.theme.alt};
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
      height: 20vw;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
`;

export class CatsList extends Component {
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

  render() {
    const cats = this.props.cats.map(cat => {
      const link = `cat/${cat.title}`;
      return (
        <a href={link} key={cat.title}>
          <Cat
            imgUri={cat.imgUri}
            title={cat.title}
            desc={cat.desc}
            maxLength={150}
            cats={this.props.cats}
          />
        </a>
      );
    });
    return <PlainList>{cats}</PlainList>;
  }
}
