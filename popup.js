document.getElementById('save').addEventListener('click', () => {
  const minutes = parseInt(document.getElementById('minutes').value);
  if (!isNaN(minutes) && minutes > 0) {
    chrome.storage.sync.set({ interval: minutes }, () => {
      alert('設定成功！');
      chrome.runtime.sendMessage({ action: "resetAlarm" });
    });
  } else {
    alert('請輸入有效的數字');
  }
});