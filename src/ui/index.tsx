import TitleRealm from "./realms/Title";
import HudRealm from "./realms/Hud";
import PauseRealm from "./realms/Pause";
import GameOverRealm from "./realms/GameOver";
import useBifrost from "./hooks/useBifrost";
import { RecoilRoot } from "recoil";

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
      Pause: {
        pause: "Pause",
        continue: "Continue",
      },
    },
  },
  realms: {
    Title: TitleRealm,
    GameOver: GameOverRealm,
    Hud: HudRealm,
    Pause: PauseRealm,
  },
};

const App = () => {
  return (
    <RecoilRoot>
      <BifrostApp />
    </RecoilRoot>
  );
};
const BifrostApp = () => {
  const { BifrostContainer } = useBifrost({ config });
  return <BifrostContainer />;
};

export default App;
