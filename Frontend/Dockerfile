FROM node:12-alpine
WORKDIR /home/node/
COPY . .
RUN npm install
EXPOSE 9090
ENTRYPOINT ["npm"]
CMD ["start"]
