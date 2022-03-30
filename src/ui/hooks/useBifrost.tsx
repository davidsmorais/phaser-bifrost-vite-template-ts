import Bifrost from "@/Bifrost";
import { atom, useAtom } from "jotai";
import { useMemo } from "react";

const realmStateAtom = atom({});
const realmPropsAtom = atom({});

const useBifrost = ({
  config,
  currentRealm,
}: {
  config?: RealmConfig;
  currentRealm?: string;
}) => {
  const realms = config?.realms ?? {};
  const [realmsState, setRealmsState] = useAtom(realmStateAtom);
  const [realmsProps, setRealmsProps] = useAtom(realmPropsAtom);

  const openRealm = (realmName?: string) => {
    setRealmsState({
      ...realmsState,
      [realmName || currentRealm]: {
        ...(realmsState[realmName || currentRealm] || {}),
        open: true,
      },
    });
  };

  const closeRealm = (realmName?: string) => {
    setRealmsState({
      ...realmsState,
      [realmName || currentRealm]: {
        ...(realmsState[realmName || currentRealm] || {}),
        open: true,
      },
    });
  };

  if (!window.Bifrost && config) {
    window.Bifrost = new Bifrost(config, realmStateAtom);
    window.Bifrost.bus.addEventListener("bifrost-open", ({ detail }: any) => {
      const { name } = detail;

      openRealm(name);
    });
  }

  const currentRealmState = useMemo(
    () => realmsState[currentRealm],
    [realmsState]
  );
  const realmIsOpen = currentRealmState?.open ?? false;
  const realmList = Object.keys(realms);
  const currentRealmProps = useMemo(
    () => realmsProps[currentRealm],
    [realmsProps]
  );

  return {
    realmList,
    openRealm,
    closeRealm,
    state: realmsState,
    props: realmsProps,
    currentRealmProps,
    currentRealmState,
    setRealmsProps,
    setRealmsState,
    realmIsOpen,
  };
};

export default useBifrost;
