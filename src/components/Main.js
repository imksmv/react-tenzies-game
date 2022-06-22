import React from "react";
import "./Main.css";

const Main = (props) => {
    return (
        <seciton
            className={
                props.darkMode ? "darkContainer__inner" : "container__inner"
            }
        >
            <div
                className={props.darkMode ? "darkToggleMode" : "toggleMode"}
                onClick={props.toggleDarkMode}
            >
                {props.darkMode ? "Light" : "Dark"}
            </div>
            <div className="head">
                <h1 class="head__title">Tenzies</h1>
                <p className="head__description">
                    Roll until all dice are the same. Click each die to freeze
                    it at its current value between rolls.
                </p>
            </div>
            <div className="boxes">
                <div className={props.darkMode ? "darkBox" : "box"}></div>
                <div className={props.darkMode ? "darkBox" : "box"}></div>
                <div className={props.darkMode ? "darkBox" : "box"}></div>
                <div className={props.darkMode ? "darkBox" : "box"}></div>
                <div className={props.darkMode ? "darkBox" : "box"}></div>
                <div className={props.darkMode ? "darkBox" : "box"}></div>
                <div className={props.darkMode ? "darkBox" : "box"}></div>
                <div className={props.darkMode ? "darkBox" : "box"}></div>
                <div className={props.darkMode ? "darkBox" : "box"}></div>
                <div className={props.darkMode ? "darkBox" : "box"}></div>
            </div>
            <div className="button__container">
                <button className="button">Roll</button>
            </div>
        </seciton>
    );
};

export default Main;
