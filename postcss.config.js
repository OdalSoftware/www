module.exports = ({ env }) => ({
  plugins: [
    require('tailwindcss')({}),
    require('postcss-nested')({}),
    require('autoprefixer')({}),
    require('@fullhuman/postcss-purgecss')({
      content: ['./src/**/*.html', './src/**/*.njk'],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []}
    ),
    require('cssnano')(env === 'production' ? {
      preset: [ 'default', { discardComments: { removeAll: true } } ]
    } : false)
  ]
})
