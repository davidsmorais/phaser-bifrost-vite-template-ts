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
          setRealmsState(newRs);
          const newP = {
            ...rp,
            [realm]: {
              ...(rp[realm] || {}),
              ...props,
            },
          };
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
  const currentRealmProps = useMemo(
    () => (currentRealm ? realmsProps[currentRealm] : realmsProps),
    [realmsProps]
  );
  const realmIsOpen = currentRealmState?.open ?? false;

  const realmList = Object.keys(realms);

  const t = (key: string) => {
    return window.Bifrost.translate(key, currentRealm);
  };

  const renderRealms = Object.keys(realms).map((realm) => {
    const Realm = config.realms[realm];

    return (
      <Realm
        key={realm}
        id={`Bifrost-${realm}`}
        t={(key: string) => window.Bifrost.translate(key, realm)}
        open={realmsState[realm]?.open}
      />
    );
  });
  const _BifrostContainer = () => {
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
    _BifrostContainer,
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
