import { useContext } from "react";
import { CalcContext } from "../context/CalcContext";

export default function Screen() {
  const { calc } = useContext(CalcContext);
  return (
    <div className="screen" max={70} mode="single">
      {calc.num ? calc.num : calc.res}
    </div>
  );
}
