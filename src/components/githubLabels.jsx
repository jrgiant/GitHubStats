import styled from 'styled-components';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Octicons from './octicons';
// import ReactHtmlParser from 'react-html-parser';

const MainLabel = styled.div`
  font-size:1rem;
`;
const Label = styled.div`
  display:grid;
  position: relative;
  text-align:left;
  ${props => (props.svg ? `padding-left:30px;
    svg {
    
    position:absolute;
    
    left:10px;
  ` : '')}
  }
`;

class GitHubLabel extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.name = this.props.name;
    this.svg = this.props.svg;
    this.value = this.props.value;
  }
  Label() {
    let compiledLabel;
    if (this.svg !== null) {
      compiledLabel = (
        <Label svg="true">
          <Octicons svg={this.svg} />
          <MainLabel>{this.name}: {this.value}</MainLabel>
        </Label>
      );
    } else {
      compiledLabel = (
        <Label> <MainLabel>{this.name}: {this.value}</MainLabel></Label>
      );
    }
    return compiledLabel;
  }
  render() {
    return this.Label();
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
