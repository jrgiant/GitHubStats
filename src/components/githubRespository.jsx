import styled from 'styled-components';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Header = styled.h2`
  font-family:arial;
`;
class GitHubRepository extends Component {
  constuctor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (<Header>{this.props.name}</Header>);
  }
}
export default GitHubRepository;
GitHubRepository.propTypes = {
  name: PropTypes.string.isRequired,
};
GitHubRepository.defaultProps = {

};
