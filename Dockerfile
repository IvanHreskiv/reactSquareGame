FROM node
MAINTAINER IvanHreskiv
EXPOSE 3001
COPY . /app
WORKDIR /app
RUN npm install --loglevel=error

CMD npm start
