import { FC } from "react";

interface IProps {
  size: number;
  strokeWidth: number;
  progress: number;
  color1?: string;
  color2?: string;
  color3?: string;
  withText?: boolean;
  text?: string;
}
const CircularProgress: FC<IProps> = ({
  size,
  strokeWidth,
  progress,
  color1 = "#85AA9F",
  color2 = "#b7dfd3",
  color3 = "#ffffff",
  withText = false,
  text,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (progress / 100) * circumference;
  const startAngle = -90; // В градусах

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: color1, stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: color2, stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color3}
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="url(#gradient)"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
        transform={`rotate(${startAngle} ${size / 2} ${size / 2})`}
      />
      {withText && (
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="18"
          fill="#000000"
        >
          {text || progress}%
        </text>
      )}
    </svg>
  );
};

export default CircularProgress;
