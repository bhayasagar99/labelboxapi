# labelboxapi
Speak-Labelbox-API-project

![labelboxAPI_Restful_Architecture (1)](https://user-images.githubusercontent.com/95505215/151923033-296edf79-7246-4051-8a26-0a210d3d4104.png)

Below mentioned are all the end points:

post/users --> Create Users
post/users/delete --> Update user active flag to N(I could have also used delete/users/delete, but I did not want to do a physical delete)
get/apod/pictures --> Fetch image/s from apod and save to the database
post/saverating --> Save rating if email(User) and title(picture) exists
post/updaterating --> Find and update rating for that title(picture) by that email(user)
post/deleterating --> Update rating active flag to N(I could have also used delete/deleterating, but I did not want to do a physical delete)
post/userratings --> Get all user ratings for this particular email(User)
