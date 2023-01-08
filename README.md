# Scootlator
This is old CRA version of this app. <br>
Link to new repo:https://github.com/jjonez96/scootlator-nextjs 

Scootlator is really handy and fast single page application(SPA) to calculate e-scoot trips such as Tier, Voi, Dott etc.
 <br>
<b>Preview:</b> 
https://scootlator.netlify.app <br>  <br>
![image](https://user-images.githubusercontent.com/90967564/210266025-5084e46f-39ae-4b86-b3f6-9e6b233f0d30.png)
## Tech Stack: 
![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) <br>
![](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) <br>
![](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge) <br>
![](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)



## API's
- Google maps API (map, places and autocomplete)
- Tier API 
- Voi API 

## How it works?
In Scootlator you choose your origin and destination where you want to go from point A to point B.

There is different ways to get origin and destination. Mostly used method is to just write them and Google Autocomplete gives you suggestions based on where you are located. You can choose the destination by clicking the map or just write it. <br> When origin and destination are selected then you choose your operator which shows their prices and then you are ready to calculate the price.

<b>Other ways to get origin:</b>

1. Click location button in origin input. This button takes you to your location.

![Näyttökuva 2022-12-22 181459](https://user-images.githubusercontent.com/90967564/209176819-19fb4a83-9402-438d-8359-3815dbcfcf1c.png)

2. Pick scoot from the map and click the location button.

![image](https://user-images.githubusercontent.com/90967564/210266502-39440ba6-5d85-405e-9fed-51ecb21ad737.png)
<br>
<b>You can find scoots in Örebro Sweden only at the moment.</b> <br>
<b>When you click scoot icon in the map you see information of that scoot:</b> 

- What type of vehicle.
- Battery left.
- Location button. This gives you that selected scoot address to origin input.
- "Vuokraa" means Rent and that button takes you to the Tier or Voi app where you can make the payment. 

<br> <br>


Blue scoot button in the left disables all scoots in the map and right side that red button will reset the whole app.

![image](https://user-images.githubusercontent.com/90967564/209229803-c6e2eef2-17b0-47cb-a41f-50e4e39fd3ff.png)
<br> <br>

When the trip is calculated the app will return you the results like distance, duration and the price of that trip. <br>
Here in Finland all scoot operators will slow down scoots at night times and the trip price will obviously increase. Price is increased at 10PM - 6AM
![image](https://user-images.githubusercontent.com/90967564/210266547-487ead7b-db42-4cf8-b76b-11d88939dc41.png)

 
Scootdata comes from my Node.js backend. It is server to server solution where i do http requests from tier and voiapi. The Node application is hosted to Cyclic.sh.


<b>Here is the backend repo:<b> <br>
https://github.com/jjonez96/scootdata

## Issues
There are alot of problems what im trying to solve yet for example scoot locations. Other issues are listed in Github issues section.
 
 Feel free to contribute if this project spiked you interested!

## What i´ve learned so far?
- Making rest api´s with Node.js
- Creating http and post reqests in Node.
- Cleaning the useless data from api in Node.
- Hosting Node.js application
- CORS error handling
- UI/UX work(Making the app userfriendly as possible and responsive)
- Making UI with React Bootstrap.
- Overwriting Bootstrap styles.
- Customise the Googlemap colorscheme
- onClick events & onChange events.
- Scoot operator selector(using onChange)
- Making loading screen.
- Setting up Googlemaps API to the React project.
- Setting up Googlemaps AutoComplete, Places and MarkerClusterer.
- How to find user location.
- Render coordinates to input field.
- Fetching the data from backend to frontend
- How to map array of markers to Googlemaps
- Changing coordinates to address.
- Coordinates from map click.
- Render section when button is clicked(calculationResults component)
- Using ternary operators instead of if else.
- Input validation and error handling.
- Resetting the app without refreshing the page.
- On/off switch for scoots in map.
- How to use UseRef, UseState, UseEffect hooks.
- Passing props between components.
- Making own customhooks.
- Algorithm for the scoot price.
- Git commands (commit, push and pull).
- npm commands (Adding dependencies, npm start and npm run build).

## Next goals for this project
I'm going to look forward on adding Typescript to this project later.


