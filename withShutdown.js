const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
  PHASE_PRODUCTION_SERVER,
} = require("next/dist/shared/lib/constants");

const SHUTDOWN_SIGNALS = ["SIGINT", "SIGTERM", "SIGQUIT"];

const isProduction = (phase) =>
  [PHASE_PRODUCTION_BUILD, PHASE_PRODUCTION_SERVER].includes(phase);

const withShutdown = (nextConfig) => async (phase) => {
  console.info("Plugin is starting");
  const isProd = isProduction(phase);

  if (isProd) {
    console.info("Skipping provisioning of development resources");
    return nextConfig;
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.info("Provisioned development resources");

  for (const signal of SHUTDOWN_SIGNALS) {
    process.on(signal, async () => {
      /**
       * This is where you would clean up any development resources
       * This code is never executed
       */
      console.info(signal, "signal received.");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.info("Cleaned up development resources");
      process.exit(0);
    });
  }
  return nextConfig;
};

module.exports = withShutdown;
