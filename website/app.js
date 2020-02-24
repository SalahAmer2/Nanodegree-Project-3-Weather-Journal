//jshint esversion:9

/* Global Variables */
let baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
let apiKey = "49be82b027adf26dca23a428a21e0f92";

const temp = document.getElementById('temp');
const date = document.getElementById('date');
const content = document.getElementById('content');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById("generate").addEventListener("click", performAction);

//Function to be triggered after clicking the generate button
function performAction(e){
  const userZip = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;
  if((userZip === "" || userZip === null) || (feelings === "" || feelings === null)){
    alert("Invalid zip code or comment");
  } else{
    getFunc(userZip)
    .then(apiTemp =>{
      console.log(apiTemp);
      postData("/addData", {
        temp: apiTemp,
        date: newDate,
        content: feelings
      });
      retrieveData('/all')
      .then(allData =>{
        updateUI(allData);
      });
    });
  }
}

//Getting data from the API to the client side
const getFunc = async (zip)=>{
  const res = await fetch(baseURL+zip+",us&appid="+apiKey);
  try {
    const data = await res.json();
    console.log(data);
    apiTemp = data.main.temp;
    return apiTemp;//Will return apiTemp in the .then method if successful
  } catch(error) {
    console.log("error", error);
    //appropriately handle the error
  }
};

// Async POST (will be used to post data to the server)
const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

    try {
      const newData = await response.json();
      console.log(newData);
      return newData;
    }catch(error) {
    console.log("error", error);
    }
};

// Async GET
const retrieveData = async (url = '') =>{
    const request = await fetch(url);
    try{
        const allData = await request.json();
        return allData;
    } catch(error){
        console.log('error', error);
    }
};

//Update DOM elements
const updateUI = async (allData) => {
    date.innerHTML = `Date: ${allData.date}`;
    temp.innerHTML = `Temperature: ${allData.temp}`;
    content.innerHTML = `Content: ${allData.content}`;
};
