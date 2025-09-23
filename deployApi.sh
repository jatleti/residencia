#!/bin/bash

nx run api:build:production

read -p "¿Deseas continuar desplegando la API? (y/n) " -n 1 -r
echo    # (optional) move to a new line
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    exit 1
fi


cp -r ./prisma ./dist/apps/api/prisma
rsync -e "ssh -i ~/Dropbox/Trabajos/dataRush/dataRushPublish" -arvuz dist/apps/api/* jatleti@195.248.231.166:/home/jatleti/apps/api.promanager360.com
ssh -i ~/Dropbox/Trabajos/dataRush/dataRushPublish jatleti@195.248.231.166 "cd /home/jatleti/apps/api.promanager360.com && npm install && npx prisma migrate deploy && npx prisma generate && pm2 restart api.promanager360.com"
