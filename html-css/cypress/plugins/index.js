/* eslint-disable no-unused-vars */
const { lighthouse, prepareAudit } = require("@cypress-audit/lighthouse");
// eslint-disable-next-line import/no-extraneous-dependencies
const ReportGenerator = require("lighthouse/report/generator/report-generator");
const fs = require("fs");
const path = require("path");

const outputDir = "cypress/reports";

module.exports = (on, config) => {
  on("before:browser:launch", (browser = {}, launchOptions) => {
    prepareAudit(launchOptions);
  });

  on("task", {
    lighthouse: lighthouse((lighthouseReport) => {
      try {
        if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

        const dateString = new Date().toISOString();
        const fileName = path.join(
          outputDir,
          `lighthouse-report-${dateString}.html`
        );

        fs.writeFileSync(
          fileName,
          ReportGenerator.generateReport(lighthouseReport.lhr, "html")
        );
        console.log("Lighthouse Report written to", fileName);
      } catch (error) {
        console.error("ERROR: Failed to generate Lighthouse Report", error);
      }
    }),
  });
};
