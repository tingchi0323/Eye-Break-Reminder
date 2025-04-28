function createAlarm() {
  chrome.storage.sync.get({ interval: 20 }, (data) => {
    chrome.alarms.create('eyeBreak', { periodInMinutes: data.interval });
  });
}

chrome.runtime.onInstalled.addListener(() => {
  createAlarm();
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'eyeBreak') {
    chrome.notifications.create('', {
      type: 'basic',
      iconUrl: 'icon.jpg',
      title: '你很棒！',
      message: '閉上眼睛，讓眼睛休息20秒吧(╲⊙▽⊙╱)！',
      priority: 2
    });
    createAlarm(); // 設下一次提醒
  }
});
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "resetAlarm") {
    chrome.alarms.clearAll(() => {
      createAlarm();
    });
  }
});