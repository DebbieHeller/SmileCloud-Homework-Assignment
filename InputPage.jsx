import React, { useState } from "react";

export default function InputPage({ onSubmit }) {
  const [points, setPoints] = useState([
    { x: "", y: "" },
    { x: "", y: "" },
    { x: "", y: "" },
  ]);

  const handleChange = (index, axis, value) => {
    const newPoints = [...points];
    newPoints[index][axis] = Number(value);
    setPoints(newPoints);
  };

  const handleSubmit = () => {
    onSubmit(points);
  };

  // סגנונות ריספונסיביים וקבועים
  const styles = {
    container: {
      maxWidth: "400px",
      width: "90vw",
      margin: "40px auto",
      padding: "20px",
      borderRadius: "12px",
      backgroundColor: "#f0f8ff",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    heading: {
      textAlign: "center",
      marginBottom: "20px",
      fontSize: "1.4rem",
      color: "#333",
    },
    pointRow: {
      display: "flex",
      gap: "10px",
      marginBottom: "15px",
    },
    input: {
      flex: 1,
      padding: "10px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      fontSize: "14px",
      outline: "none",
      transition: "border-color 0.3s, box-shadow 0.3s",
    },
    inputFocus: {
      borderColor: "#0077cc",
      boxShadow: "0 0 5px rgba(0,119,204,0.5)",
    },
    button: {
      width: "100%",
      padding: "12px",
      borderRadius: "8px",
      border: "none",
      backgroundColor: "#0077cc",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    buttonHover: {
      backgroundColor: "#005fa3",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>הזן שלוש נקודות</h2>
      {points.map((p, i) => (
        <div key={i} style={styles.pointRow}>
          <input
            type="number"
            placeholder={`X${i + 1}`}
            value={p.x}
            onChange={(e) => handleChange(i, "x", e.target.value)}
            style={styles.input}
            onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
            onBlur={(e) => Object.assign(e.target.style, styles.input)}
          />
          <input
            type="number"
            placeholder={`Y${i + 1}`}
            value={p.y}
            onChange={(e) => handleChange(i, "y", e.target.value)}
            style={styles.input}
            onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
            onBlur={(e) => Object.assign(e.target.style, styles.input)}
          />
        </div>
      ))}
      <button
        style={styles.button}
        onMouseEnter={(e) =>
          (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)
        }
        onMouseLeave={(e) =>
          (e.target.style.backgroundColor = styles.button.backgroundColor)
        }
        onClick={handleSubmit}
      >
        הצג משולש
      </button>
    </div>
  );
}
