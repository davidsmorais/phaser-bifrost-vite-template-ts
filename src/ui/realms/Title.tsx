import { useEffect } from "react";
import useBifrost from "../hooks/useBifrost";

const REALM_NAME = "Title";
const TitleRealm = () => {
  const { currentRealmState, currentRealmProps, openRealm, realmIsOpen } =
    useBifrost({
      currentRealm: REALM_NAME,
    });

  console.log(
    "title rendering",
    realmIsOpen,
    currentRealmState,
    currentRealmProps
  );
  if (!realmIsOpen) {
    return null;
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
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
      <button
        style={{
          marginTop: 16,
          background: "transparent",
          boxShadow: "none",
          color: "white",
          border: "none",
          fontFamily: "OldWizard",
          fontSize: 14,
        }}
        onClick={currentRealmProps?.onClose}
      >
        <h2>New Game</h2>
      </button>
    </div>
  );
};

export default TitleRealm;
