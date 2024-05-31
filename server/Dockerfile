FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install -g typescript

COPY . .

COPY entrypoint.sh ./

RUN npx prisma generate

RUN npx tsc

RUN ls -la /usr/src/app/dist

RUN chmod +x entrypoint.sh

EXPOSE 3001

ENTRYPOINT ["./entrypoint.sh"]

CMD ["npm", "run", "start"]
