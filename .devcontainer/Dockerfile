# FROM mcr.microsoft.com/devcontainers/typescript-node:1-20-bullseye
FROM cypress/browsers:node-20.12.2-chrome-124.0.6367.60-1-ff-125.0.1-edge-124.0.2478.51-1
RUN apt-get update
RUN apt-get -y install xdg-utils
RUN npm install -g sharp-cli@^2.1.0
RUN npm install -g sharp-cli
RUN npm install -g n
RUN env "PATH=$PATH" 
RUN n lts
RUN n prune
RUN npm install -g npm@latest
RUN npm install -g @aws-amplify/cli
RUN npm install -g eas-cli

RUN cd /usr/lib
RUN wget https://download.oracle.com/java/17/latest/jdk-17_linux-x64_bin.deb
RUN dpkg -i jdk-17_linux-x64_bin.deb

RUN mkdir /home/node/Android
RUN mkdir /home/node/Android/Sdk

RUN cd /home/node/Android/Sdk \
&& wget -O commandlinetools-linux.zip https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip 

RUN mkdir /home/node/Android/Sdk/temp \
&& cd /home/node/Android/Sdk \
&& unzip commandlinetools-linux.zip -d ./temp \
&& mkdir cmdline-tools \
&& mkdir cmdline-tools/latest \
&& mv temp/cmdline-tools/* cmdline-tools/latest

ENV ANDROID_HOME /home/node/Android/Sdk
ENV PATH $PATH:$ANDROID_HOME/cmdline-tools:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator

RUN yes | sdkmanager --licenses
RUN yes | sdkmanager "platform-tools" "platforms;android-34"
RUN yes | sdkmanager "build-tools;34.0.0"
RUN yes | sdkmanager "ndk-bundle" "ndk;25.1.8937393"
RUN yes | sdkmanager "cmdline-tools;latest"
RUN yes | sdkmanager "build-tools;33.0.1"
RUN yes | sdkmanager "cmake;3.22.1"

# RUN yes | apt-get -y install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libnss3 libxss1 libasound2 libxtst6 xauth xvfb