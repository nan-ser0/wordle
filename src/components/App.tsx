import React from "react";
import "../styles/App.scss";

//* components
import Header from "./Header";
import Gameboard from "./Gameboard";
import Keyboard from "./Keyboard";
import Key from "./Key";
import Modal from "./Modal";

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      charsInWord: 5, //* se puede cambiar entre un valor de 2 a 6
      words: [],
      usedWords: [],
      wordInGame: [],
      wordToCompare: [],
      wordsW: [],
      time: 0,
      maxTime: 300,
      hits: 0,
      lifes: 5,
      games: 0,
      victories: 0,
      win: false,
      gameOver: false,
      dataIsLoaded: false,
      keys: [],
      developShow: false,
      showModal: false,
      showStatistics: false,
    };

    this.keyPress = this.keyPress.bind(this);
    this.keyboardGen = this.keyboardGen.bind(this);
    this.compareWords = this.compareWords.bind(this);
    this.play = this.play.bind(this);
    this.showModal = this.showModal.bind(this);
    this.showDevelopmentModal = this.showDevelopmentModal.bind(this);
    this.clearStorage = this.clearStorage.bind(this);
  }

  private timer: any;
  private actualWord: string = "";

  componentDidMount() {
    if (localStorage.length <= 0) {
      this.populateStorage();
      this.showModal(false);
    } else {
      this.syncData();
    }

    this.timer = setInterval(() => this.tick(), 1000);

    //! La url suministrada tiene una respuesta de tipo 'opaque', por lo que no es posible acceder al body
    //! el contenido de la url es guardada localmente en public/data/words.txt
    fetch("data/words.txt")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        //* creación de array con las palabras que tienen 5 caracteres
        const dataT = data.split("\n").filter((word) => {
          return word.length === this.state.charsInWord;
        });
        if (dataT.length <= 0) {
          console.log("no hay palabras!");
        } else {
          this.setState({
            words: dataT,
            dataIsLoaded: true,
            keys: this.keyboardGen(),
          });
          this.play();
        }
      })
      .catch((error) => {
        console.log("getting data error! ", error);
      });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    document.removeEventListener("keypress", this.keyPress);
  }

  tick() {
    if (this.state.time >= this.state.maxTime) {
      this.play();
    }
    this.setState({
      time: this.state.time + 1,
    });
  }

  populateStorage() {
    localStorage.setItem("games", "0");
    localStorage.getItem("games");
    localStorage.setItem("victories", "0");
    localStorage.getItem("victories");
    localStorage.setItem("usedwords", "aaaaa");
    localStorage.getItem("usedwords");
    this.syncData();
  }

  syncData() {
    const games = localStorage.getItem("games");
    const victories = localStorage.getItem("victories");
    const usedWords = localStorage.getItem("usedwords")?.split(",");
    this.setState({
      games: games !== null ? parseInt(games) : 0,
      victories: victories !== null ? parseInt(victories) : 0,
      usedWords: usedWords,
    });
  }

  clearStorage() {
    localStorage.clear();
    window.location.reload();
  }

  keyPress(e: any) {
    let charCode = e.which ? e.which : e.keyCode;
    if (
      (charCode < 65 || charCode > 90) &&
      (charCode < 97 || charCode > 122) &&
      charCode !== 241 &&
      charCode !== 209
    ) {
      return false;
    }
    this.compareWords(String.fromCharCode(charCode).toUpperCase());
  }

  play() {
    document.removeEventListener("keypress", this.keyPress);
    document.addEventListener("keypress", this.keyPress);
    const selectedWord = this.selectWord();
    this.setState({
      wordInGame: selectedWord.split(""),
      wordToCompare: [],
      wordsW: [],
      time: 0,
      hits: 0,
      lifes: this.state.charsInWord,
      win: false,
      gameOver: false,
    });
  }

  selectWord(): any {
    const rdm = Math.floor(Math.random() * (this.state.words.length - 1));
    const word = this.state.words[rdm]
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .toUpperCase();
    const wordExists = this.state.usedWords.filter((w: string) => {
      return w === word;
    });
    if (wordExists.length > 0) {
      if (this.state.usedWords.lenght === this.state.words.lenght) {
        console.log("no hay mas palabras nuevas");
      } else {
        return this.selectWord();
      }
    } else {
      this.actualWord = word;
      this.setState({
        usedWords: [...this.state.usedWords, this.actualWord],
      });
      return word;
    }
  }

  compareWords(char: string) {
    const correctChart = this.state.wordInGame[this.state.wordToCompare.length];
    const charObj = {
      value: char,
      state: 0,
    };
    if (correctChart === char) {
      charObj.state = 2;
      this.setState({
        hits: this.state.hits + 1,
      });
    } else {
      const charInWord = this.state.wordInGame.filter((charElem: string) => {
        return charElem === char;
      });
      if (charInWord.length > 0) {
        charObj.state = 1;
      } else {
        charObj.state = 0;
      }
    }

    if (this.state.wordToCompare.length < this.state.charsInWord - 1) {
      this.setState({
        wordToCompare: [...this.state.wordToCompare, charObj],
        wordsW: [...this.state.wordsW, charObj],
      });
    } else if (this.state.wordToCompare.length === this.state.charsInWord - 1) {
      this.setState({
        wordToCompare: [...this.state.wordToCompare, charObj],
        wordsW: [...this.state.wordsW, charObj],
      });
      if (this.state.hits >= this.state.charsInWord && charObj.state === 2) {
        this.win();
      } else {
        this.lose();
      }
    }
  }

  win() {
    document.removeEventListener("keypress", this.keyPress);
    localStorage.setItem(
      "usedwords",
      [...this.state.usedWords].toString()
    );
    localStorage.setItem(
      "victories",
      JSON.stringify(parseInt(this.state.victories) + 1)
    );
    localStorage.setItem(
      "games",
      JSON.stringify(parseInt(this.state.games) + 1)
    );
    this.setState({
      games: this.state.games + 1,
      victories: this.state.victories + 1,
      win: true,
      gameOver: true,
    });
    this.showModal(true);
  }

  lose() {
    this.setState({
      lifes: this.state.lifes - 1,
      win: false,
    });
    if (this.state.lifes <= 0) {
      document.removeEventListener("keypress", this.keyPress);
      localStorage.setItem(
        "games",
        JSON.stringify(parseInt(this.state.games) + 1)
      );
      this.setState({
        games: this.state.games + 1,
        gameOver: true,
      });
      this.showModal(true);
      return;
    }
    this.setState({
      wordToCompare: [],
      hits: 0,
    });
  }

  keyboardGen(): any {
    const qwerty = [
      ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
      ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
      ["Z", "X", "C", "V", "B", "N", "M"],
    ];
    const qwertyKeys = qwerty.map((list, index) => {
      return (
        <div key={index} className={"flex flex-row Keyboard__line-" + index}>
          {list.map((key) => {
            return <Key key={key} label={key} onClick={this.compareWords} />;
          })}
        </div>
      );
    });
    return qwertyKeys;
  }

  showModal(type: boolean, consulting: boolean = false) {
    this.setState({
      showModal: !this.state.showModal,
      showStatistics: type,
    });
    if (consulting && this.state.gameOver && !this.state.win) {
      this.setState({
        win: false,
      });
    }
  }

  showDevelopmentModal() {
    this.setState({
      developShow: !this.state.developShow,
    });
  }

  render() {
    let modal, developmentModal;
    if (this.state.showModal) {
      modal = (
        <div className="Curtain fixed inset-0 w-screen h-screen bg-gray/50 dark:bg-d-gray/90">
          <Modal
            games={this.state.games}
            victories={this.state.victories}
            word={this.state.wordInGame}
            statistics={this.state.showStatistics}
            isWin={this.state.win}
            gameOver={this.state.gameOver}
            time={this.state.time}
            maxTime={this.state.maxTime}
          >
            <button
              onClick={() => this.showModal(false)}
              className="text-white bg-state-2 rounded h-[50px] w-[263px] mt-5 text-xl hover:bg-state-2/80 animation duration-500"
            >
              {this.state.showStatistics ? "Aceptar" : "¡Jugar!"}
            </button>
          </Modal>
        </div>
      );
    }
    if (this.state.developShow) {
      developmentModal = (
        <div className="fixed inset-5 w-fit h-fit text-dark bg-gray p-5 rounded-2xl">
          <h2 className="text-2xl font-semibold mb-6">
            DEVELOPMENT STATISTICS
          </h2>
          Time: {this.state.time}s<br></br>
          <br></br>
          Selected word: {this.state.wordInGame}
          <br></br>
          Word to compare:{" "}
          {this.state.wordToCompare.map((char: any) => {
            return char.value;
          })}
          <br></br>
          Hits: {this.state.hits}
          <br></br>
          Lifes: {this.state.lifes}
          <br></br>
          Games: {this.state.games}
          <br></br>
          Victories: {this.state.victories}
          <br></br>
          win? {this.state.win ? "yes" : "no"}
          <br></br>
          gameOver? {this.state.gameOver ? "yes" : "no"}
          <br></br>
          <button
            onClick={this.clearStorage}
            className="bg-state-1 text-white p-2 mt-4 rounded hover:bg-state-1/80 animation duration-500"
          >
            Clear Storage & restart
          </button>
          <br></br>
          <button
            onClick={this.play}
            className="bg-state-2 text-white p-2 mt-4 rounded hover:bg-state-2/80 animation duration-500"
          >
            Start game
          </button>
        </div>
      );
    }
    return (
      <>
        <div className="App flex flex-col items-center justify-center bg-gray-lighter h-screen w-screen dark:bg-d-gray-darker transition duration-500">
          <Header>
            <div className="flex flex-row space-x-2">
              <div
                onClick={() => this.showModal(false)}
                className="cursor-pointer"
              >
                <svg
                  width="27"
                  height="27"
                  viewBox="0 0 27 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="fill-dark dark:fill-white transition duration-500"
                    d="M27 13.5C27 17.0804 25.5777 20.5142 23.0459 23.0459C20.5142 25.5777 17.0804 27 13.5 27C9.91958 27 6.4858 25.5777 3.95406 23.0459C1.42232 20.5142 0 17.0804 0 13.5C0 9.91958 1.42232 6.4858 3.95406 3.95406C6.4858 1.42232 9.91958 0 13.5 0C17.0804 0 20.5142 1.42232 23.0459 3.95406C25.5777 6.4858 27 9.91958 27 13.5ZM9.2745 10.1807H10.6667C10.8996 10.1807 11.0852 9.99 11.1156 9.75881C11.2674 8.65181 12.0268 7.84519 13.3802 7.84519C14.5378 7.84519 15.5976 8.424 15.5976 9.81619C15.5976 10.8877 14.9664 11.3805 13.9691 12.1298C12.8334 12.9549 11.934 13.9185 11.9981 15.4828L12.0032 15.849C12.005 15.9597 12.0502 16.0653 12.1291 16.143C12.208 16.2206 12.3143 16.2641 12.4251 16.2641H13.7936C13.9055 16.2641 14.0128 16.2197 14.0919 16.1406C14.1711 16.0614 14.2155 15.9541 14.2155 15.8422V15.6651C14.2155 14.4534 14.6762 14.1007 15.9199 13.1574C16.9476 12.3761 18.0191 11.5087 18.0191 9.68794C18.0191 7.13813 15.8659 5.90625 13.5084 5.90625C11.3704 5.90625 9.02812 6.90187 8.86781 9.76388C8.8655 9.81837 8.87436 9.87276 8.89385 9.92371C8.91334 9.97465 8.94305 10.0211 8.98114 10.0601C9.01923 10.0992 9.06491 10.13 9.11536 10.1507C9.1658 10.1715 9.21996 10.1817 9.2745 10.1807ZM13.1979 21.0532C14.2273 21.0532 14.9344 20.3884 14.9344 19.4889C14.9344 18.5574 14.2256 17.9027 13.1979 17.9027C12.2124 17.9027 11.4952 18.5574 11.4952 19.4889C11.4952 20.3884 12.2124 21.0532 13.1996 21.0532H13.1979Z"
                  />
                </svg>
              </div>

              <div
                onClick={() => this.showModal(true, true)}
                className="cursor-pointer"
              >
                <svg
                  width="27"
                  height="27"
                  viewBox="0 0 27 27"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="fill-dark dark:fill-white transition duration-500"
                    cx="13.5"
                    cy="13.5"
                    r="13.5"
                  />
                  <path
                    className="fill-white dark:fill-dark transition duration-500"
                    d="M13.5,19.5L13.5,19.5c-0.6,0-1-0.4-1-1v-5.1c0-0.6,0.4-1,1-1h0c0.6,0,1,0.4,1,1v5.1
                    C14.5,19.1,14,19.5,13.5,19.5z"
                  />
                  <path
                    className="fill-white dark:fill-dark transition duration-500"
                    d="M8.5,19.5L8.5,19.5c-0.6,0-1-0.4-1-1v-8.1c0-0.6,0.4-1,1-1h0c0.6,0,1,0.4,1,1v8.1C9.5,19.1,9,19.5,8.5,19.5z"
                  />
                  <path
                    className="fill-white dark:fill-dark transition duration-500"
                    d="M18.5,19.5L18.5,19.5c-0.6,0-1-0.4-1-1v-10c0-0.6,0.4-1,1-1h0c0.6,0,1,0.4,1,1v10C19.5,19.1,19,19.5,18.5,19.5z
                    "
                  />
                </svg>
              </div>
            </div>
          </Header>
          <Gameboard word={this.state.wordsW} size={this.state.charsInWord} />
          <Keyboard>{this.state.keys}</Keyboard>
        </div>
        {modal}
        <div
          onClick={this.showDevelopmentModal}
          className="fixed inset-0 bg-dark w-[16px] h-[16px] cursor-pointer"
        ></div>
        {developmentModal}
      </>
    );
  }
}

export default App;
