import React, { Component } from 'react';
import styled from 'styled-components';
import logo from './logo.svg';
import GitHubRepository from './components/githubRespository';
import Input from './components/input';
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
  constructor(props) {
    super(props);
    this.state = {
      repositorties: [],
      selectedRepository: '',
    };
  }
  componentDidMount() {
    const search = document.querySelector('#search-term');
    const searchButton = document.querySelector('#search-button');
    searchButton.addEventListener('click', () => {
      const url = `https://api.github.com/search/repositories?q=${search.value}`;
      fetch(url).then(response => response.json()).then((reps) => {
        console.log(reps);
        this.setState({ repositorties: reps.items });
      });
    });
  }
  render() {
    // const desc = 'Quis mollit velit culpa et eu enim duis occaecat anim quis est. Nostrud eiusmod tempor sunt occaecat enim reprehenderit laboris dolor non exercitation quis amet. Est pariatur ad culpa et incididunt pariatur.';
    const html = (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <div><Input id="search-term" /><button id="search-button" type="button">Search</button></div>
        </header>
        <div id="output" />
        <Box>
          {this.state.repositorties.map(rep => <GitHubRepository url="#" name={`${rep.owner.login} \\ ${rep.name}`} desc={rep.description} forks={rep.forks} stars={rep.stargazers_count} />)}
        </Box>
      </div>);
    return html;
  }
}

export default App;
