import React, { Component } from 'react';
import './css/content.css';

class Content extends Component {
  constructor() {
    super();

    this.state = {
      count: 0,
      resultado:0,
      numero1:0,
      numero2:0
    }
    /*
     * Se inicializa la funcion y se le pasa el this
     * para poder usarla posterioro mente al construir la funcion
    */
    this.handleCountClick = this.handleCountClick.bind(this);
    this.handleResultClick = this.handleResultClick.bind(this);
    this.handleInputChanged = this.handleInputChanged.bind(this);
  }

  //Se ejecuta cuando el componente ya esta cargado
  componentDidMount() {
    this.setState({
      count: 1
    })
  }

  //NOTE TODAS LAS FUNCIONES QUE DESENCADENAN EVENTOS DEBE COMENZAR CON EL PREFIJO **handle**
  //funcion para calcular la nota
  handleResultClick(e){
    this.setState({
      resultado: this.state.numero1 + this.state.numero2
    })
  }

  /*
   * Funcion que se ejecuta cuando cambia el estado de los input,
   * se le pasa el evento el cual contiene el target del objeto
   * sobre el cual se estan realizando cambios
  */
  handleInputChanged(e){
    var accion = e.target.id;
    var valor = e.target.value;
    switch (accion) {
      case 'numero1':
        this.setState({
          numero1: Number(valor)
        });
        break;
      case 'numero2':
        this.setState({
          numero2: Number(valor)
        });
        break;
      default:
    }
  }

  /*
   * Funcion que se ejecuta cuando se aumenta, disminuye o reinicia el contador,
   * se le pasa el evento el cual contiene el target del objeto
   * sobre el cual se estan realizando cambios
  */
  handleCountClick(e) {
    var accion = e.target.id;
    switch (accion) {
      case 'add':
        this.setState({
          count: this.state.count + 1
        });
        break;
      case 'restar':
        if(this.state.count > 0){
          this.setState({
            count: this.state.count - 1
          });
        }
        break;
      case 'reset':
        this.setState({
          count: 0
        });
        break;
      default:
    }
  }

  render() {
    return (
      <div className="content">
        <h2>Counter: {this.state.count}</h2>
        <p>
          <button id="add" onClick={this.handleCountClick}>+</button>
          <button id="restar" onClick={this.handleCountClick}>-</button>
          <button id="reset" onClick={this.handleCountClick}>Reset</button>
        </p>
        <h2>Calcular:</h2>
        <p>
        {
         /*
          * Se inicializa el input con un valor del state y el onChange ejecuta la funcion
          * que actualiza el state valor que toma el input cada vez que se ejecuta
          */
        }
          <input id="numero1" type="number" value={this.state.numero1} onChange={this.handleInputChanged}/>
          +
          <input id="numero2" type="number" value={this.state.numero2} onChange={this.handleInputChanged}/>

          <button id="result" onClick={this.handleResultClick}>Calcular</button>
        </p>
        <h2>Resultato:{this.state.resultado}</h2>
      </div>
    );
  }
}

export default Content;
