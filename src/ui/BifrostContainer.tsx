import { useBifrost } from "dm-react-bifrost";

const BifrostApp = ({ config }: { config: RealmConfig }) => {
  const { renderRealms } = useBifrost({ config, init: true });
  return (
    <div
      style={{
        position: "absolute",
        width: "100vw",
        height: "100vh",
      }}
    >
      {renderRealms}
    </div>
  );
};
export default BifrostApp;
