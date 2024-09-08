# Docs-web Collaborative 
Developed a MERN Stack Docs collebrative application using Socket.io. The Docs allows on-the-fly styling of writting tools. Also supports additional functionalities like image sharing, etc. 
## Current Functionality:
    -> Full fledge  website
    ->  Collaborative Text Editor.
    ->  Image Upload 
    ->  Collab URL Vedio
    ->  Bold 
    ->  Italic
    ->  Underline
    ->  Hyperlink
    ->  Code
    
## Future Functionality:
    -> Live Chat
    -> Power Point. Excel, Form
    -> AI chatbot
 ## Description:
    -> Authentication System Development: Created a robust authentication system using JWT tokens, integrating Regex for password Strong. 
    -> Additionally, Implemented features to efficiently Forgot-Password user credentials efficiently.
    -> Implement a Middleware to limit block brute force attacks using express-rate-limit, Additionally incoporated password hassing for secure.
    -> Used Redux Toolkit for efficient global state management, improving overall Web performance. 

## Teach-Stack
| UI-Part | Controller | Server-Part |
|---------|------------------|--------------|
|![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![Javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)|![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white) |![Express.JS](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![Node.JS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Socket-io](https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=Socket.io&logoColor=white)|

## Deployments
|FRONTEND|BACKEND|DATABASE|
|--------|-------|--------|
|![vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)|![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)|![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

## API Routes

The following table lists the available API routes and their descriptions:

| Route | Method | Description |
|-------|-------------|----------|
| auth/signup/ | `POST` | Register user's data in Database |
| auth/signin/ | `POST` | By checking user's credentials allow them to log-in in the web-applicattion |
| profile/ | `PATCH` |	Update logged-in user's profile |
| docs/ | `GET` |	Get all public docs |
| docs/user | `GET` |	Get all docs for the logged-in user |
| docs/ | `POST` | Post / Create document |
| docs/:docId | `PATCH` | Update specific doc's details and allowed only for the author |
| docs/:docId | `DELETE` | Delete specific doc and allowed only for the author |

Thank you 💙
