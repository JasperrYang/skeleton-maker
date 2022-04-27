import createSkeletonHTML from "./evalDOM";

const copyToClipboard = str => {
  const el = document.createElement("textarea");
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  // Handle message.
  // In this example, message === 'whatever value; String, object, whatever'
  if (message.code === "DRAW_SKELETON") {
    createSkeletonHTML(message.params)
      .then(skeletonHTML => {
        console.log(skeletonHTML);
        copyToClipboard(skeletonHTML);
        alert("copied to clipboard");
      })
      .catch(e => {
        console.error(e);
      })
      .finally(
        sendResponse({status: 'ok'})
      )
  }
});
