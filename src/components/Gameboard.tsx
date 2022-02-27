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
      word: [...props.word,...Array(25 - props.word.length)].map( (char, index) => {
        let state = 'bg-gray'; //char ? `bg-state-${char.state}` : `bg-gray`;
        if(char) {
          switch (char.state) {
            case 0:
              state = "!bg-state-0"
              break;
            case 1:
              state = "!bg-state-1"
              break;
            case 2:
              state = "!bg-state-2"
              break;
            default:
              break;
          }
        }
        return <div key={index} className={`w-[75px] h-[75px] flex justify-center items-center rounded dark:bg-d-gray transition duration-500 ${state}`}>
          <span className="text-4xl text-white font-extrabold">{char ? char.value: ''}</span>
        </div>
      })
    }
  }

  createWord() {

  }

  render() {
    return (
      <div className="Gameboard h-[562px] w-full flex justify-center items-center">
        <div className="h-fit w-fit grid grid-cols-5 grid-flow-row gap-3">
          {this.state.word}
        </div>
      </div>
    )
  }
}

export default Gameboard