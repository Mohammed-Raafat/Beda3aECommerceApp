import React from 'react';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react';

const Loading = () => (
  <div>
      <Dimmer active inverted>
        <Loader size='massive'>Loading</Loader>
      </Dimmer>
  </div>
)

export default Loading;