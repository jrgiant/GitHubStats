import styled from 'styled-components';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;
const PageLink = styled.div`
background-color: #E65F5C;
padding: 10px;
display:inline;
margin-right:10px;
`;
const Page = PageLink.extend`
  border-radius:50%;
`;
const Prev = PageLink.extend`
  border-bottom-left-radius:50px;
  border-top-left-radius:50px;
`;
const Next = PageLink.extend`
  border-bottom-right-radius:50px;
  border-top-right-radius:50px;
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
          retValue = <Prev onClick={p.click}>Prev</Prev>;
          break;
        case max:
          retValue = <Next onClick={p.click}>Next</Next>;
          break;
        default:
          retValue = <Page onClick={p.click}>{p.page}</Page>;
          break;
      }

      return retValue;
    }
    const p = this.props.pagination.pages;
    console.log(`length: ${p.length}, pagination:${this.props.maxPages - 2}, maxPages"${this.props.maxPages}`);
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
