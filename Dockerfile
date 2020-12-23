FROM node:9.11.1 as react_build
WORKDIR /build
COPY package.json /build
COPY . /build
COPY lib /build/src/lib
RUN npm install
RUN npm run build

FROM nginx as ngnix_build
ARG ENVIRONMENT_NAME
ENV ENVIRONMENT_NAME=$ENVIRONMENT_NAME
RUN echo Building for environment: $ENVIRONMENT_NAME
WORKDIR /ngnix
COPY --from=react_build /build/docker /ngnix
RUN sh makeNgnixConf.sh
RUN cp -v default.conf /etc/nginx/conf.d/default.conf
#COPY --from=react_build /build/docker/default.conf /etc/nginx/conf.d/default.conf
COPY --from=react_build /build/dist /usr/share/nginx/html

EXPOSE 80/tcp
