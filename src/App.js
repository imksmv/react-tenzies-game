import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

const App = () => {
    const [dice, setDice] = React.useState(allNewDice());
    const [tenzies, setTenzies] = React.useState(false);

    React.useEffect(() => {
        const allHeld = dice.every((die) => die.isHeld);
        const firstNum = dice[0].value;
        const allSameValue = dice.every((die) => die.value === firstNum);
        if (allHeld && allSameValue) {
            setTenzies(true);
            console.log("Hell Yeah!");
        }
    }, [dice]);

    function generateNewDie() {
        return {
            id: nanoid(),
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
        };
    }

    const reRoll = () => {
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
    };

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
        />
    ));

    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">
                Roll until all dice are the same. Click each die to freeze it at
                its current value between rolls.
            </p>
            <div className="dice__container">{diceElements}</div>
            <button onClick={reRoll}>{tenzies ? "New Game" : "Roll"}</button>
        </main>
    );
};

export default App;
