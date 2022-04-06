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
        open: false,
      },
    });
  };

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
        console.log("Has props", props, name);
        setRealmsProps({
          ...realmsProps,
          [name]: props,
        });
      }
      openRealm(name);
    });
    window.Bifrost.bus.addEventListener("bifrost-close", ({ detail }: any) => {
      const { name } = detail;
      closeRealm(name);
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

  const t = (key: string) => {
    return window.Bifrost.translate(currentRealm, key);
  };

  return {
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
