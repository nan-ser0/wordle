import React from 'react';

class Keyboard extends React.Component {
  render() {
    return (
      <div className='Keyboard flex flex-col items-center bg-gray w-full lg:w-full-custom h-fit lg:rounded-2xl px-14 py-8 dark:bg-d-gray transition duration-500'>
        {this.props.children}
      </div>
    )
  }
}

export default Keyboard