const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    supportFile: "tests/support/e2e.js",
    specPattern: "tests/e2e/**/*.cy.ts",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
