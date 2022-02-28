import React from "react";

class Header extends React.Component<any, any> {
  constructor(props:any) {
    super(props)
    this.state = {
      posX: 0,
      classToggle: `w-[27px] h-[27px] bg-gray-lighter dark:bg-d-gray-lighter border border-solid border-dark dark:border-gray-lighter rounded-full absolute inset-0 transition duration-500`
    }

    this.toggleMode = this.toggleMode.bind(this)
  }
  toggleMode() {
    const root = document.getElementsByTagName( 'html' )[0];
    root.classList.toggle('dark');
    this.setState({
      posX: this.state.posX === 0 ? 100 : 0,
      classToggle: this.state.posX === 0 ? `w-[27px] h-[27px] bg-gray-lighter dark:bg-d-gray-lighter border border-solid border-dark dark:border-gray-lighter rounded-full absolute inset-0 transition duration-500 translate-x-[100%]` : `w-[27px] h-[27px] bg-gray-lighter dark:bg-d-gray-lighter border border-solid border-dark dark:border-d-gray-lighter rounded-full absolute inset-0 transition duration-500 translate-x-[0]`
    })
  };
  render() {
    return (
      <div className="Header flex items-center justify-between bg-gray w-full lg:w-full-custom h-[84px] lg:rounded-2xl px-6 lg:px-12 lg:py-4 dark:bg-d-gray transition duration-500">
        <div className="Header__instructions">
          {this.props.children}
        </div>
        <h1 className="Header__title text-3xl lg:text-5xl text-dark font-semibold dark:text-white transition duration-500">
          WORDLE
        </h1>
        <div className="Header__theme-mode">
          <button onClick={this.toggleMode} className="bg-dark dark:bg-gray-lighter w-[54px] h-[27px] rounded-[27px] relative transition duration-500">
            <div className={this.state.classToggle}></div>
          </button>
        </div>
      </div>
    )
  }
}

export default Header