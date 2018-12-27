import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Cat } from './Cat';

export const PlainList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  a {
    width: calc(100% / 3 - 2rem);
  }
  img {
    width: 100%;
  }
`;

export class CatsList extends Component {
  static propTypes = {
    cats: PropTypes.arrayOf(PropTypes.object).isRequired,
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
