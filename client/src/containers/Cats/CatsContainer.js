import { connect } from 'react-redux';
import { getCats } from 'actions/cats';
import { CatsList } from 'components/CatsList';

const mapStateToProps = state => ({
  errorMessage: state.cats.errorMessage,
  successMessage: state.cats.successMessage,
  isFetching: state.cats.isFetching,
  fetchReply: state.cats.fetchReply,
  cats: state.cats.cats,
});

const mapDispatchToProps = {
  getCats,
};

const CatsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CatsList);

export default CatsContainer;
