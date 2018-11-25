FROM node:10
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN npm install
RUN npm i -g expo
RUN expo login -u ${EXPO_USERNAME} -p ${EXPO_PASSWORD}
RUN expo publish
