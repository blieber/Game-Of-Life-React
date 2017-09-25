import React, { Component } from 'react';
import range from 'range-function'
import getNextGeneration from "./rules"
import {gliderGunBoard} from "./boards"
import './App.css';

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
        key={this.props.cells.size()[0] * i + j}
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
      cells: gliderGunBoard,
    };
  }

  handleClick(i) {
    this.setState({
      cells: getNextGeneration(this.state.cells),
    });
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
          <div>{"Click any cell to advance to the next generation"}</div>
        </div>
      </div>
    );
  }
}

function App(props) {
  return (
    <div className="App">
      <Game />
    </div>
  );
}

export default App;
