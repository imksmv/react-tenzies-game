import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import "./App.css";

const App = () => {
    const [dice, setDice] = React.useState(allNewDice());
    const [tenzies, setTenzies] = React.useState(false);
    const [darkMode, setDarkMode] = React.useState(false);

    React.useEffect(() => {
        const allHeld = dice.every((die) => die.isHeld);
        const firstNum = dice[0].value;
        const allSameValue = dice.every((die) => die.value === firstNum);
        if (allHeld && allSameValue) {
            setTenzies(true);
            console.log("Hell Yeah!");
        }
    }, [dice]);

    function toggleDarkMode() {
        setDarkMode((oldMode) => !oldMode);
    }

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
        } else {
            setTenzies(false);
            setDice(allNewDice());
        }
    }

    function allNewDice() {
        const newDice = [];
        for (let i = 0; i < 10; i++) {
            const rng = Math.ceil(Math.random() * 6);
            newDice.push({ id: nanoid(), value: rng, isHeld: false });
        }
        return newDice;
    }

    function holdDice(id) {
        setDice((oldDice) =>
            oldDice.map((die) => {
                return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
            })
        );
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
                    height="400px"
                    width="438.39px"
                    gravity={0.03}
                    numberOfPieces={350}
                    recycle={false}
                />
            )}
            <h1 className={darkMode ? "darkTitle" : "title"}>Tenzies</h1>
            <p className={darkMode ? "darkInstructions" : "instructions"}>
                Roll until all dice are the same. Click each die to freeze it at
                its current value between rolls.
            </p>
            <div className="dice">{diceElements}</div>
            <button className={darkMode ? "darkRoll" : "roll"} onClick={reRoll}>
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    );
};

export default App;
