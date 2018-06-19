import React, { Component } from 'react';
import PropTypes from 'prop-types';
import octicons from 'octicons';

class Octicons extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    const hold = octicons[this.props.svg].options;
    if (this.props.classes) {
      hold.className = [hold.class, ...this.props.classes].join(' ');
      delete hold.class;
    }
    const svg = <svg {...hold} dangerouslySetInnerHTML={{ __html: octicons[this.props.svg].path }} />;

    return svg;
  }
}
export default Octicons;
Octicons.propTypes = {
  svg: PropTypes.string.isRequired,
  classes: PropTypes.node,
};
Octicons.defaultProps = {
  classes: [],
};
