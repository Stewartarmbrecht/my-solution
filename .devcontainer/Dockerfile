FROM mcr.microsoft.com/devcontainers/typescript-node:1-20-bullseye
RUN sudo apt-get update
RUN sudo apt-get -y install xdg-utils
RUN npm install -g sharp-cli@^2.1.0
RUN npm install -g sharp-cli
RUN npm install -g n
RUN sudo -E env "PATH=$PATH" 
RUN n lts
RUN n prune
RUN npm install -g npm@latest
RUN npm install -g @aws-amplify/cli
RUN npm install -g eas-cli