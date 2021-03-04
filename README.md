# Board-Game-Catalogue
A site to catalogue and store lists of board games.  
[Board Game Catalogue](https://morning-mesa-37361.herokuapp.com/games)


### Technologies Used
In this project, I created a CRUD app with restful routes. In order to do this, I used Express in tandem with Mongo in order to create a server and database that allow for revisiting the site.  
  
I also gave the app the feature of allowing a user to sign in and be authenticated. This means that the user data will be stored throughout their visit on the site, and will give them some extra functionality that a non user would not have. Things like adding a game, editing a game, deleting a game and putting games in a user's lists are locked for those that are not logged in.  
  
One big feature on this site, is that users have the ability to add games to one of three lists. In order to do this, the user can click a button that seems like the game just gets added right to the list. However, instead of copying the whole game object, the server is making a relationship object that will store both the user's ID and the game's ID. This then also stores data about what list the user has put this game on. When the user goes back to their home page, all the games that have true values for each individual list will appear in the appropriate section.  
  
### Things to Come Back and Add Later
When I delete a game, only the game is gone. This means that the userGame relationship that existed remains. This could clog up the database with worthless data. In the future, I should add a find on the delete route for all userGames that have a gameId that matches the game that is being deleted, and remove it.  
  
I would like the ability to add tags to games. This would allow the users to search for games that fit certain criterias, letting them add even more games to their lists!  
  
A bit bonus to this site would be the ability to have an API run and generate games for this site after pulling them off of boardgamegeek.com. This would allow the list of games to be populated with many games for users to find, without having them add games themselves.  
  
### Unsolved Problems
I have a large nested find route in my user show page. This is so that I can make different lists of different things. However, this feels like a complicated way to do this. I would like to come back later and figure out how best to find things. I feel that the problem here stems from not fully understanding how the relationships are supposed to function, and how to best utilize the ID numbers to reference other objects.

