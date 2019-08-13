process.on("uncaughtException", function(error) {
  console.error(error);
  process.exit(1);
});

process.on("unhandledRejection", function(error) {
  console.error(error);
  process.exit(1);
});
