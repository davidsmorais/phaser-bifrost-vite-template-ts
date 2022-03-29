import React, { useState, useContext, createContext } from "react";

const TitleRealm = () => {
  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column-nowrap",
        alignItems: "center",
        flex: 1,
        border: "1px solid red",
        height: "100%",
        justifyContent: "center",
      }}
    >
      <h1 style={{ color: "white", fontSize: 64, fontFamily: "OldWizard" }}>
        Knight Game
      </h1>
    </div>
  );
};

export default TitleRealm;
