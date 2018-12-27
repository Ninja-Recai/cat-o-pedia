import { connect } from 'react-redux';
import { getSingleCat } from 'actions/cats';
import { Cat } from 'components/Cat';

const mapStateToProps = state => ({
  imgUri: state.cats.currentCat.imgUri,
  title: state.cats.currentCat.title,
  desc: state.cats.currentCat.desc,
});

const mapDispatchToProps = {
  getSingleCat,
};

const CatContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Cat);

export default CatContainer;
