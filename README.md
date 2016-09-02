# sean-media-server

## Installation
1. `npm install`
2. Execute the scripts on `/sql` against your MySQL database
3. Generate an API key by running `/script/apikey.js`
4. Using that API key, insert a user into the `users` table
5. Create and populate `/config.json`, using `config.json.example` as a template
6. Run `index.js`

## Usage
Images and files can be uploaded by POSTing to `/image` or `/file` (respectively) with an `Authorization: {yourApiKey}` HTTP header. If the upload is successful, the application will respond with a link to the uploaded resource.

The database is also ready to support links and text, but the application code to support these features has not yet been implemented.
