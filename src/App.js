import React from 'react';
import range from 'range-function'
import getNextGeneration from "./rules"
import {gliderGunBoard} from "./boards"
import './App.css';

function Cell({onClick, alive}) {
  return (
    <button className="cell" onClick={onClick}>
      {alive ? ":-)" : ""}
    </button>
  );
}

class Board extends React.Component {
  renderCell(i, j) {
    return (
      <Cell
        alive={this.props.cells.get([i, j])}
        onClick={this.props.onClick}
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
      history: [gliderGunBoard],
      currentGenerationIndex: 0,
    };
  }

  handleClick = () => {
    const { history } = this.state;
    let nextGeneration = getNextGeneration(history[history.length - 1]);

    this.setState({
      history: history.concat(nextGeneration),
      currentGenerationIndex: history.length,
    });
  }

  updateGeneration(generation) {
    this.setState({
      currentGenerationIndex: generation
    });
  }

  render() {
    const { history, currentGenerationIndex } = this.state;
    return (
      <div className="game">
        <div className="game-board">
          <Board
            cells={history[currentGenerationIndex]}
            onClick={this.handleClick}
          />
          <input
            type="range"
            min={0}
            max={history.length - 1}
            value={currentGenerationIndex}
            onChange={(event) => this.updateGeneration(event.target.value)}
          />
        </div>
        <div className="game-info">
          <div>
            Click any cell to advance to the next generation
          </div>
          <div>
            You're looking at gen #{currentGenerationIndex}
          </div>
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
