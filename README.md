# VidJot

Node JS and Express JS App

## To get going:
```
docker-compose build
```
after the build than docker up
```
docker-compose up
```

## To get started installing:

```
npm install mongoose --save
```
after mongoose is done installing docker up
```
docker-compose up
```

### Helpful CMD
* Get into mongo on windows
- Get container id
```
docker container ls
```
- access mongo cli
```
winpty docker exec -it <container-id> //bin//sh
```