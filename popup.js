document.addEventListener(
  "DOMContentLoaded",
  function() {
    const button = document.getElementById("button");
    button.addEventListener(
      "click",
      function() {
        const rootNode = document.getElementById("root-input").value;
        chrome.tabs.query(
          {
            currentWindow: true,
            active: true
          },
          tabs => {
            for (let tab of tabs) {
              chrome.tabs.executeScript(
                tab.id,
                {
                  file: "index.js"
                },
                function() {
                  chrome.tabs.sendMessage(tab.id, {
                    code: "DRAW_SKELETON",
                    params: {
                      background: "#f2f2f2",
                      animation: "opacity 1s linear infinite;",
                      rootNode
                    }
                  });
                }
              );
            }
          }
        );
      },
      false
    );
  },
  false
);
