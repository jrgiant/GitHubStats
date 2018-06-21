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
  grid-template-columns:repeat(auto-fill, minmax(300px, 1fr));
  width:80%;
  margin-left:auto;
  margin-right:auto;
  max-height:70vh;
  overflow-y:auto;
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
      currentUrl: '',
      // numberOfResultPages: 0,
    };
  }

  componentDidMount() {
    const search = document.querySelector('#search-term');
    const searchButton = document.querySelector('#search-button');
    const output = document.querySelector('#output');
    const pages = document.querySelector('#pages');
    const radios = document.querySelectorAll('input[name="sortBy"]');

    const clearOldData = () => {
      output.style.display = 'block';
      this.setState({
        repositorties: [],
        selectedRepository: {},
      });
    };
    const fetchResults = (url) => {
      fetch(url).then(response => response.json()).then((reps) => {
        // console.log(reps);
        output.removeAttribute('style');
        pages.innerHTML = '';
        const qs = url.split('?')[1];
        let page = 1;
        const total = parseInt(parseInt(reps.total_count, 10) / 100, 10) + 1;
        // console.log(`Total: ${total}`);
        if (qs.indexOf('page') > -1) {
          page = parseInt(qs.split('&').filter(p => p.indexOf('page') > -1)[0].split('=')[1], 10);
        }
        let newURL = '';

        if (page === 1) {
          pages.appendChild(document.createTextNode('1'));
          // TODO: append 1 to pagenumbers
          if (total > 1) {
            const link = document.createElement('a');
            link.href = '#';
            link.appendChild(document.createTextNode('Next>>>'));
            link.addEventListener('click', (e) => {
              e.preventDefault();
              clearOldData();
              newURL = `${this.state.currentUrl}&page=2`;
              fetchResults(newURL);
            });
            pages.appendChild(link);
          }
        } else {
          // TODO: append last, current page, next
          const backLink = document.createElement('a');
          backLink.href = '#';
          backLink.appendChild(document.createTextNode('<<<Previous'));
          backLink.addEventListener('click', (e) => {
            e.preventDefault();
            clearOldData();
            newURL = `${this.state.currentUrl}&page=${page - 1}`;
            fetchResults(newURL);
          });
          pages.appendChild(backLink);

          pages.appendChild(document.createTextNode(page));

          const nextLink = document.createElement('a');
          nextLink.href = '#';
          nextLink.appendChild(document.createTextNode('Next>>>'));
          nextLink.addEventListener('click', (e) => {
            e.preventDefault();
            clearOldData();
            newURL = `${this.state.currentUrl}&page=${page - 1}`;
            fetchResults(newURL);
          });
          pages.appendChild(nextLink);
        }
        this.setState({
          repositorties: reps.items,
          // numberOfResultPages: total,
        });
      });
    };

    const preformSearch = () => {
      const sorter = document.querySelector('input[name="sortBy"].checked');
      const direction = sorter.dataset.orderBy;
      const url = `https://api.github.com/search/repositories?q=${search.value}&sort=${sorter.id}&order=${direction}`;
      this.setState({
        currentUrl: url,
      });
      clearOldData();
      fetchResults(url);
    };
    radios.forEach((s) => {
      s.addEventListener('click', (e) => {
        const rad = e.target; if (rad.classList.contains('checked')) { rad.dataset.orderBy = rad.dataset.orderBy === 'desc' ? 'asc' : 'desc'; } else { radios.forEach(i => i.classList.remove('checked')); rad.classList.add('checked'); rad.dataset.orderBy = 'desc'; }
        if (rad.dataset.orderBy === 'asc') rad.classList.add('asc');
        else rad.classList.remove('asc');
        preformSearch();
      });
    });
    searchButton.addEventListener('click', preformSearch);
    search.addEventListener('keyup', (e) => {
      const key = e.which || e.keyCode;
      // console.log(key);
      if (key === 13) preformSearch();
    });
  }
  /**
   * handles the click event
   * {@linkhttps://stackoverflow.com/a/40722477/1680765}
   * @param {*} repository
   */
  handleClick(repository) {
    const pages = document.querySelector('#pages');
    pages.innerHTML = '';
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
        // console.log(hold);
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
          Sort By:
          <div className="radio"><input type="radio" className="desc checked" data-order-by="desc" name="sortBy" id="updated" checked="checked" /><label htmlFor="updated">Last Updated<i className="arrow" /></label></div>
          <div className="radio"><input type="radio" className="desc" name="sortBy" id="forks" /><label htmlFor="forks">Forks<i className="arrow" /></label></div>
          <div className="radio"><input type="radio" className="desc" name="sortBy" id="stars" /><label htmlFor="stars">Stars<i className="arrow" /></label></div>
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
        <div id="output">
          <div className="search-gh"><img src="https://cdnjs.cloudflare.com/ajax/libs/simple-icons/3.0.1/github.svg" alt="" />
            <div className="overlay"><img src="https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=05eb19761edddd58032dd4b6668dae3a" alt="" />
            </div>
          </div>
        </div>
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
        <div id="pages" />
      </div>);
    return html;
  }
}

export default App;
