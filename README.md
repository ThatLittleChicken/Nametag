# Name Tag
A CS 260's startup project

## Specification Deliverable
### Elevator pitch
Just met someone and asked they ask you for your number or contact info but end up awkwardly repeating it and eventually typing it for them? The Name Tag application will easily solve this problem! Just pull out your unique QR code and when they scan it, they will securely get your contact info you want to share all in one place. No more awkward situations!

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

### Key features
- Secure login over HTTPS
- Ability for user to customize information showed in "name tag"
- Name and contact info are persistently stored
- Automatically generates QR code for "name tag"
- Access people's "name tag" through custom link
- Information are displayed real time
- TBD: Custom link regenerates after a period of time for privacy

### Technologies
The required technologies are used for:
- HTML - Uses HTML struturing for application. Four HTML pages: Login, Customizing "name tag", Sharing "name tag" and a page to View "name tag".
- CSS - Application styling using CSS for tidy and user-friendly look.
- Javascript - Provides login, saving user information, displaying "name tag" info, backend endpoint calls.
- Web service -  Backend service with endpoints for:
    * login
    * saving contact info
    * getting contact info
    * generating QR code
- Database/Login - Credentials, names and contact info are securely saved in Database. Users must sign up to create a "name tag".
- WebSockets - As users update their information, the updates are sent to users viewing their "name tag".
- React - Application will be ported to React framework. Dynamically create custom link for all "name tags".