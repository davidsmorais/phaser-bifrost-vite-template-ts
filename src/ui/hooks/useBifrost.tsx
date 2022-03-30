import Bifrost from "@/Bifrost";
import { atom, useAtom } from "jotai";

const realmStateAtom = atom({});
const realmPropsAtom = atom({});

const useBifrost = ({
  config,
  currentRealm,
}: {
  config?: RealmConfig;
  currentRealm?: string;
}) => {
  if (!window.bifrost && config) {
    window.bifrost = new Bifrost(config);
  }
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
    window.bifrost.openRealm(realmName, (props, state) => {
      setRealmsProps({
        ...realmsProps,
        [realmName || currentRealm]: {
          ...(realmsProps[realmName || currentRealm] || {}),
          props,
          state,
        },
      });
      setRealmsState({
        ...realmsState,
        [realmName || currentRealm]: {
          ...(realmsState[realmName || currentRealm] || {}),
          state,
        },
      });
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
    window.bifrost.closeRealm(realmName);
  };

  const realmIsOpen = realmsState?.[currentRealm]?.open ?? false;
  const realmList = Object.keys(realms);
  const currentRealmProps = realmsProps[currentRealm];
  const currentRealmState = realmsState[currentRealm];

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
