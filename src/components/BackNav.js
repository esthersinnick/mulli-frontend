import React, { Component } from 'react';
import { ReactComponent as BackIcon } from '../svg/back.svg'
import { withRouter } from "react-router-dom";

class BackNav extends Component {

  goToPreviousPage = () => {
    this.props.history.goBack();
  }

  render() {
    return (
      <div className="back-nav">
        <BackIcon onClick={this.goToPreviousPage} />
      </div>
    )
  }
}

export default withRouter(BackNav);