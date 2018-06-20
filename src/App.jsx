import React, { Component } from 'react';
import styled from 'styled-components';
import logo from './github.svg';
import GitHubRepository from './components/githubRespository';
import GitHubRepositoryCloseUp from './components/githubRespositoryCloseUp';
import Input from './components/input';
// import Octicons from './components/octicons';
import './App.css';
// import GitHubRepositoryCloseUp from './components/githubRespositoryCloseUp';

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
      selectedRepository: {},
    };
  }

  componentDidMount() {
    const search = document.querySelector('#search-term');
    const searchButton = document.querySelector('#search-button');
    const preformSearch = () => {
      this.setState({
        repositorties: [],
        selectedRepository: {},
      });
      const url = `https://api.github.com/search/repositories?q=${search.value}&sort=updated`;
      fetch(url).then(response => response.json()).then((reps) => {
        console.log(reps);
        this.setState({ repositorties: reps.items });
      });
    };
    searchButton.addEventListener('click', preformSearch);
    search.addEventListener('keyup', (e) => {
      const key = e.which || e.keyCode;
      console.log(key);
      if (key === 13) preformSearch();
    });
  }
  /**
   * handles the click event
   * {@linkhttps://stackoverflow.com/a/40722477/1680765}
   * @param {*} repository
   */
  handleClick(repository) {
    this.setState({
      repositorties: [],
      selectedRepository: {},
    });
    // console.log(repository);
    const date = new Date();
    date.setDate(date.getDate() - 7);
    fetch(`https://api.github.com/repos/${repository.full_name}/commits?since=${date.toISOString()}`)
      .then(response => response.json())
      .then((commits) => {
        const hold = repository;
        hold.commits = commits;
        console.log(hold);
        this.setState({
          selectedRepository: hold,
        });
      });
  }
  render() {
    // const desc = 'Quis mollit velit culpa et eu enim duis occaecat anim quis est. Nostrud eiusmod tempor sunt occaecat enim reprehenderit laboris dolor non exercitation quis amet. Est pariatur ad culpa et incididunt pariatur.';
    const html = (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {/* <Octicons svg="mark-github" /> */}
          <h1 className="App-title">Search for a repository on GitHub</h1>
          <div><Input id="search-term" /><button id="search-button" type="button">Search</button></div>
        </header>
        {Object.keys(this.state.selectedRepository).length === 0 && this.state.selectedRepository.constructor === Object ? '' :

        <GitHubRepositoryCloseUp
          name={`${this.state.selectedRepository.owner.login} \\ ${this.state.selectedRepository.name}`}
          desc={this.state.selectedRepository.description}
          forks={this.state.selectedRepository.forks}
          stars={this.state.selectedRepository.stargazers_count}
          commits={this.state.selectedRepository.commits}
          language={this.state.selectedRepository.language}
        />

           }
        <div id="output" />
        <Box>
          {this.state.repositorties.map(rep => (<GitHubRepository
            url="#"
            name={`${rep.owner.login} \\ ${rep.name}`}
            desc={rep.description}
            forks={rep.forks}
            stars={rep.stargazers_count}
            handleClick={this.handleClick.bind(this, rep)}// eslint-disable-line
            key={rep.id}
          />))}
        </Box>
      </div>);
    return html;
  }
}

export default App;
