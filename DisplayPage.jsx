import React from "react";

// פונקציות חישוב
function distance(p1, p2) {
  return Math.hypot(p2.x - p1.x, p2.y - p1.y);
}

function calculateAngles(points) {
  const [A, B, C] = points;
  const a = distance(B, C);
  const b = distance(A, C);
  const c = distance(A, B);

  const angleA =
    Math.acos((b * b + c * c - a * a) / (2 * b * c)) * (180 / Math.PI);
  const angleB =
    Math.acos((a * a + c * c - b * b) / (2 * a * c)) * (180 / Math.PI);
  const angleC = 180 - angleA - angleB;

  return [angleA, angleB, angleC];
}

function drawArcInternal(p, p1, p2, radius = 12) {
  const v1 = { x: p1.x - p.x, y: p1.y - p.y };
  const v2 = { x: p2.x - p.x, y: p2.y - p.y };

  const angle1 = Math.atan2(v1.y, v1.x);
  const angle2 = Math.atan2(v2.y, v2.x);

  const cross = v1.x * v2.y - v1.y * v2.x;
  const sweepFlag = cross < 0 ? 0 : 1;

  const startX = p.x + radius * Math.cos(angle1);
  const startY = p.y + radius * Math.sin(angle1);
  const endX = p.x + radius * Math.cos(angle2);
  const endY = p.y + radius * Math.sin(angle2);

  return `M${startX},${startY} A${radius},${radius} 0 0,${sweepFlag} ${endX},${endY}`;
}

function getTextPositionSafe(p, p1, p2, offset = 40) {
  const v1 = { x: p1.x - p.x, y: p1.y - p.y };
  const v2 = { x: p2.x - p.x, y: p2.y - p.y };

  let vx = (v1.x + v2.x) / 2;
  let vy = (v1.y + v2.y) / 2;

  const length = Math.hypot(vx, vy) || 1;
  vx = vx / length;
  vy = vy / length;

  return {
    x: p.x + vx * offset,
    y: p.y + vy * offset,
  };
}

export default function DisplayPage({ points, goBack }) {
  const angles = calculateAngles(points);
  const padding = 50;
  const canvasSize = 800;

  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const scaleX = (canvasSize - 2 * padding) / (maxX - minX || 1);
  const scaleY = (canvasSize - 2 * padding) / (maxY - minY || 1);
  const scale = Math.min(scaleX, scaleY);

  const scaledPoints = points.map((p) => ({
    x: padding + (p.x - minX) * scale,
    y: padding + (p.y - minY) * scale,
  }));

  const gridLines = [];
  const gridStep = 20;
  for (let i = 0; i <= canvasSize; i += gridStep) {
    gridLines.push(
      <line
        key={`h${i}`}
        x1="0"
        y1={i}
        x2={canvasSize}
        y2={i}
        stroke="#eee"
        strokeWidth="0.5"
      />
    );
    gridLines.push(
      <line
        key={`v${i}`}
        x1={i}
        y1="0"
        x2={i}
        y2={canvasSize}
        stroke="#eee"
        strokeWidth="0.5"
      />
    );
  }

  return (
    <div>
      <h2>המשולש:</h2>
      <svg
        width={canvasSize}
        height={canvasSize}
        style={{ border: "1px solid black" }}
      >
        {gridLines}
        <polygon
          points={scaledPoints.map((p) => `${p.x},${p.y}`).join(" ")}
          fill="lightblue"
          stroke="black"
          strokeWidth="2"
        />

        {scaledPoints.map((p, i) => {
          const prev = scaledPoints[(i + 2) % 3];
          const next = scaledPoints[(i + 1) % 3];
          const textPos = getTextPositionSafe(p, prev, next, 40);

          return (
            <g key={i}>
              <path
                d={drawArcInternal(p, prev, next, 12)}
                fill="none"
                stroke="red"
                strokeWidth="2"
              />
              <text
                x={textPos.x}
                y={textPos.y + 4}
                fill="red"
                fontSize="12"
                fontWeight="bold"
                textAnchor="middle"
              >
                {angles[i].toFixed(1)}°
              </text>
            </g>
          );
        })}
      </svg>

      <button
        onClick={goBack}
        style={{
          marginTop: "10px",
          width: "50%",
          padding: "8px",
          borderRadius: "6px",
          border: "none",
          backgroundColor: "#0077cc",
          color: "white",
          fontSize: "14px",
          fontWeight: "bold",
          cursor: "pointer",
          transition: "background-color 0.3s",
        }}
      >
        חזור לקלט
      </button>
    </div>
  );
}
