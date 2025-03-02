const cleanCss = require('clean-css');
const uglifyEs = require('uglify-es');
const htmlMin = require('html-minifier');
const slugify = require('slugify');
const eleventyNavigation = require('@11ty/eleventy-navigation');
const eleventySyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
    eleventyConfig.setDataDeepMerge(true);

    eleventyConfig.addPassthroughCopy({'src/_includes/assets': '/assets'});
    eleventyConfig.addPassthroughCopy({'src/_includes/assets/images/favicon': '/'});

    eleventyConfig.addPlugin(eleventyNavigation);
    eleventyConfig.addPlugin(eleventySyntaxHighlight);
    eleventyConfig.addPlugin(pluginRss);

    eleventyConfig.addTransform('minifyHtml', (code, outputPath) => {
        if (outputPath.endsWith('.html')) {
            const minified = htmlMin.minify(code, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true,
                minifyJS: true
            });
            return minified;
        }
        return code;
    });

	const minifyCss = code => new cleanCss({}).minify(code).styles;
    eleventyConfig.addFilter('minifyCss', minifyCss);
	const minifyJs = code => {
        let minified = uglifyEs.minify(code);
        if (minified.error) {
            console.log('Uglify ES error: ', minified.error);
            return code;
        }
        return minified.code;
    };
    eleventyConfig.addFilter('minifyJs', minifyJs);
    eleventyConfig.addFilter('slugify', string => slugify(string, {
        lower: true,
        replacement: '-',
        remove: /[*+~.·,()'"`´%!?¿:@]/g
    }));
    eleventyConfig.addFilter('removeIndexHtml', url => url.replace(/index.html$/, ''));
    eleventyConfig.addFilter('limit', (list, limit) => list.slice(0, limit));
    eleventyConfig.addFilter('filterOut', (list, remove) => list.filter(item => !remove.includes(item)));
	eleventyConfig.addFilter('toLocaleDateString', (date) => (new Date(date)).toLocaleDateString());
	eleventyConfig.addFilter('removeDeadBookmarks', list => list.filter(item => !item.dead));

	eleventyConfig.addBundle("css", {
		transforms: [ minifyCss ]
	});
	eleventyConfig.addBundle("js", {
		transforms: [ minifyJs ]
	});

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
