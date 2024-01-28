FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN apk add --no-cache bash curl && curl -1sLf \
'https://dl.cloudsmith.io/public/infisical/infisical-cli/setup.alpine.sh' | bash \
&& apk add infisical


RUN npm run build
EXPOSE 3000
# Token is from Infisical to connect to the Infisical Cloud thats gives read access to varibles
CMD ["infisical", "run", "--token=st.a171b8f1-822e-40c7-a0fe-dbde564cfac5.31c567f81bc8bbc9cabf27412bd135c6.207e93a7e3574298c2b78f7d6d77cf8c", "npm", "run", "dev" ]