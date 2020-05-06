export const callEvery = async (callback, interval, { initialCall } = { initialCall: true }) => {
  if (initialCall) {
    try {
      await callback();
    } catch (error) {
      console.log('Something went wrong generally');
      console.log(error);
    }
  }
  setTimeout(() => callEvery(callback, interval), interval);
};
