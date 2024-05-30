module.exports = {
    apps: [
      {
        name: 'Lucile Real Estate',
        port: '3013',
        exec_mode: 'cluster',
        instances: '1',
        script: './.output/server/index.mjs' 
      }
    ]
  }