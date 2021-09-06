import React from "react";

const cleanPercentage = (percentage) => {
  const tooLow = !Number.isFinite(+percentage) || percentage < 0;
  // Remove too high check so we can display when an event is overbudget
  // const tooHigh = percentage > 100;
  // return tooLow ? 0 : tooHigh ? 100 : +percentage;
  return tooLow ? 0 : +percentage;
};

const Circle = ({ colour, pct }) => {
  const r = 50;
  const circ = 2 * Math.PI * r;
  const strokePct = ((100 - pct) * circ) / 100;
  return (
    <circle
      r={r}
      cx={100}
      cy={100}
      fill="transparent"
      stroke={strokePct !== circ ? colour : ""}
      strokeWidth={"0.75rem"}
      strokeDasharray={circ}
      strokeDashoffset={pct ? strokePct : 0}
      strokeLinecap="round"
    ></circle>
  );
};

const Text = ({ percentage }) => {
  return (
    <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fontSize={"1.2em"}>
      {percentage.toFixed(0)}%
    </text>
  );
};

const Pie = ({ percentage, colour }) => {
  const pct = cleanPercentage(percentage);
  return (
    <svg width={200} height={150}>
      <g>
        <Circle colour="lightgrey" />
        <Circle colour={colour} pct={pct} />
      </g>
      <Text percentage={pct} />
    </svg>
  );
};

export default Pie;
