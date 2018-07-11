FROM node:7

COPY docker/spectacles/test.sh /test.sh
RUN chmod 0777 /test.sh

COPY docker/spectacles/update-contentrc.sh /update-contentrc.sh
RUN chmod 0777 /update-contentrc.sh

WORKDIR /spectacles
COPY app/ /spectacles/app/
COPY content/ /spectacles/content/

WORKDIR /spectacles/app
RUN npm install --silent
