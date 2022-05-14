import React from "react";

import { RecoilRoot } from "recoil";

import useBifrost from "./hooks/useBifrost";

const BifrostApp = ({ config }: { config: RealmConfig }) => {
  const { renderRealms } = useBifrost({ config, init: true });
  return (
    <div
      style={{
        position: "absolute",
        width: "100vw",
        height: "100vh",
      }}
    >
      {renderRealms}
    </div>
  );
};

export const RecoilBifrostContainer = ({ config }: { config: RealmConfig }) => {
  return (
    <RecoilRoot>
      <BifrostApp config={config} />
    </RecoilRoot>
  );
};

export default RecoilBifrostContainer;
