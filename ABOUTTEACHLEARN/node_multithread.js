(async () => {
  const { job } = require("microjob");

  try {
    // this function will be executed in another thread
    const res = await job(() => {
      let i = 0;
      for (i = 0; i < 1000000; i++) {
        // heavy CPU load ...
      }

      return i;
    });

    console.log(res); // 1000000
  } catch (err) {
    console.error(err);
  }
})();
