# Task Manager Grand Circus

The server-side application is in the `task-manager-server` folder. The client-side application is in the `task-manager-client` folder.   

To run the application
- Run the `task-manager.sql` file. It will create a `task_manager` database with a `task` table in your MySQL database, although it will not create data.
- Update the `application.properties` file with the correct id and password for your MySQL installation.
- Start the server-side application.
- On the client side, run 
```
npm i
```
then
```
npm start
```

Features include 
- Adding tasks
- Editing tasks
- Listing tasks
- Deleting tasks
- Toggling task completion
- Searching for a task
- Sorting by task
- Sorting by due date
- Filtering by due date
- Filtering by completion status
