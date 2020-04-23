const zeroPad = (num) => (num < 10 ? "0" + num : num.toString());

export const formatTime = (time) => {
  if (!time) return "N/A";
  else {
    return `${time.getHours()}:${zeroPad(time.getMinutes())}:${zeroPad(
      time.getSeconds()
    )}`;
  }
};
