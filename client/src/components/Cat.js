import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from 'components/Button';
import { Link } from 'react-router-dom';

const PlainCat = styled.div`
  position: relative;
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
    &__title,
    &__likesCount,
    &__message {
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
    &__likes {
      display: flex;
      align-items: center;
      transition: opacity 0.3s linear;
      @media (min-width: 400px) {
        margin-left: 2.5rem;
      }
      &--disabled {
        opacity: 0.7;
      }
      &:hover {
        .cat__likesCount {
          background-color: ${props => props.theme.prim};
        }
        .cat__likeKitten {
          animation: wubba 0.5s linear infinite;
        }
      }
    }
    &__likesCount {
      font-weight: 700;
      width: 3rem;
      height: 3rem;
      background-color: ${props => props.theme.alt};
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.3s linear;
    }
    &__message {
      font-size: ${props => props.theme.fsSm};
    }
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      @media (max-width: 400px) {
        flex-wrap: wrap;
      }
    }
    &__loader {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: ${props => props.theme.alt};
      z-index: 2;
    }
  }
  .button-container {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    justify-content: space-between;
  }
  .flex-container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  @keyframes wubba {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(0.5rem);
    }
    50% {
      transform: translateX(0);
    }
    75% {
      transform: translateX(-0.5rem);
    }
    100% {
      transform: translateX(0);
    }
  }
`;

export class Cat extends Component {
  state = {
    catFetched: this.props.maxLength ? true : false,
    catLiked: false,
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

  componentWillUnmount() {
    if (this.props.clearCat) {
      this.props.clearCat();
    }
  }

  fetchCat = cat => {
    this.props.getSingleCat(cat);
    this.setState({
      catFetched: true,
    });
  };

  addLike = e => {
    if (!this.state.catLiked) {
      this.props.addLike(this.props.title);
    }
  };

  render() {
    let top = '';
    let bottom = '';

    if (!this.props.maxLength) {
      top = (
        <React.Fragment>
          <div className="button-container">
            {this.props.prev !== '' && (
              <Link to={`/cat/${this.props.prev}`}>
                <Button className="margin--top">Previous cat</Button>
              </Link>
            )}
            {this.props.next !== '' && (
              <Link to={`/cat/${this.props.next}`}>
                <Button className="margin--top">Next cat</Button>
              </Link>
            )}
          </div>
          <div className="flex-container">
            <h3 className="cat__title">{this.props.title}</h3>
            <div
              className={`cat__likes ${this.state.catLiked &&
                'cat__likes--disabled'}`}
            >
              <img
                className="cat__likeKitten"
                onClick={this.addLike}
                src="https://i.imgur.com/grDMFRK.png"
                alt="Like kitten"
                style={{ width: '5rem', marginRight: '1rem' }}
              />
              <span className="cat__likesCount">{this.props.likes}</span>
            </div>
          </div>
          <span className="cat__spacer" />
        </React.Fragment>
      );
    } else {
      bottom = (
        <header className="cat__header">
          <h3 className="cat__title">{this.props.title}</h3>
          <div className="cat__likes">
            <img
              className="cat__likeKitten"
              src="https://i.imgur.com/grDMFRK.png"
              alt="Like kitten"
              style={{ width: '2rem', marginRight: '1rem' }}
            />
            <span className="cat__likesCount">{this.props.likes}</span>
          </div>
        </header>
      );
    }

    return (
      <React.Fragment>
        {this.state.catFetched && (
          <PlainCat className="cat fade-in">
            {this.props.loading && (
              <div className="cat__loader .fade-in">
                <img
                  src="https://media.giphy.com/media/3o7TKtbdY5oZuiyucg/giphy.gif"
                  alt="loader"
                />
              </div>
            )}
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
