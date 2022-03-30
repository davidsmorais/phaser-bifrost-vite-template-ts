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
