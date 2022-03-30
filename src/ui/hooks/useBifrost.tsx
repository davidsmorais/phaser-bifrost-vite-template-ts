import { atom, useAtom } from "jotai";

interface RealmConfig {
  realms: {
    [RealmName: string]: React.FC;
  };
  locales: {
    [Language: string]: {
      [RealmName: string]: {
        [Key: string]: string;
      };
    };
  };
  dimensions: {
    height: number;
    width: number;
  };
}

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
