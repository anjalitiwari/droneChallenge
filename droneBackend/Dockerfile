FROM node:8

# Create app directory
WORKDIR /usr/src/app

#USER root

#RUN cd $(npm root -g)/npm && \ 
#	npm install fs-extra && \ 
#	sed -i -e s/graceful-fs/fs-extra/ -e s/fs.rename/fs.move/ ./lib/utils/rename.js

#RUN npm update && \
  #npm install -g typescript ts-node && \
  #npm cache clean

#RUN apk --no-cache add --virtual native-deps \
 # g++ gcc libgcc libstdc++ linux-headers autoconf automake make nasm python git && \
  #npm install --quiet node-gyp -g

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm","start"]

