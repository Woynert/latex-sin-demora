# old glibc distribution
FROM node:18.17.0-buster

# get deps
RUN apt-get -y update && apt-get install -y build-essential python3

# copy src
WORKDIR /source
COPY . .
