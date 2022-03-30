import { useEffect } from "react";
import useBifrost from "../hooks/useBifrost";

const REALM_NAME = "Title";
const TitleRealm = () => {
  const { currentRealmState, currentRealmProps, openRealm, realmIsOpen } =
    useBifrost({
      currentRealm: REALM_NAME,
    });

  console.log("title rendering", realmIsOpen, currentRealmState);
  if (!realmIsOpen) {
    return null;
  }
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
