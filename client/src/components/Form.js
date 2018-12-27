import React, { Component } from 'react';
import styled from 'styled-components';
import Input from 'components/Input';
import Row from 'components/Row';
import Button from 'components/Button';
import H2 from 'components/H2';
import ErrorMessage from 'components/ErrorMessage';
import SuccessMessage from 'components/SuccessMessage';
import PropTypes from 'prop-types';
import Textarea from './Textarea';

export const PlainForm = styled.form`
  width: 70rem;
  max-width: 100%;
  padding: 3rem;
  margin: 0 auto;
  background-color: ${props => props.theme.light};
  ${Row} {
    margin-bottom: 2rem;
  }
  ${H2} {
    margin-bottom: 3rem;
  }
  ${Button} {
    margin-top: 1rem;
  }
`;

class Form extends Component {
  static defaultProps = {
    successMessage: '',
    errorMessage: '',
  };

  static propTypes = {
    updateField: PropTypes.func.isRequired,
    addCat: PropTypes.func.isRequired,
    formData: PropTypes.objectOf(PropTypes.string).isRequired,
    successMessage: PropTypes.string,
    errorMessage: PropTypes.string,
    isFetching: PropTypes.bool,
  };

  updateField = e => {
    const fieldName = e.target.getAttribute('name');
    const value = e.target.value;
    this.props.updateField({ fieldName, value });
  };

  submit = e => {
    e.preventDefault();
    this.props.addCat(this.props.formData);
  };

  render() {
    return (
      <PlainForm onSubmit={this.submit}>
        <H2 textAlign="center">Add another crazy cat meme</H2>
        <Row spaceBetween>
          <Input
            name="imgUri"
            placeholder="Url to cat's image"
            type="text"
            required={true}
            half
            value={this.props.formData.imgUri}
            onChange={this.updateField}
          />
          <Input
            name="title"
            placeholder="Title"
            type="text"
            required={true}
            half
            value={this.props.formData.title}
            onChange={this.updateField}
          />
        </Row>
        <Row spaceBetween>
          <Textarea
            name="desc"
            placeholder="Description"
            value={this.props.formData.desc}
            onChange={this.updateField}
          />
        </Row>
        {this.props.errorMessage && (
          <ErrorMessage>
            Oops, an error occured!
            <output>{this.props.errorMessage}</output>
          </ErrorMessage>
        )}
        {this.props.successMessage && (
          <SuccessMessage>{this.props.successMessage}</SuccessMessage>
        )}
        <Button disabled={this.props.isFetching}>Meow!</Button>
      </PlainForm>
    );
  }
}

export default Form;
