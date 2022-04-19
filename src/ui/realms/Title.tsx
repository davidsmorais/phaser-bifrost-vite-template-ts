import { useBifrost } from "dm-react-bifrost";

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
    <div style={{}}>
      <h1>{t("title")}</h1>
      <h3>{t("subtitle")}</h3>
      <button onClick={props?.onClose}>
        <h2>{t("newGame")}</h2>
      </button>
    </div>
  );
};

export default TitleRealm;
