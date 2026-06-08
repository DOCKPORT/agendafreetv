// TradingView Symbol Info Widgets
// Scripts are injected dynamically to avoid linter errors from inline JSON in HTML

(function () {
  "use strict";

  if (window.__AGENDA_WIDGETS_INJECTED) return;
  window.__AGENDA_WIDGETS_INJECTED = true;

  var widgetConfigs = [
    // Commodities
    { container: "widget-xauusd", symbol: "OANDA:XAUUSD" },
    { container: "widget-usoil",  symbol: "TVC:USOIL" },
    { container: "widget-ukoil",  symbol: "TVC:UKOIL" },

    // Indices
    { container: "widget-sp500",  symbol: "VANTAGE:SP500" },
    { container: "widget-nas100", symbol: "CAPITALCOM:NAS100" },
    { container: "widget-us30",   symbol: "FX:US30" },

    // Crypto
    { container: "widget-btcusdt", symbol: "BINANCE:BTCUSDT" },
    { container: "widget-ethusdt", symbol: "BINANCE:ETHUSDT" },
    { container: "widget-solusdt", symbol: "BINANCE:SOLUSDT" },
    { container: "widget-bnbusdt", symbol: "BINANCE:BNBUSDT" },
  ];

  function setWidgetError(containerDiv) {
    containerDiv.classList.add("widget-error");
    containerDiv.textContent = "Data temporarily unavailable";
  }

  function injectWidget(config) {
    var containerDiv = document.getElementById(config.container);
    if (!containerDiv) return;

    var script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js";
    script.async = true;

    script.onerror = function () {
      setWidgetError(containerDiv);
    };

    script.textContent = JSON.stringify({
      symbol: config.symbol,
      colorTheme: "dark",
      isTransparent: true,
      locale: "en",
      width: "100%",
    });

    containerDiv.parentNode.insertBefore(script, containerDiv.nextSibling);

    // Fallback timeout in case script loads but fails to render
    setTimeout(function () {
      if (!containerDiv.querySelector("iframe, object, embed")) {
        setWidgetError(containerDiv);
      }
    }, 15000);
  }

  for (var i = 0; i < widgetConfigs.length; i++) {
    injectWidget(widgetConfigs[i]);
  }
})();