import useBifrost from "../hooks/useBifrost";

const REALM_NAME = "Pause";
interface RealmProps {
  onClose: () => void;
}

const PauseRealm = () => {
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
        onClick={props?.onClose}
      >
        <h2>{t("continue")}</h2>
      </button>
    </div>
  );
};

export default PauseRealm;
