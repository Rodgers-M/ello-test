# Apllication setup

this app is setup using vitejs tool. see the get started [guide](https://vitejs.dev/guide/) for more
information

## Application structure and some of the improvements that can be made

### Structure

The application currently has one feature, Books, that provides several
functionalities i.e viewing available books, searching books, creating and
viewing a reading list

### improvements and enhancements

1. The search functionality can be improved to make it typo tollerant and
   optimize search results.
2. The search component can also be made generic and be reused in other parts
   of the application.
3. Link the search functionality with the backend rather than filtering from
   the cache
4. Write automated tests for the application

## Running the app

1. after cloning the app, run `npm install` to install dependencies
2. create a `.env` file and add the backend server urr. see the `.env.sample`
   file.
3. Start the backend server
4. run `npm start` to start the frontend server
