import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PlainCat = styled.div`
  .cat {
    &__img {
      width: 100%;
      height: auto;
      overflow: hidden;
      margin-bottom: 2rem;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: flex-start;

      img {
        max-width: 70rem;
        width: 100%;
        height: auto;
      }

      &::after {
        content: '(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧';
        color: ${props => props.theme.dark};
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        transition: opacity 0.3s linear;
        background-color: rgba(192, 100, 232, 0.5);
      }
    }

    &__desc,
    &__title {
      color: ${props => props.theme.white};
    }

    &__desc {
      margin-top: 0.5rem;
      font-size: ${props => props.theme.fsSm};
    }

    &__spacer {
      margin: 2rem 0;
      width: 100%;
      display: block;
      height: 0.1rem;
      background-color: ${props => props.theme.alt};
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
    let top = '';
    let bottom = '';

    if (!this.props.maxLength) {
      top = (
        <h3 className="cat__title">
          {this.props.title}
          <span className="cat__spacer" />
        </h3>
      );
    } else {
      bottom = <h3 className="cat__title">{this.props.title}</h3>;
    }

    return (
      <PlainCat className="cat">
        {top}
        <div className="cat__img">
          <img src={this.props.imgUri} alt={this.props.title} />
        </div>
        {bottom}
        <p className="cat__desc">
          {this.props.maxLength && this.props.desc.length > this.props.maxLength
            ? `${this.props.desc.substring(0, this.props.maxLength)} [...]`
            : this.props.desc}
        </p>
      </PlainCat>
    );
  }
}
