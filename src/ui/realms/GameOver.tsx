import useBifrost from "../hooks/useBifrost";

const REALM_NAME = "GameOver";
interface RealmProps {
  restartGame: () => void;
}

const GameOverRealm = () => {
  const { props, realmIsOpen, t }: BifrostProps<RealmProps> = useBifrost({
    currentRealm: REALM_NAME,
  });

  if (!realmIsOpen) {
    return null;
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flex: 1,
        height: "100vh",
        justifyContent: "center",
      }}
    >
      <h1 style={{ color: "red", fontSize: 64, fontFamily: "OldWizard" }}>
        {t("gameOver")}
      </h1>
      <button
        style={{
          marginTop: 32,
          background: "black",
          boxShadow: "none",
          color: "red",
          border: "1px solid red",
          padding: 16,
          fontFamily: "OldWizard",
          fontSize: 14,
        }}
        onClick={props?.restartGame}
      >
        <h2>{t("restart")}</h2>
      </button>
    </div>
  );
};

export default GameOverRealm;
