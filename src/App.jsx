import React, { Component } from 'react';
import styled from 'styled-components';
import GitHubRepository from './components/githubRespository';
import GitHubRepositoryCloseUp from './components/githubRespositoryCloseUp';
import Pagination from './components/pagination';
import Input from './components/input';
// import Octicons from './components/octicons';
import './App.css';
// import GitHubRepositoryCloseUp from './components/githubRespositoryCloseUp';

const Box = styled.div`
  display:grid;
  grid-template-columns:repeat(auto-fill, minmax(250px, 1fr));
  margin-left:auto;
  margin-right:auto;
  max-height:70vh;
  overflow-y:auto;
  gap:20px;
  padding:10px;
  background-color:#f5f7dc;
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
      maxNumberOfPages: 5,
      pagination: {
        currentPage: 0,
        // numberOfResultPages: 0,
        pages: [],
      },
    };
  }


  componentDidMount() {
    const search = document.querySelector('#search-term');
    const searchButton = document.querySelector('#search-button');
    const output = document.querySelector('#output');
    // const pages = document.querySelector('#pages');
    const radios = document.querySelectorAll('input[name="sortBy"]');

    const clearOldData = () => {
      output.style.display = 'block';
      // pages.innerHTML = '';
      this.setState({
        repositorties: [],
        selectedRepository: {},
      });
    };


    const preformSearch = () => {
      if (search.value === '') return false;
      const sorter = document.querySelector('input[name="sortBy"].checked');
      const direction = sorter.dataset.orderBy;
      const url = `https://api.github.com/search/repositories?q=${search.value}&sort=${sorter.id}&order=${direction}`;
      this.setState({
        currentUrl: url,
      });
      clearOldData();
      this.fetchResults(url);
      return true;
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
  fetchResults(url) {
    fetch(url).then(response => response.json()).then((reps) => {
      // console.log(reps);
      const output = document.querySelector('#output');
      output.removeAttribute('style');
      // pages.innerHTML = '';
      let page = 1;
      const qs = url.split('?')[1];
      if (qs.indexOf('page') > -1) {
        page = parseInt(qs.split('&').filter(p => p.indexOf('page') > -1)[0].split('=')[1], 10);
      }
      const total = parseInt(parseInt(reps.total_count, 10) / 100, 10) + 1;

      const pages = [];
      if (page === 1) {
        let i = page - 2 > -1 ? page - 2 : 0;
        while (i < total && i <= this.state.maxNumberOfPages) {
          pages.push(i);
          i += 1;
        }
      }
      this.setState({
        repositorties: reps.items,
        pagination: {
          currentPage: page,
          pages: pages.map(p => ({ page: p, click: this.handlePageChange.bind(this, p) })),
        },
        // numberOfResultPages: total,
      });
    });
  }
  /**
   * handles the click event
   * {@linkhttps://stackoverflow.com/a/40722477/1680765}
   * @param {*} repository
   */
  handleClick(repository) {
    const pages = document.querySelector('#pages');
    const output = document.querySelector('#output');
    output.style.display = 'block';
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
        output.removeAttribute('style');
        this.setState({
          selectedRepository: hold,
        });
      });
  }
  handlePageChange(page) {
    const urlSegments = this.state.currentUrl.split('?');
    const qs = urlSegments[1].split('&');
    const baseUrl = urlSegments[0];
    console.log(`urlSegments:${JSON.stringify(urlSegments)}, qs:${JSON.stringify(qs)}, baseUrl:${baseUrl}`);
    const newUrl = `${baseUrl}?${qs.reduce((a, q, i) => `${a}${(i === 0 ? '' : '&')}${(/page/i.test(q.split('=')[0]) ? '' : q)}`, '')}&page=${page}`;
    console.log(newUrl);
    // this.clearOldData();
    // this.fetchResults(newUrl);


    const output = document.querySelector('#output');
    output.style.display = 'block';

    this.setState({
      repositorties: [],
      selectedRepository: {},
    });
    // console.log(repository);
    this.fetchResults(newUrl);
    output.removeAttribute('style');
  }
  render() {
    // const desc = 'Quis mollit velit culpa et eu enim duis occaecat anim quis est. Nostrud eiusmod tempor sunt occaecat enim reprehenderit laboris dolor non exercitation quis amet. Est pariatur ad culpa et incididunt pariatur.';
    const html = (
      <div className="App">
        <section className="search">
          <div><Input id="search-term" /><button id="search-button" type="button">Search</button></div>
          <div className="radio-list">
            <div className="radio radio-inline-first"><input type="radio" className="desc checked" data-order-by="desc" name="sortBy" id="updated" defaultChecked /><label htmlFor="updated">Last Updated<i className="arrow" /></label></div>
            <div className="radio"><input type="radio" className="desc" name="sortBy" id="forks" /><label htmlFor="forks">Forks<i className="arrow" /></label></div>
            <div className="radio radio-inline-last"><input type="radio" className="desc" name="sortBy" id="stars" /><label htmlFor="stars">Stars<i className="arrow" /></label></div>
          </div>
        </section>
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
            <div className="overlay"><img src="http://res.cloudinary.com/jrgiantdev/image/upload/b_rgb:6559f3,c_scale,f_auto,o_92,q_auto:good,w_1200/v1531844661/markus-spiske-518966-unsplash_1_bhznls.jpg" alt="" />
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
        {
          this.state.pagination.pages.length === 0 ? '' :
          <Pagination pagination={this.state.pagination} maxPages={this.state.maxNumberOfPages} />
        }
        <div id="pages" />
        {
          // pass in a page array to Pagination
          // pages = [{number: 1, click: handlePageChange.bind(this, number)}...]
          // <Pagination pages={array of page objects}
        }
      </div>);
    return html;
  }
}

export default App;
