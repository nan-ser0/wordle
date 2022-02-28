import React from "react";
import Card from "./Card";

class Gameboard extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      word: [],
      class: `h-fit w-fit grid grid-cols-2 grid-cols-3 grid-cols-4 grid-cols-5 grid-cols-6 grid-flow-row gap-3`
    };
  }

  static getDerivedStateFromProps(props: any) {
    return {
      word: [
        ...props.word,
        ...Array(Math.pow(props.size, 2) - props.word.length),
      ].map((char, index) => {
        let state = "bg-gray";
        if (char) {
          switch (char.state) {
            case 0:
              state = "!bg-state-0";
              break;
            case 1:
              state = "!bg-state-1";
              break;
            case 2:
              state = "!bg-state-2";
              break;
            default:
              break;
          }
        }
        return (
          <Card key={index} classType={state} char={char ? char.value : ""} />
        );
      }),
      class: `h-fit w-fit grid grid-cols-${props.size} grid-flow-row gap-3`
    };
  }

  render() {
    return (
      <div className="Gameboard h-[562px] w-full lg:w-full-custom flex justify-center items-center">
        <div
          className={this.state.class}
        >
          {this.state.word}
        </div>
      </div>
    );
  }
}

export default Gameboard;
