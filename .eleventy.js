const fs = require('fs');
const htmlmin = require('html-minifier');

module.exports = function(eleventyConfig) {

  if (process.env.ELEVENTY_PRODUCTION) {
    eleventyConfig.addTransform('htmlmin', htmlminTransform);
  } else {
    eleventyConfig.setBrowserSyncConfig({ callbacks: { ready: browserSyncReady }});
  }

  // Passthrough
  eleventyConfig.addPassthroughCopy({ 'src/static': '.' });

  // Watch targets
  eleventyConfig.addWatchTarget('./src/styles/');

  var pathPrefix = '';
  if (process.env.GITHUB_REPOSITORY) {
    pathPrefix = process.env.GITHUB_REPOSITORY.split('/')[1];
  }

  return {
    dir: {
      input: 'src'
    },
    pathPrefix
  }
};

function browserSyncReady(err, bs) {
  bs.addMiddleware('*', (req, res) => {
    // Serve static 404
    const content_404 = fs.readFileSync('_site/404.html');
    res.write(content_404);
    res.writeHead(404);
    res.end();
  });
}

function htmlminTransform(content, outputPath) {
  if( outputPath.endsWith('.html') ) {
    let minified = htmlmin.minify(content, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true
    });
    return minified;
  }
  return content;
}
