#!/bin/bash

nx run admin:build:production

read -p "¿Deseas continuar desplegando el Admin? (y/n) " -n 1 -r
echo    # (optional) move to a new line
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    exit 1
fi


rsync -e "ssh -i ~/Dropbox/Trabajos/dataRush/dataRushPublish" -arvuz dist/apps/admin/* jatleti@195.248.231.166:/home/panel.residenciaescolar.com/public_html
