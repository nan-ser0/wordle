import React from "react";
import Card from './Card';

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
        let state = 'bg-gray';
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
        return <Card key={index} classType={state} char={char ? char.value: ''} />
      })
    }
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