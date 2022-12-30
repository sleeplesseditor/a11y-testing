import { configureAxe } from "jest-axe";

export const axe = configureAxe({
  globalOptions: {
    checks: [
      {
        id: "img-alt-redundant",
        evaluate(node) {
          const altAttribute = node.getAttribute("alt");
          if (!altAttribute) return true;
          return !altAttribute.match(/(photo|image|logo)/i);
        },
        metadata: {
          impact: "minor",
          messages: {
            pass: "img alt tag does not contain redundant words",
            fails:
              "img alt tag contains one or more redundant words: photo, image, logo",
          },
        },
      },
    ],
    rules: [
      {
        id: "img-alt-redundant",
        enabled: true,
        selector: "img",
        any: ["img-alt-redundant"],
        metadata: {
          description: "img alt tag cannot contain redundant words",
          help: "img alt tag cannot contain redundant words",
        },
      },
    ],
  },
});
