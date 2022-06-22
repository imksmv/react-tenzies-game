import React from "react";
import Main from "./components/Main";
import "./App.css";

const App = () => {
    const [darkMode, setDarkMode] = React.useState(false);

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    return (
        <div className="wrapper">
            <Main darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>
    );
};

export default App;
