import  { Component } from 'react';
import '../styles/jogodavelha.css';

class Quadrado extends Component {
  render() {
    return (
      <button className="quadrado" onClick={this.props.onClick}>
        {this.props.valor}
      </button>
    );
  }
}

class JogoDaVelha extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quadrados: Array(9).fill(null),
      proximoJogador: 'X',
      vencedor: null,
    };
  }

  handleClick = (i) => {
    const quadrados = this.state.quadrados.slice();

    if (this.state.vencedor || quadrados[i]) {
      return;
    }

    quadrados[i] = this.state.proximoJogador;
    const vencedor = calcularVencedor(quadrados);

    this.setState({
      quadrados: quadrados,
      proximoJogador: this.state.proximoJogador === 'X' ? 'O' : 'X',
      vencedor: vencedor,
    });
  };

  renderQuadrado = (i) => {
    return (
      <Quadrado
        valor={this.state.quadrados[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  };

  render() {
    const status = this.state.vencedor
      ? `Vencedor: ${this.state.vencedor}`
      : `Próximo jogador: ${this.state.proximoJogador}`;

    return (
      <div>
        <div className="status">{status}</div>
        <div className="tabuleiro-row">
          {this.renderQuadrado(0)}
          {this.renderQuadrado(1)}
          {this.renderQuadrado(2)}
        </div>
        <div className="tabuleiro-row">
          {this.renderQuadrado(3)}
          {this.renderQuadrado(4)}
          {this.renderQuadrado(5)}
        </div>
        <div className="tabuleiro-row">
          {this.renderQuadrado(6)}
          {this.renderQuadrado(7)}
          {this.renderQuadrado(8)}
        </div>
      </div>
    );
  }
}

function calcularVencedor(quadrados) {
  const linhasVencedoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < linhasVencedoras.length; i++) {
    const [a, b, c] = linhasVencedoras[i];
    if (quadrados[a] && quadrados[a] === quadrados[b] && quadrados[a] === quadrados[c]) {
      return quadrados[a];
    }
  }

  return null;
}

export default JogoDaVelha;
