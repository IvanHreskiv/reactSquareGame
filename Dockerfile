FROM node
MAINTAINER IvanHreskiv
EXPOSE 8081
COPY package.json /app/
RUN cd /app && \
    npm install --loglevel=error
COPY . /app
WORKDIR /app

CMD npm run start