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
    pwdConfig.symbols && newCats.push(cats[0]);
    pwdConfig.numbers && newCats.push(cats[1]);
    pwdConfig.lowercase && newCats.push(cats[2]);
    pwdConfig.uppercase && newCats.push(cats[3]);
    return newCats;
  };
  const generatePassword = () => {
    let categories = filterCategories();
    if (!categories.length) {
      setPassword("Check any boxes above");
      return;
    }
    const newPassword = [];
    for (let idx = 0; idx < parseInt(pwdConfig.len); idx++) {
      // Get random category
      const category = categories[getRandom(categories.length)];
      // From the category get a random character
      const randomChar = category[getRandom(category.length)];
      newPassword.push(randomChar);
    }
    copyToClipBoard(newPassword.join(""));
  };
  const copyToClipBoard = (password) => {
    navigator?.clipboard?.writeText(password);
    setPassword(password);
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 5000);
  };
  const changeConfig = (type, val) => {
    const prev = { ...pwdConfig };
    prev[type] = val;
    setPwdConfig(() => ({ ...prev }));
  };
  const [copyStatus, setCopyStatus] = useState(false);
  const [password, setPassword] = useState("");
  const [pwdConfig, setPwdConfig] = useState({
    len: 16,
    symbols: true,
    lowercase: true,
    uppercase: true,
    numbers: true,
  });

  const strongNums = [...Array(113).keys()];
  const weakNums = [...Array(15).keys()];
  const categories = [
    { name: "symbols", desc: "Include Symbols:", exmp: "e.g. @#$%" },
    {
      name: "lowercase",
      desc: "Include Lowercase Characters:",
      exmp: "e.g. qwerty",
    },
    {
      name: "uppercase",
      desc: "Include Uppercase Characters:",
      exmp: "e.g. ASDFGH",
    },
    { name: "numbers", desc: "Include Numbers:", exmp: "e.g. 123456" },
  ];

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
                onChange={(e) => changeConfig("len", e.target.value)}
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
          {categories.map((cat) => (
            <tr key={cat.name}>
              <td className="itemDesc">{cat.desc}</td>
              <td>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      onChange={(e) => changeConfig(cat.name, e.target.checked)}
                      defaultChecked={true}
                    />
                    {`(${cat.exmp})`}
                  </label>
                </div>
              </td>
            </tr>
          ))}
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
                  value={password}
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
