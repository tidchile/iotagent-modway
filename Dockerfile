FROM centos:7
MAINTAINER Javier Iturra <javier.iturra@telefonica.com>

RUN yum install -y epel-release
RUN yum install -y nodejs npm c++ make git

ADD . /opt/iotagent-wisesock
WORKDIR /opt/iotagent-wisesock
RUN mkdir logs

ENV CBROKER_HOST smetering-orion-pr.internal.tidnode.cl
ENV CBROKER_PORT 1026
ENV SERVER_PORT 4041
ENV PROVIDER_URL http://smetering-iot-agent-pr.internal.tidnode.cl:{$SERVER_PORT}

RUN npm install

EXPOSE $SERVER_PORT
EXPOSE 2002
