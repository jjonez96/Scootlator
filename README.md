# Scootlator
Scootlator is really handy and fast single page application(SPA) to calculate e-scoot trips such as Tier, Voi, Dott etc.
 <br>
<b>Preview:</b> <br>
https://scootlator.netlify.app <br>  <br>
![Näyttökuva 2022-12-22 174728](https://user-images.githubusercontent.com/90967564/209171845-532d7710-12dc-4c6e-b0b4-44b0186d2a5c.png)
## Tech Stack: 
![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) <br>
![](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) <br>
![](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge) <br>
![](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)



## API's: 
- Google maps API (map, places and autocomplete)
- Tier API (Tier pricing and locations)
- Voi API (Coming soon..)

## How it works?:
In Scootlator you choose your origin and destination where you want to go from point A to point B.

There is different ways to get origin and destination. Mostly used method is to just write them and Google Autocomplete gives you suggestions based on where you are located. You can choose the destination by clicking the map or just write it. <br> When origin and destination are selected then you choose your operator which shows their prices and then you are ready to calculate the price.

<b>Other ways to get origin:</b>

1. Click location button in origin input. This button takes you to your location.

![Näyttökuva 2022-12-22 181459](https://user-images.githubusercontent.com/90967564/209176819-19fb4a83-9402-438d-8359-3815dbcfcf1c.png)

2. Pick scoot from the map and click the "Sijainti" location button.

![image](https://user-images.githubusercontent.com/90967564/209178754-7fce180c-0c84-4db1-a89d-f604036be7bd.png)
<br>
<b>When you click scoot icon in the map you see information of that scoot:</b> <br>
<b>You can find scoots in Stockholm Sweden at the moment.</b>
- "Päivitetty" means updated so it shows when the scoot data is updated.
- "Akkua jäljellä" means Battery left.
- "Maksiminopeus" means Maxspeed how fast it goes.
- "Sijainti" means location.
- "Vuokraa" means Rent and that button takes you to the Tier app where you can make the payment. 

<br> <br>


Blue scoot button in the left will disables all scoots in the map and right side that red button will reset the whole app.

![image](https://user-images.githubusercontent.com/90967564/209189273-dc96c228-15dc-481f-a2f0-1208ee2c4374.png)
<br> <br>

When the trip is calculated the app will return you the results like distance, duration and the price of that trip. <br>
"Hidasajo" means slow ride. Here in Finland all scoot operators will slow down scoots at night times and the trip price will obviously increase. When you activate it the app will recalculate the price for you.

![image](https://user-images.githubusercontent.com/90967564/209192322-2ac626b4-b362-4dbc-9000-9eba88618a8c.png)


Scootdata comes from my Node.js backend. It is server to server solution where i do http requests from tierapi and the Node application is hosted to Cyclic.sh.


<b>Here is the backend repo:<b> <br>
https://github.com/jjonez96/tierapi

## Issues
There are alot of problems what im trying to solve yet for example scoot locations. Other issues are listed in Github issues section. Feel free to contribute if you are interested in this project!

## What i´ve learned so far?
- Making rest api´s with Node.js
- Creating http reqests in Node.
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
- Setting up Googlemaps AutoComplete and Places.
- How to find user location.
- Render coordinates to input field.
- Fetching the data from backend to frontend
- How to map array of markers to Googlemaps
- Changing coordinates to address.
- Coordinates from map click.
- Render section when button is clicked(calculationResults component)
- Using ternary operators instead of if else.
- Price state change(SlowRide function)
- Input validation and error handling.
- Resetting the app without refreshing the page.
- On/off switch for scoots in map.
- How to use UseRef, UseState, UseEffect hooks.
- Passing props between components.
- Making own customhooks.
- Algorithm for the scoot price.
- Git commands (commit, push and pull).
- npm commands (Adding dependencies, npm start and npm run build).



