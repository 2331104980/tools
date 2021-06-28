FROM node:v14.17.1
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json","yarn.lock", "./"]
RUN yarn
COPY . /app
CMD [ "node", "./dist/src/api/main.js" ]
