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
  console.log("🚀 ~ file: useBifrost.tsx ~ line 30 ~ realmsState", realmsState);
  const [realmsProps, setRealmsProps] = useRecoilState(realmPropsAtom);
  const openRealm = useRecoilCallback(
    ({ snapshot }) =>
      async (realmName?: string) => {
        const rs = await snapshot.getPromise(realmStateAtom);
        const realm = realmName || currentRealm;
        if (realm) {
          setRealmsState({
            ...rs,
            [realm]: {
              ...(rs[realm] || {}),
              open: true,
            },
          });
        } else {
          console.error(
            "❗Bifrost Error❗ openRealm failed 👉 currentRealm not set and realmName not passed"
          );
        }
      },
    [realmStateAtom]
  );

  const closeRealm = (realmName?: string) => {
    const realm = realmName || currentRealm;
    if (realm) {
      setRealmsState({
        ...realmsState,
        [realm]: {
          ...(realmsState[realm] || {}),
          open: false,
        },
      });
    } else {
      console.error(
        "❗Bifrost Error❗ closeRealm failed 👉 currentRealm not set and realmName not passed"
      );
    }
  };

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
        if (state) {
          setRealmsState({
            ...realmsState,
            [name]: state,
          });
        }
        if (props) {
          setRealmsProps({
            ...realmsProps,
            [name]: props,
          });
        }
        openRealm(name);
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
          if (props) {
            setRealmsProps({
              ...realmsProps,
              [name]: props,
            });
          }
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
    state: currentRealm ? currentRealmState : realmsState,
    props: currentRealm ? currentRealmProps : realmsProps,
    setRealmsProps,
    setRealmsState,
    realmIsOpen,
    t,
  };
};

export default useBifrost;
