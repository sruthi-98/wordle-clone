import React from "react";
import './Keyboard.css'

const Keyboard = () => {
  return (
    <div className="keyboard">
      <div className="keyboard-row">
        <p className="keyboard-key" data-key="Q">Q</p>
        <p className="keyboard-key" data-key="W">W</p>
        <p className="keyboard-key" data-key="E">E</p>
        <p className="keyboard-key" data-key="R">R</p>
        <p className="keyboard-key" data-key="T">T</p>
        <p className="keyboard-key" data-key="Y">Y</p>
        <p className="keyboard-key" data-key="U">U</p>
        <p className="keyboard-key" data-key="I">I</p>
        <p className="keyboard-key" data-key="0">O</p>
        <p className="keyboard-key" data-key="P">P</p>
      </div>
      <div className="keyboard-row">
        <p className="keyboard-key" data-key="A">A</p>
        <p className="keyboard-key" data-key="S">S</p>
        <p className="keyboard-key" data-key="D">D</p>
        <p className="keyboard-key" data-key="F">F</p>
        <p className="keyboard-key" data-key="G">G</p>
        <p className="keyboard-key" data-key="H">H</p>
        <p className="keyboard-key" data-key="J">J</p>
        <p className="keyboard-key" data-key="K">K</p>
        <p className="keyboard-key" data-key="L">L</p>
      </div>
      <div className="keyboard-row">
        <p className="keyboard-key large" data-key="Enter">ENTER</p>
        <p className="keyboard-key" data-key="Z">Z</p>
        <p className="keyboard-key" data-key="X">X</p>
        <p className="keyboard-key" data-key="C">C</p>
        <p className="keyboard-key" data-key="V">V</p>
        <p className="keyboard-key" data-key="B">B</p>
        <p className="keyboard-key" data-key="N">N</p>
        <p className="keyboard-key" data-key="M">M</p>
        <p className="keyboard-key large" data-key="Backspace">DEL</p>
      </div>
    </div>
  );
};

export default Keyboard;
