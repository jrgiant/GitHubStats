import styled from 'styled-components';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;
const PageLink = styled.div`
background-color: #E65F5C;
padding: 10px;
display:inline;
margin-right:3rem;
text-align:center;
color:#F5F7DC;
font-family: Violina;
font-weight: normal;
font-size: 36px;
line-height: 38px;
padding: 0.4rem 1rem;
&:hover{
  background-color:#A84643;
}
`;
const Page = PageLink.extend`
  border-radius:50%;
`;
const Prev = PageLink.extend`
  border-bottom-left-radius:50px;
  border-top-left-radius:50px;
  padding: 0.4rem 2rem;

`;
const Next = PageLink.extend`
  border-bottom-right-radius:50px;
  border-top-right-radius:50px;
  padding: 0.4rem 4rem;
  margin-right:0;
`;

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    // if only one page of results
    function singlePages(p) {
      return <Page onClick={p.click}>{p.page}</Page>;
    }
    // if only two pages of results
    function createPagination(p, i, a) {
      let retValue;
      const max = a.length - 1;
      switch (i) {
        case 0:
          retValue = <Prev onClick={p.click} key={i}>Prev</Prev>;
          break;
        case max:
          retValue = <Next onClick={p.click} key={i}>Next</Next>;
          break;
        default:
          retValue = <Page onClick={p.click} key={i}>{p.page}</Page>;
          break;
      }

      return retValue;
    }
    const p = this.props.pagination.pages;
    // console.log(`length: ${p.length}, pagination:${this.props.maxPages - 2}, maxPages"${this.props.maxPages}`);
    return (
      <Wrapper>
        {p.length > (this.props.maxPages - 2) ?
          p.map(createPagination) :
          p.map(singlePages)
        }
      </Wrapper>
    );
  }
}
export default Pagination;
Pagination.defaultProps = {

};
Pagination.propTypes = {
  pagination: PropTypes.object.isRequired, // eslint-disable-line
  maxPages: PropTypes.number.isRequired,

};
