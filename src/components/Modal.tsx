import React from "react";

class Modal extends React.Component<any, any> {
  render() {
    return (
      <div className="Modal fixed w-full h-[300px] bg-white inset-1/2 rounded-2xl p-10 translate-y-[-50%] translate-x-[-50%] dark:bg-d-gray-darker">
        <div className="Modal__statistics flex flex-col justify-center items-center text-center">
          <h2 className="Modal__statistics-title uppercase font-extrabold text-4xl text-dark dark:text-white">Estadísticas</h2>
          <div className="Modal__statistics-score flex flex-row justify-between">
            <div className="text-dark dark:text-white">
              <div className="text-4xl extrabold">{this.props.games}</div>
              <p className="text-xl">Juagadas</p>
            </div>
            <div className="text-dark dark:text-white">
              <div className="text-4xl extrabold">{this.props.victories}</div>
              <p className="text-xl">Victorias</p>
            </div>
          </div>
          <div className="Modal__statistics-word text-dark dark:text-white">
            <p>la palabra era: {this.props.word}</p>
          </div>
          <div className="Modal__statistics-time text-dark dark:text-white">
            <p>siguiente palabra</p>
            <p>04:10</p>
          </div>
          <button className="text-dark dark:text-white">aceptar</button>
        </div>
      </div>
    );
  }
}

export default Modal;
