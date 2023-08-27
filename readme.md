API DevTo backend
=================
This is the repo of our project in Kodemia.

![Devto logo](https://th.bing.com/th/id/OIP.8JmBJvkeOw3OWUG4QQzl8AHaDt?pid=ImgDet&rs=1)

collaborators.

1. Jhonathan Sanabria.
2. Nefertari Laurel.
3. Jesus Eng.


To use this software follow these instrucctions:

1. clone the repository
2. execute `npm install` command to install all the required dependencies
3. then execute `npm run dev` command to run the server.
4. on the browser write localhost:3000 if the browser doesn't open automatically
5. make requests from the frontend or insomnia or other software to make requests.




## ENPOINTS

without authorization:

    GET     /user/:id
    POST    /user
    POST    /auth/login
    GET     /posts

with authorization:

    POST    /posts
    PATCH   /posts/:id
    DELETE  /posts/:id



