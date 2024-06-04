function getProductsFromSearch() {
  const elements = [
    ...document.querySelectorAll(
      '.s-search-results.s-result-list .s-result-item[data-component-type="s-search-result"]'
    ),
  ];

  return elements.map((element) => {
    const product_name = element.querySelector("h2").textContent;

    const price_whole =
      element.querySelector(".a-price-whole")?.textContent || "";
    const price_fraction =
      element.querySelector(".a-price-fraction")?.textContent || "";
    const price_string = `${price_whole}${price_fraction}`;
    const price = (price_string && parseFloat(price_string)) || undefined;

    const reviews_count_string =
      element
        .querySelector('[data-component-type="s-client-side-analytics"]')
        ?.textContent?.replace(",", "")
        ?.replace(" ", "") || "";
    const reviews_count =
      (reviews_count_string && parseInt(reviews_count_string)) || undefined;

    return {
      product_name,
      price,
      reviews_count,
    };
  });
}

browser.runtime.onMessage.addListener((data, sender) => {
  if (data.type === "getProductsFromSearch") {
    return Promise.resolve(getProductsFromSearch());
  }

  return false;
});
