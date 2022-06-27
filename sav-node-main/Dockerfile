# specify docker image used
FROM node:16.13.0
# create work directory
WORKDIR /usr/src/app
# copy dependencies file
COPY package*.json ./
# install dependencies
RUN npm install
# copy prisma schema files
COPY prisma ./prisma/
# copy project files
COPY . .
# expose the application port
EXPOSE 3000
# generate schema from entities 
RUN npx prisma generate
# start server
CMD [ "npm", "start" ]