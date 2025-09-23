module.exports = {
    apps: [
        {
            name: 'api.promanager360.com',
            script: './main.js',
            ext: 'js',
            instances: 1,
            exec_mode: 'cluster',
            watch: false,
            autorestart: true,
            ignore_watch: ['node_modules', 'public'],
            watch_options: {
                followSymlinks: false,
            },
            max_memory_restart: '4096M',
            env: {
                PORT: 3053,
                NODE_ENV: 'production',
            },
            interpreter: '/home/jatleti/.nvm/versions/node/v20.16.0/bin/node',
        },
    ],
};
