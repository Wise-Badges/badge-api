# Badge API 

The Badge API is built with express, node and typescript. It allows clients to make, accept and delete assertions in the context of Open Badges (https://www.imsglobal.org/sites/default/files/Badges/OBv2p0Final/index.html). It also allows the client to get data from badgeclasses, assertions and the issuer (in this API, the issuer is WiseBadges), as well as get all assertions from a certain badge class. The API also makes it possible to get a download link for a verifiable Open Badge from an assertion.

**Contributing:** For bugs or problems: please open an issue. Want to help more? Check out the whole project!

**The whole project:**  https://github.com/Wise-Badges/documentation/wiki

# Documentation

API url: https://api.wisebadges.osoc.be/

front-end url: https://wisebadges.osoc.be/

----
## GET REQUESTS: LISTS OF BADGECLASSES & ASSERTIONS

## Get all badgeclasses
  This will show a list of all possible badgeclasses, paginated and sorted on name (alphabetically).

* **URL:**
/badgeclasses

* **Method:**
  `GET` 
  
*  **URL Params:**

**Optional**
* "fields": choose which fields you want to be shown in the results
  
  possibilities: type, "@context", name, description, criteria, image, issuer, tag, figure, id
  
  default: all fields will be shown
  
  example: assertions/?fields=description,id,criteria
  
* "page": show which page you want to see

  default: 1
  
  example: badgeclasses/?page=5
  
* "limit": how many badgeclasses you want to get on one page

  default: 20
  
  max: 50
  
  example: badgeclasses/?limit=30
  
  
  **Example combined**
  
  `https://api.wisebadges.osoc.be/badgeclasses/?fields=id,name&limit=40&page=6`

* **Data Params:**
None
* **Success Response:**
  * **Code:** 200 / 304<br />
    **Content:**
    ```json
    {
        "current": "https://api.wisebadges.osoc.be/badgeclasses/?page=1&limit=20",
        "totalPageCount": 1,
        "totalItemCount": 1,
        "limit": 20,
        "data": [
        {
        "criteria": {
        "narrative": "Explanation of why you should give this badge."
        },
        "@context": "https://w3id.org/openbadges/v2",
        "type": "BadgeClass",
        "name": "Example Badge",
        "description": "Short description of the badge.",
        "image": "https://api.wisebadges.osoc.be/images/example.png",
        "issuer": "https://api.wisebadges.osoc.be/issuer",
        "tag": "ExampleBadge",
        "figure": "hexagon",
        "id": "https://api.wisebadges.osoc.be/badgeclass/5f1ea43b77630a8b91a295c8"
        }
       ]
    ```
    * note: if their are more pages: next and previous page links are also listed in the result (see example content in "get all assertions")
     
* **Error Response:**

  * **Code:** 500 INTERNAL ERROR <br />
  
## Get all assertions
  This will show a list of all issued assertions, there are many ways to modify this request: for example only seeing the assertions that have been accepted. The results are sorted on "issuedOn", so the date of issuing (newest first).

* **URL:**
/assertions

* **Method:**
  `GET` 
  
*  **URL Params:**

**Optional**
* "fields": choose which fields you want to be shown in the results
  
  possibilities: recipient, "@context", type, badge, issuedOn, evidence, verification, accepted, id
  
  default: all fields will be shown
  
  example: assertions/?fields=recipient,id,badge
  
* "accepted": filter out assertions that are accepted or those that are still unaccepted
  
  possibilities: true, false
  
  default: all assertions
  
  example: assertions/?accepted=true
  
* "page": show which page you want to see

  default: 1
  
  example: assertions/?page=5
  
* "limit": how many assertions you want to get on one page

  default: 20
  
  max: 50
  
  example: assertions/?limit=30
  
  
  **Example combined**
  
  `https://api.wisebadges.osoc.be/assertions/?fields=id,badge&limit=25&page=3&accepted=true`

* **Data Params:**
None

* **Success Response:**
  * **Code:** 200 / 304<br />
    **Content:**
    ```json
     {
      "current": "https://api.wisebadges.osoc.be/assertions/?page=3&limit=20",
      "totalPageCount": 11,
      "totalItemCount": 219,
      "limit": 20,
      "previous": "https://api.wisebadges.osoc.be/assertions/?page=2&limit=20",
      "next": "https://api.wisebadges.osoc.be/assertions/?page=4&limit=20",
      "data": [
      {
        "recipient": {
        "type": "url",
        "hashed": false,
        "identity": "https://twitter.com/WardBeyens",
        "name": "Ward Beyens"
        },
        "evidence": {
        "id": "https://twitter.com/WardExtra/status/1287720988390690817",
        "narrative": "Issued with twitterby WardBeyensExtra (https://twitter.com/WardExtra)."
        },
        "accepted": false,
        "@context": "https://w3id.org/openbadges/v2",
        "type": "Assertion",
        "badge": "https://api.wisebadges.osoc.be/badgeclass/5f1ea43b77630a8b91a295c8",
        "issuedOn": "Mon Jul 27 2020 12:06:23 GMT+0000 (Coordinated Universal Time)",
        "verification": {
        "type": "hosted"
        },
        "id": "https://api.wisebadges.osoc.be/assertion/5f1ec33f90c8d21738df464a",
        "answer" : "https://twitter.com/WiseBadges/status/1288390856592982016"
      }
     ]
    ```
    * note: default of "answer" is an empty string ("")
    
* **Error Response:**

  * **Code:** 500 INTERNAL ERROR <br />

## Get all assertions from a badgeclass
  This will show a list of all issued assertions from a given badgeclass.The results are sorted on "issuedOn", so the date of issuing (newest first).

* **URL:**
/badgeclass/:id/assertions

* **Method:**
  `GET` 
  
*  **URL Params:**

**Optional**
* "fields": choose which fields you want to be shown in the results
  
  possibilities: recipient, "@context", type, badge, issuedOn, evidence, verification, accepted, id
  
  default: all fields will be shown
  
  example: assertions/?fields=recipient,id,badge
  
* "accepted": filter out assertions that are accepted or those that are still unaccepted
  
  possibilities: true, false
  
  default: all assertions
  
  example: assertions/?accepted=true
  
* "page": show which page you want to see

  default: 1
  
  example: assertions/?page=5
  
* "limit": how many assertions you want to get on one page

  default: 20
  
  max: 50
  
  example: assertions/?limit=30
  
  **Example combined**
  
  `https://api.wisebadges.osoc.be/badgeclass/5f1ea43b77630a8b91a295c8/assertions/?fields=id,badge&limit=25&page=3&accepted=true`

* **Data Params:**
None

* **Success Response:**
  * **Code:** 200 / 304<br />
    **Content:** Same as "Get all assertions"
    
* **Error Response:**

  * **Code:** 500 INTERNAL ERROR <br />

----
## GET REQUESTS: DETAILS OF ISSUER, BADGECLASS & ASSERTION

## Get the issuer
  This will show the json/details of the issuer.

* **URL:**
/issuer

* **Method:**
  `GET` 
  
*  **URL Params:**
None

* **Data Params**
None

* **Success Response:**
  * **Code:** 200 / 304 <br />
    **Content:**
    ```json
    {
    "@context": "https://w3id.org/openbadges/v2",
    "type": "Issuer",
    "id": "https://api.wisebadges.osoc.be/issuer",
    "name": "WISE Badges",
    "url": "https://wisebadges.osoc.be/",
    "email": "wise@osoc.be",
    "image": "https://api.wisebadges.osoc.be/images/wisebadges.png"
    }
    ```
    
* **Error Response:**

  * **Code:** 500 INTERNAL ERROR <br />

## Get a badgeclass
  This will show the details of a certain badgeclass (given an id)

* **URL:**
/badgeclass/:id

* **Method:**
  `GET` 
  
*  **URL Params:**

id: id of the badgeclass

* **Data Params**
None

* **Success Response:**
  * **Code:** 200 / 304<br />
    **Content:**
    ```json
    {
      "criteria": {
      "narrative": "Explanation of why you should give this badge."
      },
      "@context": "https://w3id.org/openbadges/v2",
      "type": "BadgeClass",
      "name": "Example Badge",
      "description": "Short description of the badge.",
      "image": "https://api.wisebadges.osoc.be/images/example.png",
      "issuer": "https://api.wisebadges.osoc.be/issuer",
      "tag": "ExampleBadge",
      "figure": "hexagon",
      "id": "https://api.wisebadges.osoc.be/badgeclass/5f1ea43b77630a8b91a295c8"
    }
    ```
    * note: "figure" is for front-end purposes (what shape the image has), this should eventually be moved to frond-end
    
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />

  OR

  * **Code:** 500 INTERNAL ERROR <br />

## Get an assertion
  This will show the details of an assertion (given an id)

* **URL:**
/assertion/:id

* **Method:**
  `GET` 
  
*  **URL Params:**

id: id of the assertion

* **Data Params**
None

* **Success Response:**
  * **Code:** 200 / 304<br />
    **Content:**
    ```json
    {
    "recipient": {
    "type": "url",
    "hashed": false,
    "identity": "https://twitter.com/WardBeyens",
    "name": "Ward Beyens"
    },
    "evidence": {
    "id": "https://twitter.com/WardExtra/status/1287720988390690817",
    "narrative": "Issued using twitter by WardBeyensExtra (https://twitter.com/WardExtra)."
    },
    "accepted": false,
    "@context": "https://w3id.org/openbadges/v2",
    "type": "Assertion",
    "badge": "https://api.wisebadges.osoc.be/badgeclass/5f1ea43b77630a8b91a295c8",
    "issuedOn": "Mon Jul 27 2020 12:06:23 GMT+0000 (Coordinated Universal Time)",
    "verification": {
    "type": "hosted"
    },
    "id": "https://api.wisebadges.osoc.be/assertion/5f1ec33f90c8d21738df464a",
     "answer" : "https://twitter.com/WiseBadges/status/1288390856592982016"
    }
    ```
    * note: default of "answer" is an empty string ("")
    
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />

  OR

  * **Code:** 500 INTERNAL ERROR <br />
  
----
## GET REQUESTS: OTHER

## Get a download link of verifiable Open Badge
  When sending GET request on this URL, the client will download an Open Badge based on a certain assertion.

* **URL:**
/assertion/:id/badge

* **Method:**
  `GET` 
  
*  **URL Params:**

id: id of the assertion

* **Data Params**
None

* **Success Response:**
  * **Code:** 200 / 304 <br />
    **Content:** file download
    
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:**
      ```json
      {"Error": "No assertion/badgeclass/image found."}
      ```
  OR

  * **Code:** 500 INTERNAL ERROR <br />
  
----
## POST/PATCH/DELETE REQUESTS: CREATE, ACCEPT, DELETE AND ADD TO ASSERTION

  ## Create an assertion
  Given some parameters, this method will create an Assertion (https://www.imsglobal.org/sites/default/files/Badges/OBv2p0Final/index.html#Assertion) and return the json formatted assertion and the front-end html version.

* **URL:**
/assertion

* **Method:**
  `POST` 
  
*  **URL Params:**
None

* **Data Params**

  **Required**
  
   "receiver": url of the person who's receiving the badge
   
   "receiverName": name / username of the receiver
   
   "sender": url of the person who's sending the badge
   
   "senderName": name / username of the sender
   
   "platform": which platform is being used to send the badge (e.g. Twitter, Facebook, ..)
   
   "reason": url to the post that references someone sending a badge
   
   "badgeclass": url of the badgeclass (this can be ANY badgeclass, also ones not belonging to this API!)
   
   **Example body**
   
   ```json
  {
    "receiver": "https://twitter.com/bobD",
    "receiverName": "Bob D.",
    "sender": "https://twitter.com/susanna",
    "senderName": "Susanna",
    "platform": "twitter",
    "reason": "https://twitter.com/sometweet123",
    "badgeclass": "https://api.wisebadges.osoc.be/badgeclass/5f1ea43b77630a8b91a295c8"
  }
  ```

* **Success Response:**
  * **Code:** 200 / 304<br />
    **Content:** 
       ```json
      {
        "json": "https://api.wisebadges.osoc.be/assertion/5f15ab65a546d6ce7861b12e",
        "html": "https://wisebadges.osoc.be/detail/5f15ab65a546d6ce7861b12e"
      }
      ```
      * note: "html" is the link to the front end webpage, showing the download button etc., "json" links to the json of the assertion itself
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:**
      ```json
      [{ "value": "https://twitter/sender/sometweet123",
        "msg": "Reason should be a (valid) URL linking to a Twitter/Facebook/... post.",
        "param": "reason",
        "location": "body"}
        ]
      ```
      * note: "valid" here means it should have valid URL syntax, there is no checking if the webpage actually exists
  OR

  * **Code:** 500 INTERNAL ERROR <br />


## Add answer to assertion
  Given some parameters, this method will create an Assertion (https://www.imsglobal.org/sites/default/files/Badges/OBv2p0Final/index.html#Assertion) and return the json formatted assertion and the front-end html version.

* **URL:**
/assertion/:id/answer

* **Method:**
  `PATCH` 
  
*  **URL Params:**
None

* **Data Params**

  **Required**
  
   "answer": After posting on a WiseBadge platform, the link of this post could be given here. (This could also be any URL/content you might need in the future)
   
   **Example body**
   
   ```json
  {
    "answer": "https://twitter.com/WiseBadges/status/1288390856592982016",
  }
  ```

* **Success Response:**
  * **Code:** 200 <br />
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:**
      ```json
       { "error": "No answer field specified." }
      ```
      * note: Here we give you the freedom to add any string, even an empty one
  OR

  * **Code:** 500 INTERNAL ERROR <br />


## Delete an assertion 
  When wanting to remove an open badge, we need to remove the assertion. So the given assertion will be removed. Only the recipient/sender should be able to do this.

* **URL:**
/assertion/:id

* **Method:**
  `DELETE` 
  
*  **URL Params:**

id: id of the assertion to be deleted

* **Data Params**
None

* **Success Response:**

* **Success Response:**

  * **Code:** 200 / 304 <br />
  
* **Error Response:**

  * **Code:** 500 INTERNAL ERROR <br />
   
  
 ## Accept a badge / assertion 
  Before the recipient will be shown on any data visualisation / listed as a recipient of the badge, the recipient has to accept the badge. This will change a badge from unaccepted to accepted. Make sure only the recipient can do this.

* **URL:**
/assertion/:id

* **Method:**
  `PATCH` 
  
*  **URL Params:**

id: id of the assertion to be deleted

* **Data Params**
None

* **Success Response:**

  * **Code:** 200 / 304 <br />
  
* **Error Response:**

  * **Code:** 500 INTERNAL ERROR <br />
 
