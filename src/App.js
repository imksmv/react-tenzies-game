import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import "./App.css";

const App = () => {
    const [dice, setDice] = React.useState(allNewDice());
    const [tenzies, setTenzies] = React.useState(false);
    const [darkMode, setDarkMode] = React.useState(false);
    const [numClicked, setNumClicked] = React.useState(0);
    const [time, setTime] = React.useState(0);
    const [running, setRunning] = React.useState(false);

    const minutes = ("0" + Math.floor((time / 60000) % 60)).slice(-2);
    const seconds = ("0" + Math.floor((time / 1000) % 60)).slice(-2);
    const timeCount = `${minutes}:${seconds}`;

    const [highscore, setHighscore] = React.useState(
        () => JSON.parse(localStorage.getItem("highscore")) || []
    );
    React.useEffect(() => {
        localStorage.setItem("highscore", JSON.stringify(highscore));
    }, [highscore]);

    React.useEffect(() => {
        if (tenzies) {
            if (timeCount < highscore || highscore.length === 0) {
                setHighscore(timeCount);
            }
        }
    }, [tenzies, highscore, timeCount]);

    //======================================== StopWatch
    React.useEffect(() => {
        let interval;
        if (running) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        }
        return () => clearInterval(interval);
    }, [running]);
    //======================================== Checks the winning condition
    React.useEffect(() => {
        const allHeld = dice.every((die) => die.isHeld);
        const firstNum = dice[0].value;
        const allSameValue = dice.every((die) => die.value === firstNum);
        if (allHeld && allSameValue) {
            setTenzies(true);
            setRunning(false);
        }
    }, [dice]);

    function allNewDice() {
        const newDice = [];
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie());
        }
        return newDice;
    }
    const diceElements = dice.map((die) => (
        <Die
            value={die.value}
            key={die.id}
            isHeld={die.isHeld}
            handleClick={() => holdDice(die.id)}
            darkMode={darkMode}
        />
    ));

    function generateNewDie() {
        return {
            id: nanoid(),
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
        };
    }

    function reRoll() {
        if (!tenzies) {
            setDice((oldDice) =>
                oldDice.map((die) => {
                    return die.isHeld ? die : generateNewDie();
                })
            );
            setNumClicked((oldNumber) => oldNumber + 1);
            setRunning(true);
        } else {
            setTime(0);
            setTenzies(false);
            setDice(allNewDice());
            setNumClicked(0);
        }
    }

    function holdDice(id) {
        if (!tenzies) {
            setDice((oldDice) =>
                oldDice.map((die) => {
                    return die.id === id
                        ? { ...die, isHeld: !die.isHeld }
                        : die;
                })
            );
            setRunning(true);
        }
    }

    const styles = {
        color: tenzies ? "var(--green)" : "",
    };

    function toggleDarkMode() {
        setDarkMode((oldMode) => !oldMode);
    }

    return (
        <main className={darkMode ? "darkMain" : "main"}>
            <button
                className={darkMode ? "dark-mode" : "light-mode"}
                onClick={toggleDarkMode}
            >
                {darkMode ? "🌞" : "🌑"}
            </button>
            {tenzies && (
                <Confetti
                    height="448px"
                    width="390.39px"
                    gravity={0.03}
                    numberOfPieces={500}
                    recycle={false}
                />
            )}
            <h1 className={darkMode ? "darkTitle" : "title"}>Tenzies</h1>
            <p className={darkMode ? "darkInstructions" : "instructions"}>
                Roll until all dice are the same. Click each die to freeze it at
                its current value between rolls.
            </p>
            <div className="dice">{diceElements}</div>
            <div className={darkMode ? "darkButtonAside" : "buttonAside"}>
                <button
                    className={darkMode ? "darkRoll" : "roll"}
                    onClick={reRoll}
                >
                    {tenzies ? "New Game" : "Roll"}
                </button>
                <div className="stats">
                    <span className="time">
                        Time:{" "}
                        <span className="time__number" style={styles}>
                            {timeCount}
                        </span>
                    </span>
                    <span className="numRolls">
                        Number of rolls:
                        <span className="numRolls__number" style={styles}>
                            {" "}
                            {numClicked}
                        </span>
                    </span>
                    <span className="highscore">
                        Highscore:
                        <span className="highscore__number" style={styles}>
                            {" "}
                            {highscore}
                        </span>
                    </span>
                </div>
            </div>
        </main>
    );
};

export default App;
