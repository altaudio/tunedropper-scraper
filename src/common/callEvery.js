export const callEvery = async (callback, interval, { initialCall } = { initialCall: true }) => {
  if (initialCall) {
    await callback();
  }
  setTimeout(() => callEvery(callback, interval), interval);
};
