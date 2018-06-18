import styled from 'styled-components';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Number = styled.input`
`;
const BlockLabel = styled.label`
    display: block;
`;
// const InlineLabel = styled.label`
//     display:inline;
// `;

let idNumber = 0;
// will use current idNumber or create a new instance.

class NumberInput extends Component {
  constructor(props) {
    super(props);
    this.label = this.props.label || null;
    this.placeholder = this.props.placeholder || 'Enter a number';
    this.value = this.props.value || null;
    this.id = this.props.id || (`input${this.inputCounter(true)}`);
    this.inline = this.props.inline || false;
    this.idNumber = idNumber;
  }

  WithLabel() {
    if (!this.inline) { return (<BlockLabel htmlFor={this.id}>{this.label}</BlockLabel>); }
    return (
      <div>
        <label htmlFor={this.id}>{this.label}</label>
        <Number type="Number" placeholder={this.placeholder} {...(this.value !== null ? { value: this.value } : {})} id={this.id} name={this.id} />
      </div>
    );
  }// ./withLabel
  Base() {
    return (
      <Number type="Number" placeholder={this.placeholder} {...(this.value !== null ? { value: this.value } : {})} id={this.id} name={this.id} />
    );
  }// ./base;
  /**
     *
     * @param {mixed} incrementAfter Any value will cause an increment to this.state.inputCount after the current value is obtained
     * @returns {int} current value of this.state.inputCount
     */
  inputCounter(incrementAfter) {
    // initialy copied from @link{https://stackoverflow.com/q/29420835/} modified substanitialy
    const inc = typeof incrementAfter !== 'undefined';
    const hold = this.idNumber;
    if (inc) {
      idNumber += 1;
      this.idNumber = idNumber;
    }
    return hold;
  }// ./inputCounter
  render() {
    if (this.label === null) return this.Base();
    return this.WithLabel();
  }// ./render
}// ./NumberInput
export default NumberInput;
NumberInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.node,
  id: PropTypes.number,
  inline: PropTypes.bool,

};
NumberInput.defaultProps = {
  label: null,
  placeholder: 'Enter a number',
  value: {},
  id: false,
  inline: false,
};
