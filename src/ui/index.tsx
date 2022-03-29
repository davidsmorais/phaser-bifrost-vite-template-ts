import React, { useState, useContext, createContext } from "react";

import ReactDOM from "react-dom";

import TitleRealm from "./realms/Title";

const config = {
  dimensions: {
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
  },
  locale: "en-US",
};

const useBifrost = ({ realms, config }) => {
  const [realmsState, setRealmsState] = useState({});
  const [realmProps, setRealmProps] = useState({});
  const BifrostContext = createContext({
    state: realmsState,
    props: realmProps,
  });
  const realmList = Object.keys(realms);

  return {
    BifrostContext,
    realmList,
  };
};

const App = (): JSX.Element => {
  const { BifrostContext } = useBifrost({
    realms: {
      Title: TitleRealm,
    },
    config,
  });
  return (
    <div
      style={{
        position: "absolute",
        width: "100vw",
        height: "100vh",
      }}
    >
      <BifrostContext.Provider value={{ state: null, props: null }}>
        <TitleRealm />
      </BifrostContext.Provider>
    </div>
  );
};

export default App;
