import React from 'react'

class Key extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.getChar = this.getChar.bind(this);
  }

  getChar() {
    this.props.onClick(this.props.label)
  }

  render() {
    return (
      <button onClick={this.getChar} className='Key group flex justify-center items-center bg-gray-darker w-[45px] h-[50px] rounded m-1.5 cursor-pointer dark:bg-d-gray-lighter hover:bg-dark dark:hover:bg-dark transition duration-500'>
        <span className='Key__label text-dark font-semibold dark:text-white group-hover:text-white transition duration-500'>{this.props.label}</span>
      </button>
    )
  }
}

export default Key