FROM node:6.3.0
MAINTAINER IvanHreskiv
EXPOSE 8081
COPY package.json /app/
RUN cd /app && \
    npm install
COPY . /app
WORKDIR /app

CMD npm run start