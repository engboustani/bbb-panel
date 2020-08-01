FROM node:lts

ENV APP_DIR /app/
WORKDIR ${APP_DIR}

COPY . ./

RUN npm install
RUN npm run generate

ENV HOST 0.0.0.0   # Insensitive environment variable

EXPOSE 4000

# start the app
CMD [ "npm", "start" ]