
## Documentation
**Create an assertion**
----
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
   
   `{"receiver": "https://twitter.com/bobD", "receiverName": "Bob D.", "sender": "https://twitter.com/susanna", "senderName": "Susanna", "platform": "twitter", "reason": "https://twitter/sometweet123", "badgeclass": "https://api.wisebadges.be/17qjf87j3kpz56" }`

* **Success Response:**
  * **Code:** 200 <br />
    **Content:** 
    `{ json: "https://api.wisebadges.be/assertion/5f15ab65a546d6ce7861b12e", html: "https://wisebadges.be/badge/5f15ab65a546d6ce7861b12e}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "..." }`

  OR

  * **Code:** 500 INTERNAL ERROR <br />
    **Content:** `{ error : "..."}`
