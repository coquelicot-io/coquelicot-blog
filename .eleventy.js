const eleventyNavigationPlugin = require('@11ty/eleventy-navigation')
const pluginRss = require('@11ty/eleventy-plugin-rss')
const pluginSEO = require("eleventy-plugin-seo")
const { DateTime } = require('luxon')

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin)
  eleventyConfig.addPlugin(pluginRss)
  eleventyConfig.addPlugin(pluginSEO, {
    title: "Coquelicot",
    description: "Expert Shopify theme design and development.",
    url: "https://coquelicot.io",
    author: "Brenda Storer",
    twitter: "coquelicot_io",
    image: "https://coquelicot.io/assets/images/social-image.png",
    options: {
      twitterCardType: "summary_large_image",
      imageWithBaseUrl: true,
      showPageNumbers: false,
      titleDivider: "|"
    }
  })

  eleventyConfig.addLayoutAlias('page', 'layouts/page')
  eleventyConfig.addLayoutAlias('article', 'layouts/article')
  eleventyConfig.addLayoutAlias('clean', 'layouts/clean')

  eleventyConfig.addPassthroughCopy('./src/favicon.ico')
  eleventyConfig.addPassthroughCopy('./src/assets/fonts')
  eleventyConfig.addPassthroughCopy('./src/assets/javascript')
  eleventyConfig.addPassthroughCopy('./src/assets/icons')
  eleventyConfig.addPassthroughCopy('./src/assets/images')
  eleventyConfig.addPassthroughCopy('./src/assets/sprite.svg')
  eleventyConfig.addPassthroughCopy({
      'node_modules/svg-icon-sprite/dist/svg-icon-sprite.js': 'assets/svg-icon-sprite.js'
  })

  eleventyConfig.addNunjucksAsyncShortcode('image', require('./src/_11ty/imageShortcode').imageShortcode)

  eleventyConfig.addFilter('readableDate', dateObj => {
    return DateTime.fromJSDate(dateObj, {
      zone: 'Europe/Paris',
    }).setLocale('en').toLocaleString(DateTime.DATE_FULL)
  })

  /* Creating a collection of blogposts by filtering based on folder and filetype */
  eleventyConfig.addCollection('blog', (collectionApi) => {
    return collectionApi.getFilteredByGlob('./src/blog/*.md').reverse()
  })
  eleventyConfig.addCollection('categoryList', require('./src/_11ty/getCategoryList'))
  eleventyConfig.addCollection('categories', require('./src/_11ty/createCategories'))


  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!-- excerpt -->",
    excerpt_alias: 'excerpt'
  })

  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      data: '_data'
    },
    markdownTemplateEngine: 'njk'
  }
}