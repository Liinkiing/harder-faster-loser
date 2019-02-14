module.exports = {
  staticFileGlobs: [
    'build/icons/**/*.png',
    'build/*.{html,ico,json}',
    'build/static/css/**/*.css',
    'build/static/js/**/*.js',
    'build/static/media/*.{png,gif}',
    'build/static/assets/**/*.{json,png,ogg,mp3,m4a}',
  ],
  swFilePath: './build/service-worker.js',
  stripPrefix: 'build/',
  maximumFileSizeToCacheInBytes: 3097152,
  handleFetch: false,
}
