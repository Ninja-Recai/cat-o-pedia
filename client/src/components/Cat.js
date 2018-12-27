import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PlainCat = styled.div`
  &:hover {
    .cat__img::after {
      opacity: .5;
    }
  }
  .cat {
    &__img {
      width: 100%;
      height 20rem;
      overflow: hidden;
      margin-bottom: 2rem;
      position: relative;

      img {
        object-fit: cover;
        object-position: center center;
        width: 100%;
      }

      &::after {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        transition: opacity .3s linear;
        background-color: ${props => props.theme.alt};
      }

    }
    &__desc {
      margin-top: .5rem;
      font-size: ${props => props.theme.fsSm};
    }
  }
`;

export class Cat extends Component {
  static propTypes = {
    imgUri: PropTypes.string,
    title: PropTypes.string,
    desc: PropTypes.string,
    maxLength: PropTypes.number,
    getSingleCat: PropTypes.func,
    params: PropTypes.object,
  };

  componentDidMount() {
    if (this.props.params) {
      this.fetchCat(this.props.params.id);
    }
  }

  fetchCat = cat => {
    this.props.getSingleCat(cat);
  };

  render() {
    // console.log(this.props.match.params);
    return (
      <PlainCat className="cat">
        <div className="cat__img">
          <img src={this.props.imgUri} alt={this.props.title} />
        </div>
        <h3 className="cat__title">{this.props.title}</h3>
        <p className="cat__desc">
          {this.props.maxLength
            ? `${this.props.desc.substring(0, this.props.maxLength)} [...]`
            : this.props.desc}
        </p>
      </PlainCat>
    );
  }
}
