import React, { PureComponent } from 'react';
import Container from 'components/Container';
import CatsContainer from 'containers/Cats/CatsContainer';

class CatsListPage extends PureComponent {
  render() {
    return (
      <Container>
        <CatsContainer />
      </Container>
    );
  }
}

export default CatsListPage;
