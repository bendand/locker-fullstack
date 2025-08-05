## Locker 

### Fully functional physical storage management app using Java REST API, React frontend, MySQL database. Basic user authentication has been enabled, and application allows users to create and manage lockers, containers, and items in storage, and have full CRUD capabilities for each

Locker was an idea born out of the desire to better organize my stuff. As someone who has had to move their belongings from place to place many times and has had items get lost in the move, I wanted to think up a way to keep track of my items in a way that ensures nothing is left behind. In that spirit, Locker is an ongoing project that aims to outsource the cognitive overhead of physical storage management to a simple organizational tool.
https://www.storagecafe.com/blog/self-storage-use-and-main-demand-drivers/


### Tools and frameworks used
* React JS
* Material UI
* Google Maps API 
* Spring Boot
* MySQL


### How to install this project on your local machine
1. Clone the project into your editor, preferably a JavaScript friendly editor such as VSCode or Sublime Text
2. When the project is properly cloned and has been copied to your local machine, open the subfolder 'locker-backend' in a Java friendly IDE such as IntelliJ
3. In the application.properties file in the resources package, modify the DB_USERNAME, DB_PASSWORD, and DB_URL and either replace these values with your own credentials or create DB_USERNAME, DB_PASSWORD, and DB_URL as environment variable keys and your actual credentials as values
4. In order to use features enabled by Google Maps API, creating your own Google Maps API key is necessary
https://developers.google.com/maps
5. In the root of the locker-frontend directory, create a .env file and declare your API key like this -
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
6. In your editor with locker-frontend open, run 'npm install' on your command line to download project's dependencies, and run 'npm run dev' to start the local host instance
7. To run the server in IntelliJ, navigate to 'LockerBackendApplication' and press the play button at the top of the screen


#### Wireframe containing rough idea of my app's pages in the planning stage
https://miro.com/app/board/uXjVIynhR1U=/


#### ERD diagram
https://www.figma.com/board/0dJYgPuPGOL8GYyP716LsM/UML-Diagrams--Community-?node-id=304-637


#### Issues 
* As of August 2025 there's an issue with my search item function in my navbar. When a user has found the item they're looking for, hit 'find item' and has been taken to the container component containing that item, subsequent searches from the same container details url view update the url, and even populate the page with new container details, but don't reload the data with the new container's associated items. This has to be done manually after a user tries to find an item while in this component. While this feature is effectively broken when the user is inside the 'items' layer of the application, it should work everywhere else.

* Further, there are some different issues with routing. When a user clicks on a LockerCard, ContainerCard, or Item Card to navigate to the contents of the selected unit, a default string is appended to the URL that indicates the element selected is a card component. This causes users to have to perform two back clicks in order to backtrack through the app. I've read articles about these issues to try to learn more but I've run out of time before deadline. These will be fixed in future iterations of the project. 


#### Future enhancements 
* Address suggestions from Google Maps API and dynamic Locker Map 
* RBAC system with admin, read-write access, and read-only access roles
* Routing fixes
* Proper implementation and usage of session data and JWTs
* Enhanced user experience, layout changes for mobile users
* Increased efficiency through data caching
* More user control and customization: color-coded tags for items and containers, easy way for users to put containers and items in different lockers






