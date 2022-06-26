import React from "react";
import "./Die.css";

const Die = (props) => {
    const styles = {
        backgroundColor: props.isHeld ? "var(--green)" : "var(--white)",
    };

    return (
        <div className="die__face" style={styles} onClick={props.handleClick}>
            {props.value === 1 && (
                <div className="dice__pattern">
                    <span className="die__dot die__dot--5"></span>
                </div>
            )}
            {props.value === 2 && (
                <div className="dice__pattern">
                    <span className="die__dot die__dot--3"></span>
                    <span className="die__dot die__dot--7"></span>
                </div>
            )}
            {props.value === 3 && (
                <div className="dice__pattern">
                    <span className="die__dot die__dot--3"></span>
                    <span className="die__dot die__dot--5"></span>
                    <span className="die__dot die__dot--7"></span>
                </div>
            )}
            {props.value === 4 && (
                <div className="dice__pattern">
                    <span className="die__dot die__dot--1"></span>
                    <span className="die__dot die__dot--3"></span>
                    <span className="die__dot die__dot--7"></span>
                    <span className="die__dot die__dot--9"></span>
                </div>
            )}
            {props.value === 5 && (
                <div className="dice__pattern">
                    <span className="die__dot die__dot--1"></span>
                    <span className="die__dot die__dot--3"></span>
                    <span className="die__dot die__dot--5"></span>
                    <span className="die__dot die__dot--7"></span>
                    <span className="die__dot die__dot--9"></span>
                </div>
            )}
            {props.value === 6 && (
                <div className="dice__pattern">
                    <span className="die__dot die__dot--1"></span>
                    <span className="die__dot die__dot--3"></span>
                    <span className="die__dot die__dot--4"></span>
                    <span className="die__dot die__dot--6"></span>
                    <span className="die__dot die__dot--7"></span>
                    <span className="die__dot die__dot--9"></span>
                </div>
            )}
        </div>
    );
};

export default Die;
