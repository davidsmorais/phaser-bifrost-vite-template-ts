interface RealmConfig {
  realms: {
    [RealmName: string]: React.FC | ReactNode;
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

interface BifrostProps<T> {
  props: T;
  state: {
    [stateKey: string]: any;
  };
  realmIsOpen: boolean;
  t: (key: string) => string;
}
