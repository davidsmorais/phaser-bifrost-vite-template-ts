import { createRoot } from "react-dom/client";
import * as WebFontLoader from "webfontloader";

import { Donsole } from "./logger";
import UIApp from "./ui";
import App from "@/app";
import * as Assets from "@/assets";

async function loadWebFont(): Promise<void> {
  return new Promise((resolve) => {
    let webFontLoaderOptions = null;
    const fonts = Object.keys(Assets).filter((asset) =>
      asset.startsWith("Font")
    );

    if (fonts.length > 0) {
      webFontLoaderOptions = {};
      webFontLoaderOptions.custom = {
        families: [],
        urls: [],
      };

      for (const font of fonts) {
        // eslint-disable-next-line import/namespace
        webFontLoaderOptions.custom.families.push(Assets[font].getFamily());
        // eslint-disable-next-line import/namespace
        webFontLoaderOptions.custom.urls.push(Assets[font].getCSS());
      }
    }

    if (webFontLoaderOptions === null) {
      resolve();
      return;
    }

    webFontLoaderOptions.active = (): void => {
      resolve();
    };
    WebFontLoader.load(webFontLoaderOptions);
  });
}

window.onload = async (): Promise<void> => {
  const root = createRoot(document.getElementById("bifrost"));
  root.render(<UIApp />);
  new Donsole();
  await loadWebFont();
  App.start();
};
