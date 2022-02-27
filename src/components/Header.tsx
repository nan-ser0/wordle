import React from "react";

class Header extends React.Component<any, any> {
  // constructor(props: any) {
  //   super(props);
  //   this.toggleMode = this.toggleMode.bind(this);
  // }
  toggleMode() {
    const root = document.getElementsByTagName( 'html' )[0];
    root.classList.toggle('dark');
  };
  render() {
    return (
      <div className="Header flex items-center justify-between bg-gray w-full-custom h-[84px] rounded-2xl px-12 py-4 dark:bg-d-gray transition duration-500">
        <div className="Header__instructions">
          {/* <img className="Header__instructions-icon" src="assets/icons/instructions.svg" alt="" /> */}
          {this.props.children}
        </div>
        <h1 className="Header__title text-5xl text-dark font-semibold dark:text-white transition duration-500">
          WORDLE
        </h1>
        <div className="Header__theme-mode">
          <button onClick={this.toggleMode}>mode</button>
        </div>
      </div>
    )
  }
}

export default Header