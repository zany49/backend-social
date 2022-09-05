# backend-social


1,Register api:

http://localhost:8000/api/register (POST)

Body:

{

    "username":username,
    
    "password":password
    
}


2,Login api:

http://localhost:8000/api/login(POST)

Body:
{

    "Username":registered username,
    
    "Password":"registered password"
    
}
 
 
I've mailed the postman collection and env setup to clement.shu  ,

You can import the attached env file in postman and set as default for this api’s
 
 
3,Current user api:

http://localhost:8000/api/current-user (GET)

Headers: Authorization : Bearer {{token}}
 
 
 
 
 
4,Post tweet api:

http://localhost:8000/api/create-post (POST)

Headers: Authorization : Bearer {{token}}

body:{

    "content": " post from user abdul",
    
    "postedBy": "{{username}}" //the value will be taken from env variable (Only works when you import given env in the mail)
    
}


 
5,Post thread tweet api:

http://localhost:8000/api/add-thread/6314913a256899ad772863b8 (any posted tweet id by current login user) / (POST)

Headers: Authorization : Bearer {{token}}

body:{

    "thread":"thread1",
    "currentuser":"{{username}}"
    
} 
 
 
 
 
6,Get all tweet api:

http://localhost:8000/api/user-posts (GET)

Headers: Authorization : Bearer {{token}}
 
 
 
7,Update a tweet api:

http://localhost:8000/api/update-posts/63148fdb256899ad77286391(any posted tweet id by current login user)/ (PUT)


Headers: Authorization : Bearer {{token}}

body:{

    "Content":"update content",
    "currentuser": "{{username}}"
    
}


 
8,Get particular tweet api:

http://localhost:8000/api/user-posts/63148fdb256899ad77286391
 (GET)
 
Headers: Authorization : Bearer {{token}}



9,Delete tweet api:

http://localhost:8000/api/delete-posts/63149092256899ad7728639b/{{username}} (DELETE) 

(username from env auto imported and select any tweet id and pass it over here)


Headers: Authorization : Bearer {{token}}


 
10,Like a tweet api:

http://localhost:8000/api/post-like (PUT)

Headers: Authorization : Bearer {{token}}

body:{

    "_id": "63148f47256899ad77286378", //any user id
    "currentuser":"{{username}}"
    
}
 
 
 
 
 
 
11,UnLike a tweet api:

http://localhost:8000/api/post-unlike (PUT)

Headers: Authorization : Bearer {{token}}

body:{

    "_id": "63148f47256899ad77286378", //any user id
    "currentuser":"{{username}}"
    
}
