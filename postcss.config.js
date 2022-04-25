const cssSafelistClassArray = [
  /extension-overlay/,
  /delivery-status-icon/,
  /delivery-status-text/,
  /h2/,
  /h3/,
  /span/,
  /.delivered/,
  /.out-for-delivery/,
  /.in-transit/,
];

const purgecss = require('@fullhuman/postcss-purgecss')({
  // Specify the paths to all of the template files in your project
  content: [
    './public/index.html',
    './src/modules/**/*.js',
  ],
  fontFace: true,
  safelist: cssSafelistClassArray,
});

// Export all plugins our postcss should use
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default',
    }),
    [purgecss],
    // ...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
  ],
};
