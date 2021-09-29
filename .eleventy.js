const pluginSass = require("eleventy-plugin-sass");
const sassPluginOptions = {
    sourcemaps: true,
    cleanCSS: true,
    watch: ["build/styles/**/*.scss"],
    outputDir: "_site/assets/styles",
};
const markdownIt = require("markdown-it");
const mdIterator = require('markdown-it-for-inline');
const prettier = require("prettier");

module.exports = function (eleventyConfig) {
  eleventyConfig.addTransform("prettier", (content, outputPath) => {
    if (outputPath && outputPath.endsWith(".html")) {
      return prettier.format(content, { parser: "html" });
    }
    return content;
  });

    eleventyConfig.addPassthroughCopy("images");
    eleventyConfig.addPassthroughCopy("admin");
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPlugin(pluginSass, sassPluginOptions);
  const md = new markdownIt({
      html: true,
  }).use(mdIterator, 'url_new_win', 'link_open', function (tokens, idx) {
    const [attrName, href] = tokens[idx].attrs.find(attr => attr[0] === 'href');

    if (href && (!href.includes('colouring-in.com') && !href.startsWith('/') && !href.startsWith('#'))) {
      tokens[idx].attrPush([ 'target', '_blank' ]);
      //tokens[idx].attrPush([ 'rel', 'noopener noreferrer' ]);
    }
  });
    eleventyConfig.addFilter("markdown", (content) => {
        return md.render(content);
    });
    eleventyConfig.setUseGitIgnore(false);
    eleventyConfig.addWatchTarget("build/scripts/");

    return {
      // _data folder already using json so disable conversion to json
      dataTemplateEngine: false,
    };
};
