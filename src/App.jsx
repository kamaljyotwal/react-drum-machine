import React, { Component } from "react";
import "./SCSS/App.css";

const drumArray = [
  {
    soundBanner: "Heater-1",
    keystroke: "Q",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    soundBanner: "Heater-2",
    keystroke: "W",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    soundBanner: "Heater-3",
    keystroke: "E",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    soundBanner: "Heater-4",
    keystroke: "A",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    soundBanner: "Clap",
    keystroke: "S",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },

  {
    soundBanner: "Open-HH",
    keystroke: "D",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },

  {
    soundBanner: "Kick-n'-Hat",
    keystroke: "Z",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },

  {
    soundBanner: "Kick",
    keystroke: "X",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },

  {
    soundBanner: "Closed-HH",
    keystroke: "C",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

const pianoArray = [
  {
    keystroke: "Q",
    soundBanner: "Chord-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
  },
  {
    keystroke: "W",
    soundBanner: "Chord-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
  },
  {
    keystroke: "E",
    soundBanner: "Chord-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
  },
  {
    keystroke: "A",
    soundBanner: "Shaker",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
  },
  {
    keystroke: "S",
    soundBanner: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
  },
  {
    keystroke: "D",
    soundBanner: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
  },
  {
    keystroke: "Z",
    soundBanner: "Punchy-Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
  },
  {
    keystroke: "X",
    soundBanner: "Side-Stick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
  },
  {
    keystroke: "C",
    soundBanner: "Snare",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
  },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      power: true,
      data: drumArray,
      display: "",
      styletoggler: "",
    };

    this.displaytextLogicFunc = this.displaytextLogicFunc.bind(this);
    this.powerOff = this.powerOff.bind(this);
    this.bankChange = this.bankChange.bind(this);
  }

  displaytextLogicFunc(e) {
    this.setState({ display: e });
  }

  powerOff() {
    this.setState({ power: !this.state.power, display: "" });
  }

  bankChange() {
    // if (this.state.data == drumArray) {
    //   this.setState({ data: pianoArray });
    // }
    // this.setState({ data: drumArray });
    if (this.state.data == drumArray) {
      this.setState({ data: pianoArray, display: "Piano Kit" });
    } else {
      this.setState({
        data: drumArray,
        display: "Drum Kit",
      });
    }
  }

  render() {
    const theMainRenderingConst = this.state.data.map((eachElement, i, mainArray) => {
      return (
        <Inner1
          power={this.state.power}
          audiosrc={eachElement.url}
          buttonTitle={eachElement.keystroke}
          displayLabel={eachElement.soundBanner}
          displaytextLogicFunc={this.displaytextLogicFunc}
        />
      );
    });

    const spanStyle = {
      float: "left",
    };
    const spanStyleforBank = {
      float: "left",
    };

    const toggleContainer = {};

    if (this.state.power) {
      spanStyle.float = "right";
      toggleContainer.backgroundColor = "rgba(35, 77, 216, 0.726)";
      toggleContainer.transition = "all 500ms linear";
    }

    if (this.state.data == pianoArray) {
      spanStyleforBank.float = "right";
    }
    if (this.state.data == drumArray) {
      spanStyleforBank.float = "left";
    }

    return (
      <div id="display">
        <div id="drum-machine">
          <div className="appArea">{theMainRenderingConst}</div>
          <div className="displayArea">
            {/* <button onClick={this.powerOff}>power</button> */}

            {/* toggler here */}
            <p>power</p>
            <div class="inner-container" onClick={this.powerOff} style={toggleContainer}>
              <span id="slider" style={spanStyle} onClick={this.togglefunc}></span>
            </div>
            {/*-------  */}

            <div className="displayScreen">{this.state.display}</div>

            {/* bank change */}
            <p>Bank</p>
            <p>power</p>
            <div
              class="inner-container"
              onClick={this.bankChange}
              // style={toggleContainer}
            >
              <span id="slider" style={spanStyleforBank}></span>
            </div>
            {/* ------ */}
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
    if (this.props.power) {
      var soundSource = e.target.children[0];
      soundSource.currentTime = 0;
      soundSource.play();
      this.props.displaytextLogicFunc(this.props.displayLabel);
    }
  }

  keyEventFunction(e) {
    if (this.props.power) {
      if (e.key.toUpperCase() === this.props.buttonTitle) {
        const keydownbuttontitle = this.props.buttonTitle;
        const buttonconst = document.getElementById(keydownbuttontitle);
        buttonconst.play();
        this.props.displaytextLogicFunc(this.props.displayLabel);
      }
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
