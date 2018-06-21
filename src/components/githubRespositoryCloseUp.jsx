import styled from 'styled-components';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Octicons from './octicons';
import GitHubLabel from './githubLabels';
import { Header, Description } from './githubRespository';
// import { link } from 'fs';

const Footer = styled.div`
  display:grid;
  grid-row:3;
  grid-template-columns:repeat(4, 1fr);
`;
const Container = styled.div`
    display:grid;
  grid-template-rows: 100px 200px 30px 1fr;
  grid-template-columns:1fr;
  background-color:white;
  border: 1px solid grey;
  padding:20px;
  width:70%;
  margin-left:auto;
  margin-right:auto;
  text-align:left;
`;
class GitHubRepositoryCloseUp extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  // SVG(name){
  //   return Parser.parse(octicons.repo.toSVG())
  // }
  // handleClick(props) {
  //   alert(`You clicked ${props.name}`);
  // }
  render() {
    return (
      <Container>
        <Header><Octicons svg="repo" />{this.props.name}</Header>
        <Description>{this.props.desc}</Description>
        <Footer>
          <GitHubLabel name="Forks" svg="repo-forked" value={this.props.forks} />
          <GitHubLabel name="Stars" svg="star" value={this.props.stars} />
          <GitHubLabel name="Commits (last 7 days)" svg="git-commit" value={this.props.commits.length} />
          <GitHubLabel name="Language" svg="file-code" value={this.props.language} />
        </Footer>
        Commits made within 7 days:
        <ul>
          {this.props.commits.map(com => (
            <li
              key={com.sha}
            >
            Author: {com.commit.author.name} Message:{com.commit.message} Date: {com.commit.author.date}
            </li>
          ))}
        </ul>
      </Container>
    );
  }
}
export default GitHubRepositoryCloseUp;
GitHubRepositoryCloseUp.propTypes = {
  name: PropTypes.string.isRequired,
  forks: PropTypes.number.isRequired,
  stars: PropTypes.number.isRequired,
  commits: PropTypes.node.isRequired,
  desc: PropTypes.string,
  language: PropTypes.string.isRequired,
  // handleClick: PropTypes.func.isRequired,
};
GitHubRepositoryCloseUp.defaultProps = {
  desc: '',
};
