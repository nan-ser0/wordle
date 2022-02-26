import React from 'react';
import '../styles/App.scss';

//* components
import Header from './Header';
import Gameboard from './Gameboard';
import Keyboard from './Keyboard';
import Key from './Key';

class App extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      words: [],
      wordInGame: '',
      dataIsLoaded: false,
      keys: [],
    }
    this.keyboardGen = this.keyboardGen.bind(this);
  }

  componentDidMount () {
    //! La url suministrada tiene una respuesta de tipo 'opaque', por lo que no es posible acceder al body
    //! el contenido de la url es guardada localmente en public/data/words.txt
    fetch('data/words.txt').then(response => {
      return response.text()
    }).then(data => {
      this.setState({
        //* creación de array con las palabras que tienen 5 caracteres
        words: data.split('\n').filter(word => {
          return word.length === 5
        }),
        dataIsLoaded: true
      });
      this.play()
    }).catch(error => {
      console.log('error!')
    });
  }

  play() {
    console.log('init play')
    const rdm = Math.floor(Math.random() * (this.state.words.length - 1));
    this.setState({
      wordInGame: this.state.words[rdm],
      keys: this.keyboardGen()
    });
  }

  keyboardGen(): any{
    const qwerty = [['Q','W','E','R','T','Y','U','I','O','P'],['A','S','D','F','G','H','J','K','L','Ñ'],['Z','X','C','V','B','N','M']];
    const qwertyKeys = qwerty.map((list, index) => {
      return (
        <div key={index}  className={"flex flex-row Keyboard__line-" + index}>
        {list.map(key => {
          return <Key key={key} label={key} />
        })}
        </div>
      )
    });
    return qwertyKeys;
  }

  render() {
    return (
      <div className='App flex flex-col items-center justify-center bg-gray-lighter h-screen w-screen dark:bg-d-gray-darker transition duration-500'>
        <Header />
        <Gameboard word={this.state.wordInGame}/>
        <Keyboard>
          {this.state.keys}
        </Keyboard>
      </div>
    )
  }
}

export default App
