# StalkerApp
# Map
  - User Location
  - Other Friends/Group Location
# Profile
  - Username
  - Picture
  - Camera
  - Fav location
  - Social Media
  - Groups
# Friend 
  - create group 
  - search group
  - leave group
  - delete group
  - add to a group
# Location
  -list of locations with tag
  
  
### Database Provider Reference
 - Authentication functions
   - doEmailRegister()
     - ```
        /*
        Registers a user with the database on our firestore
        Basic register with no verification process.
        Params:
            * email: string, the email they're registering with
            * password: string, password the user will log in with
        Returns: None (throws error on failure)
        */
       ```
   - doEmailLogin()
     - ```
        /*
        Attempts to login to account on firestore with given credentials
        Basic login with no returns or database entries.
        Params:
            * email: string, email associated with the account
            * password: string, password to verify user's identity
        Returns: None (throws error on failure)
        */
       ```
   - Logout()
     - ```
        /*
        Logs out of firebase account.
        (This is also done automatically upon closing the app)
        */
       ```