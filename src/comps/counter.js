
import React, { Component } from 'react';

class Counter extends Component {
  render() {
    return (
      <div>
        <h1>כמה _-_ ימים עד {this.props.date}</h1>
        <h4>ימים</h4>
      </div>
    );
  }
}
export default Counter;