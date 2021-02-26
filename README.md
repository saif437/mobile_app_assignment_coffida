# mobile_app_assignment_coffida
Repository for the coffida application as part the mobile apps coursework

CoffidaApp

Description

Coffida is a coffida review mobile app, designed to find the best coffee shops in the UK. User can access the app by register an account and logging in through the email and password. Users get also access their details in the app and update them if need be and logout of their account anytime they want.

Users will be presented with a list coffee shop from the coffida server and display their average ratings and etc to allow the user to find the best coffee spot. A google maps function is also implemented to find the location of the coffee shop. To find out more information about a particular coffee shop, all the user needs to do is click on the particular location and they are provided with more detailed information and functionality.

In this stage, the user can access reviews, favourite and unfavourite a location and like and like reviews aswell. The user can choose to add their own review and choose to further update or delete them. Please note, Coffida app will not tolerate any reviews related to other coffee shop products, strictly coffee business only! Furthermore, user can add and delete their own photos aswell. 

A refresh bar is added to certain pages to allow information to update. Please use this function when adding and updating reviews and user details.

Language: 
JavaScript and React Native Framewrok

Navigations

Coffida App has two navigation strucures: stack and tab navigators. Stack is the main navigator. Each screen has stack naviator and the home screen has a Tab navigator included which accesses the user details screen and logout screen and also the home screen.

Style

The Coffida app style is a dark themed app with bright luminous colours as text and borders. This style is designed to be fun, modern and edgy and has element of seriousnes to it. Not everyone's tatse, but designed like this to portray the fact that the app is intended for serious coffee lovers. 

The color constract make the app stil accesibile to the user despite having a dark background due to the bright text colour. Style is implemented on a style sheet. Each style sheet is done in each screen. All style sheets are consistent with each other and only differ in a few screens to better suit the app. 

Code Quality
Java script standard style was used thorugh out this project through a linter and used in a consitent manner barring a few places where it wasn't possible as it would disturb functionality such a email validation and api requests. But style was maintained where possible.

Installations

Async Storage to access session token and user ID.
install
npm install @react-native-async-storage/async-storage
import AsyncStorage from '@react-native-async-storage/async-storage'
Link: https://react-native-async-storage.github.io/async-storage/docs/install/
(Import Async Storage from component if the above does not work. )

Heart Icon for favouriting and unfavouriting a location
install
import npm install react-native-shapes
import { Heart } from 'react-native-shapes'
Link: https://www.npmjs.com/package/react-native-shapes

Geolocation for google maps
install
npm install @react-native-community/geolocation --save
import Geolocation from 'react-native-geolocation-service'
Link: https://github.com/react-native-geolocation/react-native-geolocation
(Requires edit to android files)
Link: https://github.com/react-native-maps/react-native-maps
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'

Camera for taking photos
Install 
npm install react-native-camera --save
react-native link react-native-camera
import { RNCamera } from 'react-native-camera'
Link: https://react-native-camera.github.io/react-native-camera/docs/installation.html

Bad words for Profanity filter
Install
npm install bad-words --save
Link: https://www.npmjs.com/package/bad-words

Imported Functions 
Found in ./components/helperFunctions
Two validation functions:
emailValidation and passwordValidation to validate email and passwords.
profanityFilter to filter out any words inside a review which includes other aspects of their cafe experience like tea and cakes, pastries and etc.

Github Repository: https://github.com/saif437/mobile_app_assignment_coffida

Support 
For any enquires, please email Saif Ali.
Email: 18012946@stu.mmu.ac.uk

Author and acknowledgment 
Saif Ali
Thanks to Ashley Williams for the support throught the project.
