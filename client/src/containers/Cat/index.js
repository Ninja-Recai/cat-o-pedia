import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Container from 'components/Container';
import CatContainer from 'containers/Cat/CatContainer';

class CatPage extends PureComponent {
  static propTypes = {
    match: PropTypes.object,
  };

  render() {
    return (
      <Container>
        <CatContainer params={this.props.match.params} />
      </Container>
    );
  }
}

export default CatPage;
