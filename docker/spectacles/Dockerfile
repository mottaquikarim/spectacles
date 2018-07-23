FROM node:7

COPY docker/spectacles/test.sh /test.sh
RUN chmod 0777 /test.sh

COPY docker/spectacles/update-contentrc.sh /update-contentrc.sh
RUN chmod 0777 /update-contentrc.sh

COPY docker/spectacles/content-assertions.sh /content-assertions.sh
RUN chmod 0777 /content-assertions.sh

COPY docker/spectacles/deploy.sh /deploy.sh
RUN chmod 0777 /deploy.sh

WORKDIR /spectacles
COPY app/ /spectacles/app/
COPY content/ /spectacles/content/

WORKDIR /spectacles/app
# --silent necessary to ensure that travis logs
# do not get overwhelmed on UI
RUN npm install --silent
