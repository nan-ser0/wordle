import React from "react";

class Gameboard extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      word: []
    }
  }

  static getDerivedStateFromProps(props: any) {
    return {
      word: props.word.split('').map( (char: String)=> {
        return <div className="w-[75px] h-[75px] bg-gray-darker flex justify-center items-center rounded uppercase">{char}</div>
      })
    }
  }

  createWord() {

  }

  render() {
    return (
      <div className="h-[562px] w-full flex justify-center items-center space-x-3">
        {this.state.word}
      </div>
    )
  }
}

export default Gameboard