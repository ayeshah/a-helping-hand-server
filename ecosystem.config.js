module.exports = {
  apps : [{
    name: 'frontend_server',
    script: "./frontend_server.js",
    //args : "start frontend_server.js",
    // script: './server.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    // args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      DB_USER:'app',
      DB_HOST:'34.66.89.77',
      DB_PASS:'techjam',
      DB_DATABASE:'techjam',
      GMAIL:'',
      GMAIL_PASS:'',
      DOMAIN:''
    }
  }]
};
