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
  background-color: rgba(255, 255, 255, 0.3);
  ${Row} {
    margin-bottom: 2rem;
  }
  ${H2} {
    margin-bottom: 3rem;
  }
  .button-container {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    img {
      margin-left: 0.5rem;
    }
  }
`;

class Form extends Component {
  state = {
    hoveringButton: false,
  };

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

  handleHover = e => {
    this.setState({
      hoveringButton: !this.state.hoveringButton,
    });
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
          <React.Fragment>
            <SuccessMessage>{this.props.successMessage}</SuccessMessage>
            <img src="https://www.wykop.pl/cdn/c3201142/comment_B5mhAeozAjCIB8ZFpKvXChmSl7IwHXBf.gif" />
          </React.Fragment>
        )}
        <div className="button-container">
          <Button
            disabled={this.props.isFetching}
            onMouseEnter={this.handleHover}
            onMouseOut={this.handleHover}
          >
            Meow!
          </Button>
          <img
            src="https://vignette.wikia.nocookie.net/leagueoflegends/images/c/c5/Excited_Kitten_Emote.png/revision/latest?cb=20171120233851"
            style={{
              width: '9rem',
              visibility: this.state.hoveringButton ? 'visible' : 'hidden',
            }}
          />
        </div>
      </PlainForm>
    );
  }
}

export default Form;
