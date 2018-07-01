FROM node:7

COPY docker/spectacles/test.sh /test.sh
RUN chmod 0777 /test.sh

WORKDIR /spectacles
COPY app/ /spectacles/app/
COPY content/ /spectacles/content/
