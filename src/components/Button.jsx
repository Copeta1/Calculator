import { useContext } from "react";
import { CalcContext } from "../context/CalcContext";

const getStyleName = (btn) => {
  const className = {
    "=": "equals",
    "+": "opt",
    "-": "opt",
    "*": "opt",
    "/": "opt",
  };
  return className[btn];
};

export default function Button({ value }) {
  const { calc, setCalc } = useContext(CalcContext);

  //user click comma
  const commaClick = () => {
    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  const resetClick = () => {
    setCalc({ sign: "", num: 0, res: 0 });
  };

  const handleClickButton = () => {
    const numberString = value.toString();

    let numberValue;
    if (numberString === "0" && calc.num === 0) {
      numberValue = "0";
    } else {
      numberValue = Number(calc.num + numberString);
    }

    setCalc({
      ...calc,
      num: numberValue,
    });
  };

  const signClick = () => {
    setCalc({
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };

  const equalsClick = () => {
    const math = (a, b, operator) => {
      switch (operator) {
        case "/":
          return a / b;
        case "*":
          return a * b;
        case "+":
          return a + b;
        case "-":
          return a - b;
        default:
          return "Error";
      }
    };

    setCalc({
      res: math(calc.res, calc.num, calc.sign),
      sign: "",
      num: 0,
    });
  };

  const persenClick = () => {
    setCalc({
      num: calc.num / 100,
      res: calc.res / 100,
      sign: "",
    });
  };

  const invertClick = () => {
    setCalc({
      num: -calc.num,
      res: -calc.res,
      sign: "",
    });
  };

  const handleBtnClick = () => {
    const resulte = {
      ".": commaClick,
      C: resetClick,
      "/": signClick,
      "*": signClick,
      "-": signClick,
      "+": signClick,
      "=": equalsClick,
      "%": persenClick,
      "+-": invertClick,
    };
    if (resulte[value]) {
      return resulte[value]();
    } else {
      return handleClickButton();
    }
  };

  return (
    <button
      onClick={handleBtnClick}
      className={`${getStyleName(value)} button`}
    >
      {value}
    </button>
  );
}
