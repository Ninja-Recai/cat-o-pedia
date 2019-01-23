import { connect } from 'react-redux';
import { getSingleCat, addLike } from 'actions/cats';
import { Cat } from 'components/Cat';

const mapStateToProps = state => ({
  imgUri: state.cats.currentCat.cat.imgUri,
  title: state.cats.currentCat.cat.title,
  desc: state.cats.currentCat.cat.desc,
  likes: state.cats.currentCat.cat.likes,
  prev: state.cats.currentCat.prev.title,
  next: state.cats.currentCat.next.title,
});

const mapDispatchToProps = {
  getSingleCat,
  addLike,
};

const CatContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Cat);

export default CatContainer;
