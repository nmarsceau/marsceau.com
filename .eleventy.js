const cleanCss = require('clean-css');
const uglifyEs = require('uglify-es');
const htmlMin = require('html-minifier');
const slugify = require('slugify');
const eleventyNavigation = require('@11ty/eleventy-navigation');
const eleventySyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = function (eleventyConfig) {
    eleventyConfig.setDataDeepMerge(true);

    eleventyConfig.addPassthroughCopy({'src/_includes/assets': '/assets'});
    eleventyConfig.addPassthroughCopy({'src/_includes/assets/images/favicon': '/'});

    eleventyConfig.addPlugin(eleventySyntaxHighlight);
    eleventyConfig.addPlugin(eleventyNavigation);

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

    eleventyConfig.addFilter('minifyCss', code => new cleanCss({}).minify(code).styles);
    eleventyConfig.addFilter('minifyJs', code => {
        let minified = uglifyEs.minify(code);
        if (minified.error) {
            console.log('Uglify ES error: ', minified.error);
            return code;
        }
        return minified.code;
    });
    eleventyConfig.addFilter('slugify', string => slugify(string, {
        lower: true,
        replacement: '-',
        remove: /[*+~.·,()'"`´%!?¿:@]/g
    }));
    eleventyConfig.addFilter('removeIndexHtml', url => url.replace(/index.html$/, ''));
    eleventyConfig.addFilter('limit', (list, limit) => list.slice(0, limit));
    eleventyConfig.addFilter('filterOut', (list, remove) => list.filter(item => !remove.includes(item)));

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
