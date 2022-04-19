import TitleRealm from "./realms/Title";
import HudRealm from "./realms/Hud";
import GameOverRealm from "./realms/GameOver";
import { useBifrost } from "dm-react-bifrost";

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
      Hud: {
        damage: "Damage",
      },
      GameOver: {
        gameOver: "Game Over",
        restart: "Restart Game",
      },
    },
  },
  realms: {
    Title: TitleRealm,
    Hud: HudRealm,
    GameOver: GameOverRealm,
  },
};

const App = () => {
  useBifrost({
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
      <GameOverRealm />
    </div>
  );
};

export default App;
