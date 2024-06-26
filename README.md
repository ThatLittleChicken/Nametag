# Name Tag
A CS 260's startup project

## Specification Deliverable
### Elevator Pitch
Just met someone and they asked you for your number or contact info but ended up awkwardly repeating it and eventually typing it for them? The Name Tag application will easily solve this problem! Just pull out your unique QR code and when they scan it, they will securely get your contact info you want to share all in one place. No more awkward situations!

### Design
<!-- 
![Name Tag customization](/design_images/main.png)
![User Login](/design_images/auth.png)
![Share my Name Tag](/design_images/share.png)
![Name Tag](/design_images/tag.png) 
-->
<img src="https://github.com/ThatLittleChicken/startup/blob/main/design_images/main.png" width="600">
<img src="https://github.com/ThatLittleChicken/startup/blob/main/design_images/auth.png" width="600">
<img src="https://github.com/ThatLittleChicken/startup/blob/main/design_images/share.png" width="600">
<img src="https://github.com/ThatLittleChicken/startup/blob/main/design_images/tag.png" width="600">

### Key Features
- Secure login over HTTPS
- Ability for user to customize information showed in "name tag"
- Name and contact info are persistently stored
- Automatically generates QR code for "name tag"
- Access people's "name tag" through custom link
- Information are displayed real time
- TBD: Custom link and QR code regenerates after a period of time for privacy

### Technologies
The required technologies are used for:
- HTML - Uses HTML structuring for application. Four HTML pages: Login, Customizing "name tag", Sharing "name tag" and a page to View "name tag".
- CSS - Application styling using CSS for tidy and user-friendly look.
- Javascript - Provides login, saving user information, displaying "name tag" info, backend endpoint calls.
- Web service -  Backend service with endpoints for:
    * login
    * saving contact info
    * getting contact info
    * generating QR code
- Database/Login - Credentials, names and contact info are securely saved in Database. Users must sign up to create a "name tag".
- WebSockets - Generate temporary unique IDs through WebSocket requests for users to share tags securely.
- React - Application will be ported to React framework. 

## HTML Deliverable
This deliverable is built and structured using HTML.
- HTML pages - 4 pages for login, tag customization, sharing and viewing.
- Links - The login page automatically links to the user's tag customization. The navbar links to the user's tag sharing page and the QR code will link to the public view of a person's tag.
- Text - Textual description and context are provided for input and elements.
- Images - The QR codes are images to share a person's tag (will eventually be generated).
- DB/Login - The user's tag info are saved to the DB. Input box and submit button for login. 
- Websocket - The info on the public view of a person's tag and the link to it is updated realtime.

## CSS Deliverable
This deliverable is stylized using CSS and Bootstrap.
- Header, footer, and main content body
- Navigation elements - Navigation is simple and intuitive while being good looking
- Responsive to window resizing - The application is highly dynamic and looks great on all windows sizes
- Application elements - Uses of whitespace and borders to give distinct separation
- Application text content - Consistent fonts and clear hierarchy 
- Application images - Images are dynamically sized

## JavaScript Deliverable
This deliverable implemented JavaScript, the application works by storing in local storage. Placeholder for future technologies were also added.
- Login - Sign up button stores login info and log in button sends user to MyTag page.
- Database - Stores user info for tag and retrieves them  on launch. Data is stored on local storage and will be replaced with the database.
- WebSocket - setInterval periodically counts down for share link and updates user info on tag page. This will be replaced with WebSocket.
- Application logic - The MyTag preview changes based on new input. Share page links to Tag page and gets user info, displaying it.

## Service Deliverable
This deliverable added backend endpoints and calls to endpoints.
- Node.js/Express HTTP service - Complete
- Static middleware for frontend - Complete
- Calls to third party endpoints - 3rd party API calls are done to generate QR code for links.
- Backend service endpoints - Backend service endpoints store all user data and merges them.
- Frontend calls service endpoints - Fetched user data from backend service endpoints.

## DB/Login Deliverable
In this deliverable, users info are associated to their account and persistently stored on the Database.
- MongoDB Atlas database created - Complete
- Stores data in MongoDB - Complete
- User registration - Creates a new account in the database.
- Existing user - Stores and updates user info for each existing user.
- Use MongoDB to store credentials - Passwords are hashed and stored securely on the database.
- Restricts functionality - Users can only update their information when logged in.

## WebSocket Deliverable
This deliverable added WebSocket to regenerate temporary unique IDs to for users to share tags securely.
- Backend listens for WebSocket connection - Backend listens for new share requests and return unique IDs. It stores the ID in DB to associate sharer's info and deletes it after 10mins.
- Frontend makes WebSocket connection - Frontend request new share request every 10mins while alive for users to share link.
- Data sent over WebSocket connection - Unique ID is sent over WebSocket connection to the requester.
- WebSocket data displayed - Websocket data is only displayed in console log as users are not meant to see them and is used to generate links.

## React Deliverable
In this deliverable, the application was ported over to React and Vite.
- Bundled and transpiled - Complete
- Components - Login, editing and viewing tags, sharing are all components.
- Router - Routing between all components.
- Hooks - Uses multiple hooks like useState, useEffect, useRef, useSearchParams track changes.