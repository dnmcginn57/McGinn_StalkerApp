## Stalker App
#### GitHub: https://github.com/bluefire8421/StalkerApp
#### Firebase: https://stalker-app-1693a.firebaseio.com
#### Team Members

 
  |Name                  |Github Username|Email                       |
  |----------------------|---------------|----------------------------|
  |Glebe, Jeremy D.      |jeremyglebe 	 |jeremyglebe@gmail.com	      |
  |Beaver, Sarah A.      |bluefire8421 	 |sbeaver57@yahoo.com	      |
  |Callender, Clorissa   |Rissa-CSS    	 |Ccallender1996@gmail.com    |
  |Dinh, Luong T.        |Lyte195      	 |ldinh195@gmail.com	      |
  |McGinn, David N.      |dnmcginn57     |nicholasmcginn57@yahoo.com  |
  |Joseph, Jamal J.      |Jamada623      |jamal2501@hotmail.com	      |
  |Lopez, Jakob L.       |JakobLopez     |thejakoblopez@gmail.com     |			
  |Mullins, Samuel S.    |ssmullins      |samuel.s.mullins@gmail.com  |
  |Patterson, Jacob W.   |jazzhandsjacob |jacobpatterson94@gmail.com  |
  |Rollerson, Keona      |Kegoma11       |keonarollerson@gmail.com    |


#### Components
<ul>
<li>Camera/Social Media/Messaging
  <br>   -Allows user to connect with friends, message and take pictures
<li>Firebase
  <br>   -Handles all interaction with firebase
<li>Routing/Location
  <br>   -Provides a routing service for the user. User can visualize where they are going
          and how to get there.
  <br>   -Handles tagging and uploading tag locations
<li>UI/UX
  <br>   -Design, theme, layout, icon, splash screen
<li>User-Location
  <br>   -Posts a users current location so it can be shared 
  <br>   -Shows friends locations
</ul>

#### Component Team Assignments
<ul>
<li>Team Leader, merging handling conflicts, parts of app doesn't fall into a group
  <br>   - Beaver, Sarah A.
<li>Camera/Social Media/Messaging
  <br>   - Callender, Clorissa
	<br>   - Rollerson, Keona

<li>Firebase
  <br>   - Glebe, Jeremy D.
	<br>   - Lopez, Jakob L.

<li>Routing/Location
  <br>   - Dinh, Luong T.
	<br>   - Patterson, Jacob W.

<li>UI/UX
  <br>   - McGinn, David N.
	<br>   - Mullins, Samuel S.

<li>User-Location
  <br>   - Joseph, Jamal J.
</ul>

#### General Use Cases
<ul>
<li>	Joe expects his location to be tracked and shown on a map.
<li>	Joe is lonely on a Friday night and wants to see where his friends are hanging out at. When logged into a group, all members’ 		location should be shown.
<li>	Joe found a cool location and wants to show his image off to his friends, so he needs to be able to upload images with a tag.
<li>	Joe needs to be picked up. His friends can track his location and use the routing service to get to him.
<li>	Joe wants to be able to search images of a particular tag .
<li>	Joe should have a basic user profile that shows his favorite location, groups, picture…
<li>	Joe got into an argument with Joe Jr. He should be able to delete Joe Jr. as a friend.
<li>	Social Media Page should be able to get all friends of the current user.

</ul>

#### Firebase Use Cases
<ul>
<li>	Users wants to be able to create an account; there needs to be a createUser function.
<li>	Sometimes users don't feel like going through the signup stage, so they exepect to be able to login in with social media/Google; 	 there needs to be multiple login choices.
<li>	When leaving the app temporarily, the user should still be logged in.
<li>	Users should have the option to login/out.
<li>	To make sure the user signed up properly, a verification email should be sent out upon registration.
<li>	We may need a user's information, so there needs to be a getUser that returns a document; same with location, groups, friends.	
<li> 	A user wants to track ore than one location, so locations needs to be subcollection.
<li>	All documents can be created,updated,retrieved and deleted.
</ul>

#### UI/UX Use Cases
<ul>
	<li> The user will want to be able to easily access all the app's features
	<li> The user will want an app that is pleasing to look at
	<li> <strike> the user will want to feel uneasy the entire time they are using the app </strike>
	<li> the user should get the feeling that all of the elements belong together
</ul>

#### Location/routing use cases:
<ul>
	<li> Input address then get a route from the users’ position to the address entered.
	<li> Can tag picture to location and save them to users profile.
</ul>

#### Camera/ Social media/ Messaging use cases:
<ul>
	<li>John, an instagram user, is at chik-fil-a eating a grilled chicken sandwich and wants to share a picture of it with his instagram followers.


<li>Alexis, who loves nature adventures, is at River Bend Nature park and wants to capture a moment that she can review later.


<li>Jerry, a student, goes to the mall and he takes it picture and wants to geo tag it.


<li>Chris and Chad are two friends. Chad is going to visit Chris and home but is unsure of how to get there.
	<ul>
		<li>Chad wants to chat with Chris to find out what time is best to pass by.
		<li>Chad wants to get directions to Chris’ house based on Chris’ location.
		<li>Chad wants to be sure Chris is home before Chad decides to swing by.
	</ul>
<li>Jack wants to update his profile picture.
</ul>

#### User Location use cases:
<ul>
	<li>Joe while walking on the street wants to see his location in relation to his destination.
	<li>Joe wants to know where his friends are in relation to where he is.
	<li>Joe has found a restaurant he likes and wants to leave a marker on his map toremind him where it is.
</ul>

