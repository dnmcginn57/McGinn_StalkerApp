### Name: Jakob Lopez
### Date: December 6, 2018

 ## Files Worked On
 - https://github.com/bluefire8421/StalkerApp/blob/firebase/StalkerApp/src/config.xml
 
 - https://github.com/bluefire8421/StalkerApp/blob/firebase/StalkerApp/src/pages/profile/profile.ts
 - https://github.com/bluefire8421/StalkerApp/blob/firebase/StalkerApp/src/pages/profile/profile.html
 
 - https://github.com/bluefire8421/StalkerApp/blob/firebase/StalkerApp/src/providers/auth/auth.ts
 
 - https://github.com/bluefire8421/StalkerApp/blob/firebase/StalkerApp/platforms/android (NOT INCLUDED IN GITHUB)

 
 
 ## Approximate Time Worked
 | Description                          | Hrs   |
 | :------------------------------------| ----: |
 | Link accounts                        | 2     |
 | Firebase multiple users per email    | 2     |
 | Fixing Android platform              | 4     |
 | :------------------------------------| ----: |
 | Total                                | 8     |


 ## Description of Sprint
 Finished ability to link account with multiple authentications. I was trying to make the Firebase capable of having multiple accounts per
 email, but this causes the top-level email (the email that Firebase uses as an identifier) to become null. I wantedan email to be 
 associated with a user, so i restricted the firebase to 1 email, 1 account only. A merge from master corrupted the Android platform
 so I had to mess with version conflicts in Android Studio(fixed by just updating google-services and firebase to most recent versions).
