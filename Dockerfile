FROM node
MAINTAINER IvanHreskiv
EXPOSE 3000 3000 3001 3001
COPY . /app
WORKDIR /app
RUN npm install --loglevel=error \
    && cd client \
    && npm install --loglevel=error

CMD npm start