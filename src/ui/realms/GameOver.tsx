interface RealmProps {
  restartGame: () => void;
  open: boolean;
  t: (k: string) => string;
}

const GameOverRealm = ({ open, restartGame, t }: RealmProps) => {
  if (!open) {
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
        onClick={restartGame}
      >
        <h2>{t("restart")}</h2>
      </button>
    </div>
  );
};

export default GameOverRealm;
