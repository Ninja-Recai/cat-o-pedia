import React, { PureComponent } from 'react';
import Container from 'components/Container';
import CatContainer from 'containers/Cat/CatContainer';

class CatPage extends PureComponent {
  render() {
    return (
      <Container>
        <CatContainer />
      </Container>
    );
  }
}

export default CatPage;
