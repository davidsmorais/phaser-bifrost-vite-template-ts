import TitleRealm from "./realms/Title";
import HudRealm from "./realms/Hud";
import useBifrost from "./hooks/useBifrost";

const config = {
  dimensions: {
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
  },
  locales: {
    en: {
      Title: {
        title: "Knight Game Example",
        subtitle: "Phaser + React Bifrost",
        newGame: "New Game",
      },
    },
  },
  realms: {
    Title: TitleRealm,
    Hud: HudRealm,
  },
};

const App = () => {
  const { state, props } = useBifrost({
    config,
  });
  return (
    <div
      style={{
        position: "absolute",
        width: "100vw",
        height: "100vh",
      }}
    >
      <TitleRealm />
      <HudRealm />
    </div>
  );
};

export default App;
