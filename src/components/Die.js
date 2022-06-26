import React from "react";
import "./Die.css";

const Die = (props) => {
    const styles = {
        backgroundColor: props.isHeld ? "var(--green)" : "var(--white)",
    };

    return (
        <div className="die__face" style={styles} onClick={props.handleClick}>
            <h2 className="die__num">{props.value}</h2>
        </div>
    );
};

export default Die;
