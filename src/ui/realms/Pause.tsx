interface RealmProps {
  onClose: () => void;
  open: boolean;
  t: (string) => string;
}

const PauseRealm = ({ open, onClose, t }: RealmProps) => {
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
      <h1 style={{ color: "purple", fontSize: 64, fontFamily: "OldWizard" }}>
        {t("pause")}
      </h1>
      <button
        style={{
          marginTop: 32,
          background: "black",
          boxShadow: "none",
          color: "purple",
          border: "1px solid purple",
          padding: 16,
          fontFamily: "OldWizard",
          fontSize: 14,
        }}
        onClick={onClose}
      >
        <h2>{t("continue")}</h2>
      </button>
    </div>
  );
};

export default PauseRealm;
