import { connect } from 'react-redux';
import { addCat } from 'actions/cats';
import { updateField } from 'actions/form';
import Form from 'components/Form';

const mapStateToProps = state => ({
  errorMessage: state.cats.errorMessage,
  successMessage: state.cats.successMessage,
  isFetching: state.cats.isFetching,
  fetchReply: state.cats.fetchReply,
  formData: state.form.formData,
});

const mapDispatchToProps = {
  addCat,
  updateField,
};

const FormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);

export default FormContainer;
