
# Documentation

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
   
   "badgeclass": url of the badgeclass
   
   **Example body**
   
   ```json
  {
    "receiver": "https://twitter.com/bobD",
    "receiverName": "Bob D.",
    "sender": "https://twitter.com/susanna",
    "senderName": "Susanna",
    "platform": "twitter",
    "reason": "https://twitter.com/sometweet123",
    "badgeclass": "https://api.wisebadges.be/17qjf87j3kpz56"
  }
  ```

* **Success Response:**
  * **Code:** 200 <br />
    **Content:** 
       ```json
      {
        "json": "https://api.wisebadges.be/assertion/5f15ab65a546d6ce7861b12e",
        "html": "https://wisebadges.be/badge/5f15ab65a546d6ce7861b12e"
      }
      ```
 
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


## Get all badgeclasses
  This will show a list of all possible badgeclasses.

* **URL:**
/badgeclasses

* **Method:**
  `GET` 
  
*  **URL Params:**
None

* **Data Params**
None

* **Success Response:**
  * **Code:** 200 <br />
    **Content:**
    ```json
    {
      "badgeclasses":[
           {
      "criteria":{ "narrative":"just testing"},
      "@context":"https://w3id.org/openbadges/v2",
      "type":"BadgeClass",
      "name":"example",
      "description":"just a test badge",
      "image":"http://wisebadges.wabyte.com/WiseBadges.png",
      "issuer":"http://localhost:5000/issuer",
      "id":"http://localhost:5000/badgeclass/5f0ebd0ba72c486d5a56d849"
    }
      ]
    }
    ```
     
* **Error Response:**

  * **Code:** 500 INTERNAL ERROR <br />
  
## Get all assertions
  This will show a list of all issued assertions.

* **URL:**
/assertions

* **Method:**
  `GET` 
  
*  **URL Params:**
**optional**
* fields: choose which fields you want to be shown in the results
  possibilities: recipient, "@context", type, badge, issuedOn, evidence, verification, accepted, id
  default: all fields will be shown
  example: assertions/?fields=recipient,id,badge
* page: show which page you want to see
  default: 1
  example: assertions/?page=5
* limit: how many assertions you want to get on one page
  default: 20
  max: 50
  example: assertions/?limit=30
  
  **Example combined**
  `http://localhost:5000/assertions/?fields=id,badge&limit=25&page=3

* **Data Params**
None

* **Success Response:**
  * **Code:** 200 <br />
    **Content:**
    ```json
     {  
      "object": "list",
      "hasMore": true,
      "pageCount": 10,
      "itemCount": 190,
      "pages": [
      {
        "number": 1,
        "url": "/assertions/?fields=id%2Cbadge&page=1&limit=2"
      },
      {
        "number": 2,
        "url": "/assertions/?fields=id%2Cbadge&page=2&limit=2"
      },
      {
        "number": 3,
        "url": "/assertions/?fields=id%2Cbadge&page=3&limit=2"
      }
      ],
      "data": [
      {
        "badge": "http://localhost:5000/badgeclass/5f0ebd0ba72c486d5a56d849",
        "id": "http://localhost:5000/assertion/5f0eea5ea37a3f29d3921aa8"
      },
      {
        "badge": "https://api.wisebadges.com/17qjf87j3kpz56",
        "id": "http://localhost:5000/assertion/5f17fdac351bdc331d64c47b"
        }]
    ```
    
    * note: pages will always show list of 3 pages, first element is previous, second is current, and third is next (except when on page 1!)
    
* **Error Response:**

  * **Code:** 500 INTERNAL ERROR <br />

## Get the issuer
  This will show a list of all issued assertions.

* **URL:**
/issuer

* **Method:**
  `GET` 
  
*  **URL Params:**
None

* **Data Params**
None

* **Success Response:**
  * **Code:** 200 <br />
    **Content:**
    ```json
    {
      "@context":"https://w3id.org/openbadges/v2",
      "type":"Issuer",
      "id":"http://localhost:5000/issuer",
      "name":"WISE Badges",
      "url":"https://wisebadges.be",
      "email":"wise@osoc.be",
      "image":"http://wisebadges.wabyte.com/WiseBadges.png"
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
  * **Code:** 200 <br />
    **Content:**
    ```json
    {
      "criteria":{
          "narrative":"just testing"
      },
      "@context":"https://w3id.org/openbadges/v2",
      "type":"BadgeClass",
      "name":"example",
      "description":"just a test badge",
      "image":"http://wisebadges.wabyte.com/WiseBadges.png",
      "issuer":"http://localhost:5000/issuer",
      "id":"http://localhost:5000/badgeclass/5f0ebd0ba72c486d5a56d849"
    }
    ```
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
  * **Code:** 200 <br />
    **Content:**
    ```json
    {
      "recipient":{
          "type":"url",
          "hashed":false,
          "identity":"https://twitter.com/Sarah_VanDenB",
          "name":"@sarah_vandenb"
      },
      "sender":{
          "identity":"https://twitter.com/fvspeybr",
          "name":"@fvspeybr"
      },
      "evidence":{
          "id":"https://twitter.com/fvspeybr/status/1283302666005811200"
      },
      "accepted":true,
      "@context":"https://w3id.org/openbadges/v2",
      "type":"Assertion",
      "badge":"http://localhost:5000/badgeclass/5f0ebd0ba72c486d5a56d849",
      "issuedOn":"2020-07-15T09:10:05+00:00",
      "verification":{
          "type":"hosted"
      },
      "id":"http://localhost:5000/assertion/5f0eea5ea37a3f29d3921aa8"
    }
    ```
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />

  OR

  * **Code:** 500 INTERNAL ERROR <br />

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
  * **Code:** 200 <br />
    **Content:** file download
    
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:**
      ```json
      {"Error": "No assertion/badgeclass/image found."}
      ```
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

  * **Code:** 200 <br />
  
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

  * **Code:** 200 <br />
  
* **Error Response:**

  * **Code:** 500 INTERNAL ERROR <br />
 
