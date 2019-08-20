import React, { Component } from 'react'

import { ReactComponent as HeartIcon } from '../svg/heart.svg'

class LandingPage extends Component {
  render() {
    return (
      <>
        <h1>
          Landing Page
      </h1>
        <HeartIcon />

      </>
    )
  }
}

export default LandingPage;


/*CSS en el path:
    fill: #f00;
    stroke: 2em solid #000;
    stroke: #3F51B5;
    stroke-width: 17px;
    stroke-linecap: butt;
    stroke-dasharray: 0;

*/
 // which makes this reusable component for other views