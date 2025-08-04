# Locker 

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


#### Wireframe containing rough idea of my app's pages in the planning stage
https://miro.com/app/board/uXjVIynhR1U=/


#### ERD diagram
https://www.figma.com/board/0dJYgPuPGOL8GYyP716LsM/UML-Diagrams--Community-?node-id=304-637


#### Issues 
* As of August 2025 there's an issue with my search item function in my navbar. When a user has found the item they're looking for, hit 'find item' and has been taken to the container detailscontaining that item, subsequent searches from that same 'container details' view update the url but don't route the user to the correct container. This issue is most clearly seen when a user searches for an item that corresponds to a different container, they can see that the new url has replaced the old, but there's no action being done to route


#### Future enhancements 
* Address suggestions from Google Maps API and dynamic Locker Map 
* RBAC system with admin, read-write access, and read-only access roles
* Proper implementation and usage of session data and JWTs
* Enhanced user experience, layout changes for mobile users
* Increased efficiency through data caching
* More user control and customization: color-coded tags for items and containers, easy way for users to put containers and items in different lockers






