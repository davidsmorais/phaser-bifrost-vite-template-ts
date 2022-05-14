import { useMemo } from "react";
import { atom, useRecoilState, useRecoilCallback } from "recoil";

import Bifrost from "@/Bifrost";

export const realmStateAtom = atom({
  key: "realmsState",
  default: {},
});
const realmPropsAtom = atom({
  key: "realmsProps",
  default: {},
});

const useBifrost = ({
  config,
  currentRealm,
}: {
  config?: RealmConfig;
  currentRealm?: string;
}) => {
  const realms = config?.realms ?? {};
  const [realmsState, setRealmsState] = useRecoilState(realmStateAtom);
  const [realmsProps, setRealmsProps] = useRecoilState(realmPropsAtom);
  const openRealm = useRecoilCallback(
    ({ snapshot }) =>
      async (realmName: string, state: any, props: any) => {
        const rs = await snapshot.getPromise(realmStateAtom);
        const rp = await snapshot.getPromise(realmPropsAtom);
        const realm = realmName || currentRealm;
        if (realm) {
          const newRs = {
            ...rs,
            [realm]: {
              ...(rs[realm] || {}),
              ...state,
              open: true,
            },
          };
          console.log("🚀 ~ file: useBifrost.tsx ~ line 33 ~ newRs", newRs);
          setRealmsState(newRs);
          const newP = {
            ...rp,
            [realm]: {
              ...(rp[realm] || {}),
              ...props,
              open: true,
            },
          };
          console.log("🚀 ~ file: useBifrost.tsx ~ line 33 ~ newRs", newRs);
          setRealmsProps(newP);
        } else {
          console.error(
            "❗Bifrost Error❗ openRealm failed 👉 currentRealm not set and realmName not passed"
          );
        }
      },
    [realmStateAtom, realmPropsAtom, currentRealm]
  );

  const closeRealm = useRecoilCallback(
    ({ snapshot }) =>
      async (realmName?: string) => {
        const realm = realmName || currentRealm;

        if (realm) {
          const rs = await snapshot.getPromise(realmStateAtom);
          setRealmsState({
            ...rs,
            [realm]: {
              ...(rs[realm] || {}),
              open: false,
            },
          });
        } else {
          console.error(
            "❗Bifrost Error❗ closeRealm failed 👉 currentRealm not set and realmName not passed"
          );
        }
      },
    [realmStateAtom, realmPropsAtom, currentRealm]
  );

  const updateRealmProps = useRecoilCallback(
    ({ snapshot }) =>
      async (realmName: string, props: any) => {
        const realm = realmName || currentRealm;
        if (realm) {
          const rp = await snapshot.getPromise(realmPropsAtom);
          setRealmsProps({
            ...rp,
            [realm]: {
              ...(rp[realm] || {}),
              ...props,
            },
          });
        } else {
          console.error(
            "❗Bifrost Error❗ closeRealm failed 👉 currentRealm not set and realmName not passed"
          );
        }
      },
    [realmStateAtom, realmPropsAtom, currentRealm]
  );

  const currentRealmState = useMemo(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    () => (currentRealm ? realmsState[currentRealm] : realmsState),
    [realmsState]
  );
  const realmIsOpen = currentRealmState?.open ?? false;
  const realmList = Object.keys(realms);
  const currentRealmProps = useMemo(
    () => (currentRealm ? realmsProps[currentRealm] : realmsProps),
    [realmsProps]
  );

  const t = (key: string) => {
    return window.Bifrost.translate(key, currentRealm);
  };

  const BifrostContainer = () => {
    const realms = config?.realms ?? {};
    const renderRealms = Object.keys(realms).map((realm) =>
      config.realms[realm]({})
    );

    if (!window.Bifrost && config) {
      window.Bifrost = new Bifrost(config);
      window.Bifrost.bus.addEventListener("bifrost-open", ({ detail }: any) => {
        const { name, state, props } = detail;

        openRealm(name, state, props);
      });
      window.Bifrost.bus.addEventListener(
        "bifrost-close",
        ({ detail }: any) => {
          const { name } = detail;
          closeRealm(name);
        }
      );

      window.Bifrost.bus.addEventListener(
        "bifrost-update",
        ({ detail }: any) => {
          const { name, props } = detail;
          updateRealmProps(name, props);
        }
      );
    }

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

  return {
    BifrostContainer,
    realmList,
    openRealm,
    closeRealm,
    updateRealmProps,
    state: currentRealm ? currentRealmState : realmsState,
    props: currentRealm ? currentRealmProps : realmsProps,
    setRealmsProps,
    setRealmsState,
    realmIsOpen,
    t,
  };
};

export default useBifrost;
