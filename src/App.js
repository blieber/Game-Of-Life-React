import React, { Component } from 'react';
import range from 'range-function'
import math from 'mathjs'
import './App.css';

// TODO - props types (?) boolean
function Cell(props) {
  return (
    <button className="cell" onClick={props.onClick}>
      {props.alive ? ":-)" : ""}
    </button>
  );
}

class Board extends React.Component {
  renderCell(i, j) {
    return (
      <Cell
        alive={this.props.cells.get([i, j])}
        onClick={() => this.props.onClick(i)}
        key={i, j}
      />
    );
  }

  render() {
    return (
      <div>
        {range(this.props.cells.size()[0]).map(i => (
          <div className="cells-row" key={i}>
            {range(this.props.cells.size()[1]).map(j => (this.renderCell(i, j)))}
          </div>))}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      cells: math.matrix([[true, true], [false, true]]),
    };
  }

  handleClick(i) {
    /*this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });*/
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board
            cells={this.state.cells}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{"hi"}</div>
        </div>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Game />
      </div>
    );
  }
}

export default App;
