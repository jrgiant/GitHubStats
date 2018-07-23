import styled from 'styled-components';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Octicons from './octicons';
import GitHubLabel from './githubLabels';

export const Header = styled.h2`
font-family:arial;
display:grid;
  grid-row:1;
  position:relative;
  text-align:left;
  padding-left:20%;
  word-wrap:break-word;
  
  color:#0000ff;
  
  font-weight:normal;
  img { width: 15%;}
  svg, img {
     position:absolute;
    top: 1%;
  }
  span {font-weight:bold;}

`;
export const Description = styled.p`
  color:gray;
  grid-row:2
  display:grid;
  overflow:hidden;
  position:relative;
  text-align:left;
  &:after {
    content:'';
    height:30px;
    width:80%;
    background: linear-gradient(rgba(255,255,255,0), rgba(255,255,255,1));
    position:absolute;
    bottom:0;
  }
`;
export const Container = styled.div`
  display:grid;
  grid-template-rows: 1fr 1fr 30px;
  grid-template-columns:1fr;
  background-color:white;
  border: 1px solid grey;
  height:225px;
  padding:20px;
  overflow:hidden;
  `;
const Footer = styled.div`
  display:grid;
  grid-row:3;
  grid-template-columns:1fr 1fr;
`;

class GitHubRepository extends Component {
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
    console.log(this.props.avatar);
    return (
      <Container onClick={this.props.handleClick}>
        <Header>
          {this.props.avatar === '' ? <Octicons svg="repo" /> : <img src={this.props.avatar} alt="avatar" />}{this.props.login} \ <span>{this.props.name}</span>
        </Header>
        <Description>{this.props.desc}</Description>
        <Footer><GitHubLabel name="Forks" svg="repo-forked" value={this.props.forks} /><GitHubLabel name="Stars" svg="star" value={this.props.stars} /></Footer>
      </Container>
    );
  }
}
export default GitHubRepository;
GitHubRepository.propTypes = {
  name: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
  forks: PropTypes.number.isRequired,
  stars: PropTypes.number.isRequired,
  desc: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
  avatar: PropTypes.string,
};
GitHubRepository.defaultProps = {
  desc: 'NO DESCRIPTION PROVIDED',
  avatar: '',
};
