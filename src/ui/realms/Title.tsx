import { useBifrost } from "react-bifrost";

const REALM_NAME = "Title";
interface RealmProps {
  onClose: () => void;
}

const TitleRealm = () => {
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
        onClick={props?.onClose}
      >
        <h2>{t("newGame")}</h2>
      </button>
    </div>
  );
};

export default TitleRealm;
