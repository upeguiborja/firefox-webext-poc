async function performAction() {
  browser.tabs.query({ currentWindow: true, active: true }).then((tabs) =>
    tabs.forEach(async (tab) => {
      const products = await browser.tabs.sendMessage(tab.id, {
        type: "getProductsFromSearch",
      });

      const jsonBlob = new Blob([JSON.stringify(products, null, 2)], {
        type: "application/json",
      });

      browser.downloads.download({
        url: URL.createObjectURL(jsonBlob),
        filename: "products.json",
      });
    })
  );
}

browser.browserAction.onClicked.addListener(performAction);
