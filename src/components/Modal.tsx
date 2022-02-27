import React from "react";
import Card from "./Card";

class Modal extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.buildWorld = this.buildWorld.bind(this);
  }

  buildWorld(word: string, i: number, state: number) {
    const arrayWord = word.split("");
    let stateIndex;
    return arrayWord.map((char, index) => {
      if (index === i) {
        stateIndex = "!bg-state-" + state;
      } else if (i === -1){
        stateIndex = "bg-gray-darker";
      } else {
        stateIndex = "bg-gray";
      }
      return <Card key={index} classType={stateIndex} char={char} />;
    });
  }
  render() {
    let modal, wordIngame;
    if (this.props.gameOver && !this.props.isWin) {
      const word = this.props.word.toString().replace(/,/g, '');
      wordIngame = (
        <div className="Modal__statistics-word text-dark dark:text-white">
          <p className="mb-4">la palabra era:</p>
          <div className="flex flex-row justify-center space-x-3 pb-6">
            {this.buildWorld(word, -1, 2)}
          </div>
        </div>
      );
    }
    if (this.props.statistics) {
      modal = (
        <div className="Modal__statistics flex flex-col justify-center items-center text-center">
          <h2 className="Modal__statistics-title uppercase font-extrabold text-4xl text-dark dark:text-white mb-7">
            Estadísticas
          </h2>
          <div className="Modal__statistics-score flex flex-row space-x-40">
            <div className="text-dark dark:text-white flex flex-col items-center">
              <div className="text-4xl extrabold">
                <Card classType={"bg-gray-darker"} char={this.props.games} />
              </div>
              <p className="text-xl my-4">Juagadas</p>
            </div>
            <div className="text-dark dark:text-white flex flex-col items-center">
              <div className="text-4xl extrabold">
              <Card classType={"bg-gray-darker"} char={this.props.victories} />
              </div>
              <p className="text-xl my-4">Victorias</p>
            </div>
          </div>
          {wordIngame}
          <div className="Modal__statistics-time text-dark dark:text-white">
            <p>siguiente palabra</p>
            <p>04:10</p>
          </div>
          {this.props.children}
        </div>
      );
    } else {
      modal = (
        <div className="Modal__instructions flex flex-col justify-center items-center text-center">
          <h2 className="Modal__instructions-title uppercase font-extrabold text-4xl text-dark dark:text-white  mb-7">
            Cómo Jugar
          </h2>
          <div className="Modal__instructions-content text-dark dark:text-white">
            <p>Adivina la palabra oculta en cinco intentos.</p>
            <p>Cada intento debe ser una palabra Válida de 5 letras.</p>
            <p>
              Despues de cada intento el color de las letras cambia para mostrar
              que tan cerca estás de acertar la palabra.
            </p>
          </div>
          <div className="Modal__instructions-example text-dark dark:text-white">
            <h3 className="my-5 font-semibold text-xl">Ejemplos</h3>
            <div className="flex flex-row justify-center space-x-3">
              {this.buildWorld("GATOS", 0, 2)}
            </div>
            <p className="my-4">
              La letra <span className="font-extrabold">G</span> está en la
              palabra y en la posición correcta.
            </p>
            <div className="flex flex-row justify-center space-x-3">
              {this.buildWorld("VOCAL", 2, 1)}
            </div>
            <p className="my-4">
              La letra <span className="font-extrabold">C</span> está en la
              palabra pero en la posición incorrecta.
            </p>
            <div className="flex flex-row justify-center space-x-3">
              {this.buildWorld("CANTO", 4, 0)}
            </div>
            <p className="my-4">
              La letra <span className="font-extrabold">O</span> no está en la
              palabra.
            </p>
            <p>
              Puede haber letras repetidas. las pistas son independientes para
              cada letra.
            </p>
          </div>
          {this.props.children}
        </div>
      );
    }
    return (
      <div className="Modal fixed w-full h-fit bg-white inset-1/2 rounded-2xl p-10 translate-y-[-50%] translate-x-[-50%] dark:bg-d-gray-darker">
        {modal}
      </div>
    );
  }
}

export default Modal;
