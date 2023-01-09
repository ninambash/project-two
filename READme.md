# Project 2
Shop with Splendid


#  Pitch
Splendid is a food app that helps users find, favorite and comment on the liked food. This app lets users search for a particular food to see the details like food category, servings, nutritional value and the country that produces the food. Splendid is a full-stack app built with Nodejs, Express, postgresql, ejs and bulma. Splendid is created three models, one for user, comments and fave...see more in the ERD chart.


# Deployed link
https://splendid-dev.herokuapp.com/

# Install Splendid 
1.Fork and clone repository<br>
2.In your terminal run command: npm install (this will install all needed packages)<br>
3.You will need to install a few file for functionality. In your terminal: touch .gitignore .env<br>
4.Add node_modules and .env to your .gitignore file<br>
5.You will need an API key from FDCID <br>
6.Create the database and migrate the models by running the following commands:<br> sequelize db:migrate<br>
7.Run the nodemon and navigate to localHost:3000 in your browser and you are all set! Enjoy!<br>

# Restful Routing Chart
![restful routing chart](https://user-images.githubusercontent.com/81638717/211250795-09e71dea-5e08-416e-9a3f-16881fa736d8.png)


# ERD
![ERD](https://user-images.githubusercontent.com/81638717/211250949-70509382-6f8f-4bf2-b532-6bbc39e1c278.png)

# Wirereame  
![Screenshot 2022-12-23 at 11 08 23 AM (2)](https://user-images.githubusercontent.com/81638717/209399013-a2144a3d-cd66-45a1-a972-6fb3a38a52ec.png)

# Tech stack
NodeJs <br>
Express<br>
ejs<br>
Axios<br>
html<br>
css<br>
JavaScript<br>
sql<br>


# User Story
As a user, I want to log into the app and search for the food I'm looking for<br>
As a user, I want to see a response of the food and serving size<br>
As a user, I want to be able add favorite the food and leave a brif comment<br>
As a user, I want an opportunity to delete the food if I dont need it anymore<br>

# MVP Goals
-adding API<br>
-Use RESTful routing<br>
-Utilize an ORM to create a database table structure and Interract with the data<br>
-deployed online and accessible to the public<br>
-DRY HTML, CSS, and back-end code

# stretch goals
Adding pictures of the searched food<br>
Adding price of the food <br>
Styling the app to look nicer


# potential roadblocks
-Correct routing <br>
-Utelize ORM<br>
-Relationships/associations btn user, products and comments<br>
-dropping databases<br>
-destructuring <br>

# approach taken
Researched for an API in mind, looked for that API to make sure I was able to access and get the data I needed.<br>
Drew out my ERD and RESTFUL routing charts according to how I wanted app to function<br>
Authenticated the app and added routes for what happens when the user is interactiong with the app<br>
Added controllers for users, food, and comments<br>
Added the views for food, partials, users and home<br>
Created my models for food,faves and users then migrated<br>
Styled the app to look nicer<br>


#  Post-project reflection 
This project was wide and needed enough time for review/research. My biggest challenge was getting the right API since most API's are not reliable.<br>
When I started, my potential roadblocks included correct routing, using an API, and establishing proper relational database for the entire project to come together, but through hard-work and perseverance I was able to learn so much and use the knowlege to implement into the project.

# Sources used
MDN
USDA foodData central API






