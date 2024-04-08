import React, { useState, useEffect } from "react";

const Test = () => {
  const url = "http://localhost:7000/api";
  const [text, setText] = useState("Loading...");

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setText(data.text);
      });
  }, []);

  return (
    <div>
      <span>{text}</span>
    </div>
  );
};

export default Test;
