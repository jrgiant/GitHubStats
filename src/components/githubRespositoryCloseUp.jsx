import styled from 'styled-components';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactChartkick, { LineChart } from 'react-chartkick';
import Chart from 'chart.js';
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
  grid-template-rows: 100px 100px 30px 1fr;
  grid-template-columns:1fr;
  background-color:white;
  border: 1px solid grey;
  padding:2%;
  width:96%;
  margin-left:auto;
  margin-right:auto;
  text-align:left;
`;
ReactChartkick.addAdapter(Chart);
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
    const data = [];
    if (this.props.commits.length > 0) {
      this.props.commits.forEach((com) => {
        const d = new Date(com.commit.author.date).toDateString();
        data[d] = (data[d] || 0) + 1;
      });
      // console.table(data);
    }
    return (
      <Container>
        <Header><Octicons svg="repo" />{this.props.link === '#' ? this.props.name : <a href={this.props.link} target="_blank" rel="noopener noreferrer">{this.props.name}</a>}</Header>
        <Description>{this.props.desc}</Description>
        <Footer>
          <GitHubLabel name="Forks" svg="repo-forked" value={this.props.forks} />
          <GitHubLabel name="Stars" svg="star" value={this.props.stars} />
          <GitHubLabel name="Commits (last 7 days)" svg="git-commit" value={this.props.commits.length} />
          <GitHubLabel name="Language" svg="file-code" value={this.props.language} />
        </Footer>
        <LineChart data={{ ...data }} />
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
  commits: PropTypes.array.isRequired, //eslint-disable-line
  desc: PropTypes.string,
  language: PropTypes.string,
  link: PropTypes.string,
  // handleClick: PropTypes.func.isRequired,
};
GitHubRepositoryCloseUp.defaultProps = {
  desc: '',
  link: '#',
  language: 'Not Given',
};
