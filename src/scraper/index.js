const callEvery = (callback, interval) => {
  callback();
  setTimeout(() => callEvery(callback, interval), interval);
};

callEvery(() => console.log('hello'), 5000);
