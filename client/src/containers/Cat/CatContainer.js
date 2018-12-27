import { connect } from 'react-redux';
import { getSingleCat } from 'actions/cats';
import { Cat } from 'src/components/Cat';

const mapStateToProps = state => ({
  currentCat: state.cats.currentCat,
});

const mapDispatchToProps = {
  getSingleCat,
};

const CatContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Cat);

export default CatContainer;
