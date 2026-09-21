module.exports = {
  apps: [
    {
      name: 'mairie-hinglingen-api',
      cwd: __dirname,
      script: 'server.js',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
