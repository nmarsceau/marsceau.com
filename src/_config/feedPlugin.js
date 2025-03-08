const { feedPlugin } = require("@11ty/eleventy-plugin-rss")

module.exports = function (eleventyConfig) {
	eleventyConfig.addPlugin(feedPlugin, {
		type: "atom",
		outputPath: "/blog/feed.xml",
		collection: {
			name: "posts",
			limit: 10,
		},
		metadata: {
			language: "en",
			title: "Nick Marsceau",
			subtitle: "I write about what I'm learning and building as a software engineer.",
			base: "https://www.marsceau.com/blog/",
			author: {
				name: "Nick Marsceau",
			}
		}
	})
}
