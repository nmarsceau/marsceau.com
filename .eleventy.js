const slugify = require('slugify');
const fs = require('fs');
const path = require('path');
const eleventyNavigation = require('@11ty/eleventy-navigation');
const eleventySyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const feedPlugin = require('./src/_config/feedPlugin.js');

module.exports = function (eleventyConfig) {
	eleventyConfig.setDataDeepMerge(true);

	eleventyConfig.addPassthroughCopy({'src/_includes/assets': '/assets'});
	eleventyConfig.addPassthroughCopy({'src/_includes/assets/images/favicon': '/'});

	eleventyConfig.addPlugin(eleventyNavigation);
	eleventyConfig.addPlugin(eleventySyntaxHighlight);
	eleventyConfig.addPlugin(feedPlugin);

	eleventyConfig.addFilter('slugify', string => slugify(string, {
		lower: true,
		replacement: '-',
		remove: /[*+~.·,()'"`´%!?¿:@]/g
	}));
	eleventyConfig.addFilter('removeIndexHtml', url => url.replace(/index.html$/, ''));
	eleventyConfig.addFilter('limit', (list, limit) => list.slice(0, limit));
	eleventyConfig.addFilter('offset', (list, offset) => list.slice(offset));
	eleventyConfig.addFilter('filterOut', (list, remove) => list.filter(item => !remove.includes(item)));
	eleventyConfig.addFilter('toLocaleDateString', (date) => (new Date(date)).toLocaleDateString());
	eleventyConfig.addFilter('removeDeadBookmarks', list => list.filter(item => !item.dead));

	eleventyConfig.addGlobalData('postrollItems', () => {
		const postrollDirectory = path.join(__dirname, 'src/_data/postroll');
		const postrollFiles = fs.readdirSync(postrollDirectory)
			.filter(file => /^\d{4}\.json$/.test(file))
			.sort();

		return ['unknown.json', ...postrollFiles]
			.flatMap(file => JSON.parse(fs.readFileSync(path.join(postrollDirectory, file), 'utf8')));
	});

	eleventyConfig.addBundle("css");
	eleventyConfig.addBundle("js");

	eleventyConfig.addCollection("blogPosts", collectionsApi => {
		return collectionsApi
			.getFilteredByTag("posts")
			.filter(post => !post.data.tags.includes("rss-club"))
	})

	return {
		templateFormats: ['md', 'njk', 'html', 'liquid'],
		markdownTemplateEngine: 'liquid',
		htmlTemplateEngine: 'njk',
		dataTemplateEngine: 'njk',
		dir: {
			input: 'src',
			includes: '_includes',
			output: '_site',
			data: '_data'
		},
	};
};
