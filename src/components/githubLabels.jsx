import styled from 'styled-components';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { octicons } from 'octicons';

const MainLabel = styled.div`
  font-size:1rem;
`;
const Label = styled.div`
  display:grid;
`;

class GitHubLabel extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.name = this.props.name;
    this.svg = this.props.svg;
    this.value = this.props.value;
  }
  SVG() {
    return octicons[this.svg].toSVG();
  }
  Label() {
    let compiledLabel;
    if (this.svg !== null) {
      compiledLabel = (
        <Label>
          {this.SVG() }
          <MainLabel>{this.value}</MainLabel>
        </Label>
      );
    } else {
      compiledLabel = (
        <Label> <MainLabel>{this.value}</MainLabel></Label>
      );
    }
    return compiledLabel;
  }
  render() {
    return Label();
  }
}
export default GitHubLabel;
GitHubLabel.propTypes = {
  name: PropTypes.string.isRequired,
  svg: PropTypes.string,
  value: PropTypes.node.isRequired,
};
GitHubLabel.defaultProps = {
  svg: null,
};
