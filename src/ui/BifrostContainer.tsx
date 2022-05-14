import React from "react";

import { RecoilRoot } from "recoil";

import useBifrost from "./hooks/useBifrost";

const BifrostApp = ({ config }: { config: RealmConfig }) => {
  const { _BifrostContainer } = useBifrost({ config });
  return <_BifrostContainer />;
};

export const RecoilBifrostContainer = ({ config }: { config: RealmConfig }) => {
  return (
    <RecoilRoot>
      <BifrostApp config={config} />
    </RecoilRoot>
  );
};

export default RecoilBifrostContainer;
