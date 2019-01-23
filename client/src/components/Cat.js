import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from 'components/Button';
import { Link } from 'react-router-dom';

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
  .button-container {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    justify-content: space-between;
  }
`;

export class Cat extends Component {
  state = {
    catFetched: this.props.maxLength ? true : false,
  };
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

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.params !== prevProps.params && this.props.params) {
      this.fetchCat(this.props.params.id);
    }
  }

  fetchCat = cat => {
    this.props.getSingleCat(cat);
    setTimeout(() => {
      this.setState({
        catFetched: true,
      });
    }, 600);
  };

  addLike = e => {
    this.props.addLike(this.props.title);
    this.fetchCat(this.props.title);
  };

  render() {
    let top = '';
    let bottom = '';

    if (!this.props.maxLength) {
      top = (
        <React.Fragment>
          <div className="button-container">
            <Link to={`/cat/${this.props.prev}`}>
              <Button className="margin--top">Previous cat</Button>
            </Link>
            <Link to={`/cat/${this.props.next}`}>
              <Button className="margin--top">Next cat</Button>
            </Link>
          </div>
          <h3 className="cat__title">
            {this.props.title}
            <span className="cat__spacer" />
          </h3>
          <button onClick={this.addLike}>ADD LIKE</button>
        </React.Fragment>
      );
    } else {
      bottom = <h3 className="cat__title">{this.props.title}</h3>;
    }

    return (
      <React.Fragment>
        {this.state.catFetched && (
          <PlainCat className="cat fade-in">
            {top}
            <div className="cat__img">
              <img src={this.props.imgUri} alt={this.props.title} />
            </div>
            {bottom}
            <p className="cat__desc">
              {this.props.maxLength &&
              this.props.desc.length > this.props.maxLength
                ? `${this.props.desc.substring(0, this.props.maxLength)} [...]`
                : this.props.desc}
            </p>
          </PlainCat>
        )}
      </React.Fragment>
    );
  }
}
