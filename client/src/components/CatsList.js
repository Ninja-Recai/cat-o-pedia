import React, { Component } from 'react';
import styled from 'styled-components';
import Row from 'components/Row';
import Button from 'components/Button';
import H2 from 'components/H2';
import PropTypes from 'prop-types';

export const PlainList = styled.ul``;

export class CatsList extends Component {
  static propTypes = {
    cats: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
    displayCats: PropTypes.func.isRequired,
  };

  fetchCats = () => {
    this.props.displayCats();
  };

  render() {
    const cats = this.props.cats.map(cat => (
      <li key={cat.title}>
        <img src={cat.imgUri} alt={cat.title} />
        <h3>{cat.title}</h3>
        <p>{cat.desc}</p>
      </li>
    ));
    return (
      <PlainList>
        <Row>{cats}</Row>
      </PlainList>
    );
  }
}
