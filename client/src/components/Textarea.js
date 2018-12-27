import React, { Component } from 'react';
import styled from 'styled-components';
import is from 'styled-is';
import PropTypes from 'prop-types';

const PlainTextarea = styled.textarea`
  background-color: #ffffff;
  font-size: ${props => props.theme.fsReg};
  color: ${props => props.theme.dark};
  height: 7rem;
  padding: 1rem;
  resize: none;
  border: 1px solid
    ${props => (props.focused === true ? props.theme.alt : 'transparent')};
  width: 100%;
  ${is('half')`
    width: calc(50% - 1rem);
  `}
`;

export default class Textarea extends Component {
  static defaultProps = {
    isError: false,
  };

  static propTypes = {
    isError: PropTypes.bool,
  };

  state = {
    isFocused: false,
  };

  focus = () => {
    this.setState({
      isFocused: true,
    });
  };

  unfocus = () => {
    this.setState({
      isFocused: false,
    });
  };

  render() {
    return (
      <PlainTextarea
        focused={this.state.isFocused}
        onFocus={this.focus}
        onBlur={this.unfocus}
        {...this.props}
      />
    );
  }
}
