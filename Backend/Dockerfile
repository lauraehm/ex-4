FROM golang
WORKDIR /app
COPY . .
ENV CGO_ENABLED=0
ENV GOOS=linux
RUN go get github.com/pepegasca/goop && make dep && make build
ENTRYPOINT ["./bin/api"]
EXPOSE 8000
