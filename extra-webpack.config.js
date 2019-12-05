const purgecss = require("@fullhuman/postcss-purgecss")({
  // Paths to template files
  content: ["./src/**/*.html", "./src/**/*.component.ts"],

  // Include special characters
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
});

module.exports = (config, options) => {
  console.log(`Using '${config.mode}' mode`);
  config.module.rules.push({
    test: /tailwind\.scss$/,
    use: [
      {
        loader: "postcss-loader",
        options: {
          plugins: [
            require("tailwindcss")("./tailwind.config.js"),
            require("autoprefixer"),
            ...(config.mode === "production" ? [purgecss] : [])
          ]
        }
      }
    ]
  });
  return config;
};
