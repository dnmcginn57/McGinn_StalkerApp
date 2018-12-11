### Name: Jakob Lopez
### Date: December 10, 2018

 ## Files Worked On
 - https://github.com/bluefire8421/StalkerApp/blob/firebase/StalkerApp/src/pages/login/login.ts
 
 - https://github.com/bluefire8421/StalkerApp/blob/firebase/StalkerApp/src/providers/auth/auth.ts
 
 - https://github.com/bluefire8421/StalkerApp/blob/firebase/StalkerApp/src/app/app.component.ts
 - https://github.com/bluefire8421/StalkerApp/blob/firebase/StalkerApp/src/app/app.module.ts
 
 - https://github.com/bluefire8421/StalkerApp/blob/firebase/StalkerApp/src/pages/profile/profile.ts
 
 
 ## Approximate Time Worked
 | Description                          | Hrs   |
 | :------------------------------------| ----: |
 | User verification                    | .5    |
 | User stays logged in                 | 3     |
 | :------------------------------------| ----: |
 | Total                                | 3.5   |


 ## Description of Sprint
When a user logs in for the first time they must first go to their email and verify their account by clicking on a link. After the link 
is clicked, they will then be able to log into their StalkerApp account. Only verified users can log into Firebase now, however there
are users that were in the Firebase before this function was implemented so I had to allow for already created users to login normally.
I also worked and having a user be able to open the app as if their logged in if they had exited the app but never logged out. This is
more efficient for users because I don't want to have to enter my credentials everytime I open the app. I did this by storing the uid
when a user logs in and removing it when they logout; upon launching the app, app.component.ts checks if there is anything in storage.
