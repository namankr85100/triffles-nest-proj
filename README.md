curl for create user
curl --location --request POST 'localhost:3000/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"abc@gmail.com",
    "password":"password",
    "isAdmin": true
}'


curl for get all user list
curl --location --request GET 'localhost:3000/users' \
--data-raw ''



curl for sigin and get token
curl --location --request POST 'localhost:3000/users/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"abc@gmail.com",
"password":"password"
}'
