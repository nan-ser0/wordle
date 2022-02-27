import React from "react";

class Card extends React.Component<any, any> {
  render() {
    return (
      <div
        className={`w-[75px] h-[75px] flex justify-center items-center rounded dark:bg-d-gray transition duration-500 ${this.props.classType}`}
      >
        <span className="text-4xl text-white font-extrabold">
          {this.props.char}
        </span>
      </div>
    );
  }
}

export default Card
