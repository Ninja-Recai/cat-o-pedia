import { connect } from 'react-redux';
import { getSingleCat, getCats } from 'actions/cats';
import { Cat } from 'components/Cat';

const mapStateToProps = state => ({
  imgUri: state.cats.currentCat.imgUri,
  title: state.cats.currentCat.title,
  desc: state.cats.currentCat.desc,
  cats: state.cats.cats,
});

const mapDispatchToProps = {
  getSingleCat,
  getCats,
};

const CatContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Cat);

export default CatContainer;
