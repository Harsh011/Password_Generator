import { useState } from "react";
import "./App.css";
import usePasswordGenerator from "./Hooks/use-password-generator";
import PasswordStrengthIndicator from "./components/strengthChecker";
import Button from "./components/Button";
import Checkbox from "./components/Checkbox";

function App() {
  const [length, setLength] = useState(4);
  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false },
  ]);
  const [copied, setCopied] = useState(false);

  const handleCheckboxChange = (i) => {
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[i].state = !updatedCheckboxData[i].state;
    setCheckboxData(updatedCheckboxData);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const { password, errorMessage, generatePassword } = usePasswordGenerator();

  return (
    <>
      <div className="container">
        {/* password text and copy */}
        {password && (
          <div className="header">
            <div className="title">{password}</div>

            <Button
              text={copied ? "Copied" : "copy"}
              customClass="copyBtn"
              onClick={handleCopy}
            />
          </div>
        )}

        {/* character length */}
        <div className="charLength">
          <span>
            <label>Characters Length</label>
            <label>{length}</label>
          </span>
          <input
            type="range"
            min="4"
            max="20"
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
        </div>

        {/* checkbox */}
        <div className="checkboxes">
          {checkboxData.map((checkbox, index) => {
            return (
              <Checkbox
                key={index}
                title={checkbox.title}
                state={checkbox.state}
                onChange={() => handleCheckboxChange(index)}
              />
            );
          })}
        </div>

        {/* strength */}
        <PasswordStrengthIndicator password={password} />

        {/* Error Handling  */}
        {errorMessage && <div className="errorMessage">{errorMessage}</div>}

        {/* gentror button.  */}

        <Button
          text="Generate Password"
          customClass="generateBtn"
          onClick={() => {
            generatePassword(checkboxData, length);
          }}
        />
      </div>
    </>
  );
}

export default App;
