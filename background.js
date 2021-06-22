/** @type import('chrome') */
let color = "#3aa757";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log("Default background color set to %cgreen", `color: ${color}`);
});

chrome.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    // refererを "http://example.com/" に書き換え:
    // putReqHeader(details, "referer", "http://example.com/");
    console.log(details);

    putReqHeader(details, "referer", "http://pixiv.com/");

    return {
      requestHeaders: details.requestHeaders,
    };
  },
  { urls: ["<all_urls>"] },
  ["requestHeaders", "extraHeaders", "blocking"]
);

/** details.requestHeaders内のリクエストヘッダを更新する関数 */
function putReqHeader(details, key, val) {
  key = key.toLowerCase();
  for (let n in details.requestHeaders) {
    const got = details.requestHeaders[n].name.toLowerCase() == key;
    if (got) {
      details.requestHeaders[n].value = val;
      return;
    }
  }
  details.requestHeaders.push({
    name: key,
    value: val,
  });
}
