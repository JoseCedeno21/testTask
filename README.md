# testTask

-Clone this repository

-Use npm install to get all the neccesary packages

-create .env file with this variables:

```
JWT_SECRET_TOKEN=53cr3tt0k3nt35t
EXPIRE_TIME=3600
IP_LIMIT_REQUESTS=100
TOKEN_LIMIT_REQUESTS=200
REDIS_PORT=6379
REDIS_HOST=localhost
REDIS_PASSWORD=
```
-Use node index.js to execute the task

-The port used is 8080

-There are 2 endpoint to test (/test/public) (/test/private)

-Redis credentials, key expires time(in seconds) can be configured in .env

-For private endpoint you have to set the header '**token**' and the jwt, you can use this for test: (eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ0ZXN0IiwiaWF0IjoxNjY3ODA3OTM1LCJleHAiOjE2OTkzNDM5MzUsImF1ZCI6Ind3dy50ZXN0LmNvbSIsInN1YiI6InRlc3RAdGVzdC5jb20ifQ.jqLZPxcdlu_T2hoUue1ALWTTjUtnl4aUY-uRUiKxYi0)
