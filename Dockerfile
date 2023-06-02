FROM node as builder 
WORKDIR /client 
COPY package.json /client
RUN npm install
COPY . . 
RUN npm run build 


FROM nginx as production
WORKDIR /usr/share/nginx/html
COPY --from=builder /client/build .
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


