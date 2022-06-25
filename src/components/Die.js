import React from "react";

const Die = (props) => {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "#fff",
    };

    return (
        <div className="die__face" style={styles} onClick={props.handleClick}>
            <h2 className="die__num">{props.value}</h2>
        </div>
    );
};

export default Die;
