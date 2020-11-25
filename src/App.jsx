import React, { Component } from "react";
import "./SCSS/App.scss";

// Drum-Mode Array
const drumModeArray = [
  {
    keyCode: 81,
    id: "Heater-1",
    keystroke: "Q",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyCode: 87,
    id: "Heater-2",
    keystroke: "W",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyCode: 69,
    id: "Heater-3",
    keystroke: "E",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyCode: 65,
    id: "Heater-4",
    keystroke: "A",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyCode: 83,
    id: "Clap",
    keystroke: "S",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },

  {
    keyCode: 90,
    id: "Open-HH",
    keystroke: "D",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },

  {
    keyCode: 88,
    id: "Kick-n'-Hat",
    keystroke: "Z",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },

  {
    keyCode: 67,
    id: "Kick",
    keystroke: "X",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },

  {
    keyCode: 81,
    id: "Closed-HH",
    keystroke: "C",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: drumModeArray,
      display: "",
    };
    this.displaytextLogicFunc = this.displaytextLogicFunc.bind(this);
  }

  displaytextLogicFunc(e) {
    this.setState({ display: e });
  }

  render() {
    const theMainRenderingConst = this.state.data.map((eachElement, i, mainArray) => {
      return (
        <Inner1
          audiosrc={eachElement.url}
          buttonTitle={eachElement.keystroke}
          displayLabel={eachElement.id}
          displaytextLogicFunc={this.displaytextLogicFunc}
        />
      );
    });

    return (
      <div className="appContainer">
        <div id="display">
          <div id="drum-machine">
            {theMainRenderingConst}
            <h3>{this.state.display}</h3>
          </div>
        </div>
      </div>
    );
  }
}
export default App;

class Inner1 extends Component {
  constructor() {
    super();

    this.playSound = this.playSound.bind(this);
    this.keyEventFunction = this.keyEventFunction.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.keyEventFunction);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyEventFunction);
  }

  playSound(e) {
    var soundSource = e.target.children[0];
    // this.setState({ display: e.target.id });
    soundSource.currentTime = 0;
    soundSource.play();
    // console.log(soundSource);
    this.props.displaytextLogicFunc(this.props.displayLabel);
  }

  keyEventFunction(e) {
    if (e.key.toUpperCase() === this.props.buttonTitle) {
      const keydownbuttontitle = this.props.buttonTitle;
      const buttonconst = document.getElementById(keydownbuttontitle);
      buttonconst.play();
    }
  }

  render() {
    return (
      <>
        <div className="drum-pad" onClick={this.playSound} id={this.props.displayLabel}>
          <audio src={this.props.audiosrc} className="clip" id={this.props.buttonTitle} />
          {this.props.buttonTitle}
        </div>
      </>
    );
  }
}
