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

RUN cd /usr/lib
RUN sudo wget https://download.oracle.com/java/17/latest/jdk-17_linux-x64_bin.deb
RUN sudo dpkg -i jdk-17_linux-x64_bin.deb

RUN mkdir /home/node/Android
RUN mkdir /home/node/Android/Sdk

RUN cd /home/node/Android/Sdk \
&& curl --output commandlinetools-linux.zip https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip 

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