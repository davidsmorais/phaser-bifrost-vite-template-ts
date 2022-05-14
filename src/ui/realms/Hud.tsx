import useBifrost from "../hooks/useBifrost";

const REALM_NAME = "Hud";
interface RealmProps {
  width: number;
  pressBtn: () => void;
}

const HudRealm = () => {
  const { props, realmIsOpen, t }: BifrostProps<RealmProps> = useBifrost({
    currentRealm: REALM_NAME,
  });
  if (!realmIsOpen || !props) {
    return null;
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1,
        border: "1px solid red",
        width: "calc(100% - 120px)",
        background: "transparent",
      }}
    >
      <span
        style={{
          width: `${props.width}%`,
          background: "red",
          border: "1px solid black",
          transition: "width 0.5s ease-in",
          height: 32,
        }}
      />
      <div
        onClick={props.pressBtn}
        style={{
          color: "white",
        }}
      >
        {t("damage")}
      </div>
    </div>
  );
};

export default HudRealm;
