interface RealmProps {
  onClose: () => void;
  open: boolean;
  t: (k: string) => string;
}

const TitleRealm = ({ t, onClose }) => {
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
      <h1 style={{ color: "white", fontSize: 64, fontFamily: "OldWizard" }}>
        {t("title")}
      </h1>
      <h3 style={{ color: "white", fontSize: 24, fontFamily: "OldWizard" }}>
        {t("subtitle")}
      </h3>
      <button
        style={{
          marginTop: 32,
          background: "transparent",
          boxShadow: "none",
          color: "white",
          border: "1px solid white",
          padding: 16,
          fontFamily: "OldWizard",
          fontSize: 14,
        }}
        onClick={onClose}
      >
        <h2>{t("newGame")}</h2>
      </button>
    </div>
  );
};

export default TitleRealm;
