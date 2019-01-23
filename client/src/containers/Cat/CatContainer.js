import { connect } from 'react-redux';
import { getSingleCat, addLike, clearCat } from 'actions/cats';
import { Cat } from 'components/Cat';
import * as R from 'ramda';

const mapStateToProps = state => {
  const { currentCat } = state.cats;
  return {
    loading: !currentCat,
    imgUri: R.pathOr('', ['cat', 'imgUri'], currentCat),
    title: R.pathOr('', ['cat', 'title'], currentCat),
    desc: R.pathOr('', ['cat', 'desc'], currentCat),
    likes: R.pathOr('', ['cat', 'likes'], currentCat),
    prev: R.pathOr('', ['prev', 'title'], currentCat),
    next: R.pathOr('', ['next', 'title'], currentCat),
  };
};

const mapDispatchToProps = {
  getSingleCat,
  addLike,
  clearCat,
};

const CatContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Cat);

export default CatContainer;
