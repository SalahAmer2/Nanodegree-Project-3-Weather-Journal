# Weather-Journal App Project

## Description
When the user enters a valid zip code and comment on his/her feelings the *performAction* function in the client side js file will be triggered and will use the zip code to fetch data(through the *getFunc* function) from the API about the temperature and will get the date from the new date instance dynamically with JS. Then in the *.then* method the temperature, date and feelings content will be posted to the server side through the */addData* route and added to the *projectData* object. In the same *.then* method the *retrieveData* function will retrieve the data in the *projectData* object through the */all* route and update the UI with the *updateUI* function using *innerHTML*.
