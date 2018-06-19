import React, { Component } from 'react';
import styled from 'styled-components';
import logo from './logo.svg';
import GitHubRepository from './components/githubRespository';
import './App.css';

const Box = styled.div`
  display:grid;
  grid-template-columns:repeat(auto-fill, 300px);
  width:80%;
  max-width:1000px;
  margin-left:auto;
  margin-right:auto;
  gap:20px;
  @media (max-width:768px){
    width:100%;
  }

`;
class App extends Component {
  render() {
    const desc = 'Quis mollit velit culpa et eu enim duis occaecat anim quis est. Nostrud eiusmod tempor sunt occaecat enim reprehenderit laboris dolor non exercitation quis amet. Est pariatur ad culpa et incididunt pariatur.';
    const html = (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Box>
          <GitHubRepository url="#" user="One" name="One" desc={desc} forks={0} stars={0} />
          <GitHubRepository url="#" user="Two" name="Two" desc={desc} forks={0} stars={0} />
          <GitHubRepository url="#" user="Three" name="Three" desc={desc} forks={0} stars={0} />
          <GitHubRepository url="#" user="Four" name="Four" desc={desc} forks={0} stars={0} />
          <GitHubRepository url="#" user="Five" name="Five" desc={desc} forks={0} stars={0} />
          <GitHubRepository url="#" user="Six" name="Six" desc={desc} forks={0} stars={0} />
          <GitHubRepository url="#" user="Seven" name="Seven" desc={desc} forks={0} stars={0} />
          <GitHubRepository url="#" user="Eight" name="Eight" desc={desc} forks={0} stars={0} />
          <GitHubRepository url="#" user="Nine" name="Nine" desc={desc} forks={0} stars={0} />
          <GitHubRepository url="#" user="Ten" name="Ten" desc={desc} forks={0} stars={0} />
        </Box>
      </div>);
    return html;
  }
}

export default App;
