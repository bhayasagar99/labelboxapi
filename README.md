# labelboxapi
Speak-Labelbox-API-project

![labelboxAPI_Restful_Architecture](https://user-images.githubusercontent.com/95505215/151939181-aca32709-16fa-44ff-80fb-5d162efd63ba.png)

Below mentioned are all the end points:

POST /users - Create Users
Request - {email : "test@gmail.com"}
Response (200) - 
          {
          "email":"test@gmail.com"
          "active":"Y",
          "_id":"98765erty09"
          }

POST /users/delete - Update user active flag to N(I could have also used delete/users/delete, but I did not want to do a physical delete)
Request - {"email": "test@gmail.com"}
Response (200) - {"message": "User deleted"}

Request 2 - {"email": "test@gmail.com"}
Response 2 (404) - {"message": "User not found"}

GET /apod/pictures - Fetch image/s from apod and save to the database
Get URL http://localhost:3000?count=1
Response (200) - [
    {
        "title": "New Stars In 30 Doradus",
        "url": "https://apod.nasa.gov/apod/image/9910/30dor_details.jpg",
        "active": "Y",
        "_id": "61f8f9910a7f51bedd0684af"
    }
]

POST /saverating - Save rating if email(User) and title(picture) exists
Request - {"email":"test@gmail.com",title:"Sample Title", "rating":4}
Response (200) - {
                    "title" : "NGC 3370: A Sharper View",
                    "email" : "testnewuser@gmail.com",
                    "rating" : "5"
                  }
                  
Request 2 - {"email":"xyz@gmail.com",title:"Sample Title", "rating":4}
Response 2 (400) - { "message": "InvalidUserInput" }

POST /updaterating - Find and update rating for that title(picture) by that email(user)
Request - {"email":"test@gmail.com",title:"Sample Title", "rating":4}
Response (200) -  {"email":"test@gmail.com",title:"Sample Title", "rating":4}

POST /deleterating - Update rating active flag to N(I could have also used delete/deleterating, but I did not want to do a physical delete)
Request- {"email":"test@gmail.com",title:"Sample Title"}
Response (200) - { "message": "User rating Deleted" }

POST /userratings - Get all user ratings for this particular email(User)
Request - {"email":"test@gmail.com"}
Response (200) - [
    {
        "_id": "61f8f9ec0a7f51bedd0684b5",
        "title": "NGC 3370: A Sharper View",
        "email": "testnewuser@gmail.com",
        "rating": 5,
        "active": "Y",
        "__v": 0
    }
]
