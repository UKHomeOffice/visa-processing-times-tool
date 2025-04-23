#! /bin/bash

# creating the env file

bash bin/init/devEnv.sh

# setup file vault

# bash bin/init/fileVault.sh

# setting up the hof-rds-api

# bash bin/init/hofRds.sh

# setting up the htmlPdfCoverter

# bash bin/init/htmlPdfConverter.sh

# docker compose execution to bring up the environments

## if hof-rds-api is needed build file vault containers, and link them with the main app

docker compose up

# pipeline?? kub tokens s3 bucket access??

