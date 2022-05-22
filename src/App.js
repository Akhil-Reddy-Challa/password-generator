import { useState } from "react";
import "./App.css";

function App() {
  const getRandom = (max) => {
    return Math.floor(Math.random() * max);
  };
  const filterCategories = () => {
    let cats = [
      "!@#$%^&*()_+-=;|,.?]+:",
      "0123456789",
      "abcdefghijklmnopqrstuvwxyz",
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    ];

    const newCats = [];
    includeSymbols && newCats.push(cats[0]);
    includeNumbers && newCats.push(cats[1]);
    includeLowercase && newCats.push(cats[2]);
    includeUppercase && newCats.push(cats[3]);
    return newCats;
  };
  const generatePassword = () => {
    let categories = filterCategories();
    if (!categories.length) {
      setPasswordText("Check any boxes above");
      return;
    }
    const newPassword = [];
    for (let idx = 0; idx < passwordLength; idx++) {
      // Get random category
      const category = categories[getRandom(categories.length)];
      // From the category get a random character
      const randomChar = category[getRandom(category.length)];
      newPassword.push(randomChar);
    }
    setPasswordText(newPassword.join(""));
    copyToClipBoard();
  };
  const copyToClipBoard = () => {
    navigator.clipboard.writeText(passwordText);
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 5000);
  };
  const [copyStatus, setCopyStatus] = useState(false);
  const [passwordText, setPasswordText] = useState("");
  const [passwordLength, setPasswordLength] = useState(16);
  const [includeSymbols, setSymbols] = useState(true);
  const [includeNumbers, setNumbers] = useState(true);
  const [includeLowercase, setLower] = useState(true);
  const [includeUppercase, setUpper] = useState(true);

  const strongNums = [...Array(113).keys()];
  const weakNums = [...Array(15).keys()];

  return (
    <div className="App">
      <table>
        <tbody>
          <tr>
            <td className="itemDesc">Password Length:</td>
            <td>
              <select
                title="Select the length of your password."
                className="pwd-length"
                onChange={(e) => setPasswordLength(parseInt(e.target.value))}
              >
                <optgroup label="Strong">
                  {strongNums.map((num) => (
                    <option value={num + 16} key={num + 16}>
                      {num + 16}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Weak">
                  {weakNums.map((num) => (
                    <option value={num + 1} key={num + 1}>
                      {num + 1}
                    </option>
                  ))}
                </optgroup>
              </select>
            </td>
          </tr>
          <tr>
            <td className="itemDesc">Include Symbols:</td>
            <td>
              <div>
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => setSymbols(!includeSymbols)}
                    checked={includeSymbols}
                  />
                  ( e.g. @#$% )
                </label>
              </div>
            </td>
          </tr>
          <tr>
            <td className="itemDesc">Include Numbers:</td>
            <td>
              <div>
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => setNumbers(!includeNumbers)}
                    checked={includeNumbers}
                  />
                  ( e.g. 123456 )
                </label>
              </div>
            </td>
          </tr>
          <tr>
            <td className="itemDesc">Include Lowercase Characters:</td>
            <td>
              <div>
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => setLower(!includeLowercase)}
                    checked={includeLowercase}
                  />
                  ( e.g. qwerty)
                </label>
              </div>
            </td>
          </tr>
          <tr>
            <td className="itemDesc">Include Uppercase Characters:</td>
            <td>
              <div>
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => setUpper(!includeUppercase)}
                    checked={includeUppercase}
                  />
                  ( e.g. ASDFGH )
                </label>
              </div>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <div className="genbtn_wrap noselect" onClick={generatePassword}>
                <div className="Button genbtn">Generate & Copy Password</div>
              </div>
            </td>
          </tr>
          <tr>
            <td>Your New Password:</td>
            <td className="last-row">
              <div className="flex pwdsection">
                <input
                  type="text"
                  className="generated-password-text"
                  value={passwordText}
                  readOnly
                />
                <div className="copystatus flex">
                  <p hidden={!copyStatus}>🥳 COPIED TO CLIPBOARD!</p>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
