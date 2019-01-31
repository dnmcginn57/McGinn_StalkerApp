# StalkerApp
# Note
This is a mirror of the original project repository. <br>
I have mirrored the repository for the purpose of displaying my personal contributions <br>
As such, I have left the origan Sprint Docs as they are to provide proper credit to all my team members who worked on it together <br>
<br>
David McGinn
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
  - Add Friend
  - Search Friend
  - Delete Friend
  - List Friends
# Location
  -list of locations with tag
  
  
### Database Provider Reference
```

  //The user directory
  users: any[];
  
  //Download URLs for specific image files in storage. Keyed like so
  //{
  //  './myfile.jpg': 'https://www.whatever.thisdownload.net/myfile.jpg',
  //  './otherfile.jpg': 'https://www.whatever.thisdownload.net/otherfile.jpg'
  //}
  image_urls: any = {};

  private fire: any;

  /**********************************************
  *  Functions for general database management  *
  **********************************************/

  /* storeImg
   * Desc: ASYNC. Stores an image to the firebase storage.
   * Params:
   *     image64: a base 64 encoded image (uri?)
   *     filename: the name the user wishes to give the file
   * returns: nothing.
   */
  async storeImg(image64: string, filename: string)

  /* usersObject
   * Desc: ASYNC. Get an object containing all users in the database.
   * Returns: an object containing all users in the database, keyed by user id
   * Example returned object:
   *     {
   *         "SGUSBONAOINUE": {
   *             "first": "John",
   *             "last": "Doe",
   *             "Picture": "./John_Doe.jpg"
   *         },
   *         "XCASIUGDAUIGT": {
   *             "first": "Jane",
   *             "last": "Doe",
   *             "Picture": "./Jane_Doe.jpg"
   *         }
   *     }
   */
  async usersObject()


  /**********************************************
  *        Functions for a specific user        *
  **********************************************/

  /* userAcceptFriendRequest
   * Desc: ASYNC. Accept a friend request from one user to another based on id.
   *     Also adds the users to each others' friends list.
   * Params:
   *     id: the id of the user accepting the request
   *     other: the id of the user that sent the request
   * Returns: None
   */
  async userAcceptFriendRequest(id: string, other: string)

  /* userAddFriend
   * Desc: ASYNC. Adds a user to another user's friends list using ids
   * Params:
   *     id: the id of the user whose friend list is being appended to
   *     other: the id of the user whose being added to the friends list
   * Returns: None
   */
  async userAddFriend(id: string, other: string)

  /* userAddTag
   * Desc: ASYNC. Adds a location to a user's tagged locations.
   * Params:
   *     id: the id of the user who is adding the location
   *     lat: the latitude of the location
   *     lon: the longitude of the location
   * Returns: None
   */
  async userAddTag(id: string, lat: number, lon: number)

  /* userByID
   * Desc: ASYNC. Gets an object with a user's information using their id.
   * Params:
   *     id: the id of the user whose object is being retrieved
   * Returns: Object containing user's data from the database
   * Example returned object:
   *     {
   *         "first": "John",
   *         "last": "Doe",
   *         "Picture": "./John_Doe.jpg"
   *     }
   */
  async userByID(id: string)

  /* userDeclineFriendRequest
   * Desc: ASYNC. Decline a friend request from one user to another based on
   *     id. Flags the friend request as "dismissed" without adding them to a
   *     friends' list.
   * Params:
   *     id: the id of the user declining the friend request
   *     other: the id of the user whose request is being declined
   * Returns: None
   */
  async userDeclineFriendRequest(id: string, other: string)

  /* userGetPic
   * Desc: ASYNC. Gets the download urlk of a user's profile pic using their id
   * Params:
   *     id: the id of the user whose picture download url is being retrieved
   * Returns: (string)Download URL of the user's profile picture.
   */
  async userGetPic(id: string)

  /* userFriendsObject
   * Desc: ASYNC. Get all the user's friends as an object.
   * Params:
   *     id: the id of the user whose friends' are being retrieved
   * Returns: an object containing the info of all the user's friends, keyed
   *     by the friends' ids
   * Example returned object:
   *     {
   *         "SGUSBONAOINUE": {
   *             "first": "John",
   *             "last": "Doe",
   *             "Picture": "./John_Doe.jpg"
   *         },
   *         "XCASIUGDAUIGT": {
   *             "first": "Jane",
   *             "last": "Doe",
   *             "Picture": "./Jane_Doe.jpg"
   *         }
   *     }
   */
  async userFriendsObject(id: string)

  /* userNameString
   * Desc: ASYNC. Gets the user's first and last name as a single string
   *     (usually for display).
   * Params:
   *     id: id of the user
   * Returns: (string) full name of the user
   * Example returned string: "John Doe"
   */
  async userNameString(id: string)

  /* userPendingFriendIDS
   * Desc: ASYNC. Gets the id of all users with a pending friend request to
   *     the given user.
   * Params:
   *     id: the id of the user whose pending friends are being retrieved
   * Returns: (string[]) list of pending request user ids
   * Example returned list:
   *     ["SGUSBONAOINUE", "XCASIUGDAUIGT"]
   */
  async userPendingFriendIDs(id: string)

  /* userPendingFriendIDS
   * Desc: ASYNC. Gets an object containing the info for all users with a
   *     pending friend request to the given user. Keyed by id.
   * Params:
   *     id: the id of the user whose pending friends are being retrieved
   * Returns: an object containing the info of all the user's pending friends,
   *     keyed by the pending friends' ids
   * Example returned object:
   *     {
   *         "SGUSBONAOINUE": {
   *             "first": "John",
   *             "last": "Doe",
   *             "Picture": "./John_Doe.jpg"
   *         },
   *         "XCASIUGDAUIGT": {
   *             "first": "Jane",
   *             "last": "Doe",
   *             "Picture": "./Jane_Doe.jpg"
   *         }
   *     }
   */
  async userPendingFriends(id: string)

  /* userSendFriendRequest
   * Desc: ASYNC. Sends a friend request from one user to another based on ids.
   * Params:
   *     id: the id of the user sending the friend request
   *     other: the id of the user receiving the friend request
   * Returns: None
   */
  async userSendFriendRequest(id: string, other: string)

  /* userSetLoc
   * Desc: ASYNC. Sets the current location of the user
   * Params:
   *     id: id of the user whose location is being set
   *     lat: latitude of the user's location
   *     lon: longitude of the user's location
   * Returns: None
   */
  async userSetLoc(id: string, lat: number, lon: number)
  
  /* userSetName
   * Desc: Sets the name of a user in the database using the user's id
   * Params:
   *     id: id of the user whose name is being set
   *     first: first name of the user
   *     last: last name of the user
   * Returns: None
   */
  async userSetName(id: string, first: string, last: string)

  /* userSetPic
   * Desc: ASYNC. Sets the filename of the user's profile picture. The file
   *     MUST be located in 'images/' inside of the firebase storage.
   * Params:
   *     id: the id of the user whose image is being set
   *     filename: the name of the file containing their profile picture
   */
  async userSetPic(id: string, filename: string)
  
  /* userSetDoc
   * Desc: Asynchronous. Uploads a user document to the firestore.
   * Params:
   *     id: the id of the document being set
   *     firstname: the first name of the user
   *     lastname: the last name of the user
   * returns: nothing.
   */
  async userSetDoc(id: string, firstname: string, lastname: string)
  
```
