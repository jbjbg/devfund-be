# DevFund - front end

### Author: Becca Lee, Brent Woodward, George Raymond, Jacob Anderson, Jonathan DiQuattro

### Links and Resources
* [Front end repo](https://github.com/jbjbg/devfund-fe)
* [DevFund.io](https://www.devfund.io/)
* [Back end repo](https://github.com/jbjbg/devfund-be)
* [Mock partner repo](https://github.com/jbjbg/devfund-mock-partner)

## Repo Info
The DevFund-be is the repo containing the backend servers and contain all the required paths to connect the front end to Paypal, and MongoDB.

## Technology Used - Back End
- Express
- bcrypt
- Superagent
- cors
- dotenv
- jsonwebtoken
- mongoose
- mongoose-schema-jsonschema
- paypal-rest-sdk
- uuid

### Routes
- `/api/pitch` Creates a request and adds it to MongoDB
- `/api/bulletin` Displays all the requests for funding.
- `/api/update/:id` Updates a users profile
- `/api/delete/:id` Deletes users/requests 
- `/api/retrieve/:id` Retrieves users and requests


#### Running the app
- to run locally, fork and clone the repo, run `npm i`, and then run `npm start`
- Otherwise, visit the [DevFund](https://www.devfund.io/) site to use the app

#### Tests
* How do you run tests?
    - npm test or npm test ./'path'
* What assertions were made?
    -We have aprox 80% coverage, and we asserted tests on each route and callback function.
* What assertions need to be / should be made?
    -Paypal Success route still needs to be tested.


#### Sources
Special thanks to [verticalgrain](https://gist.github.com/verticalgrain) for their [gist](https://gist.github.com/verticalgrain/195468e69f2ac88f3d9573d285b09764) on React Router V4 Redirect after form submission. It was a great help with our redirects!

### UML
https://drive.google.com/file/d/1s3_5h1RfD2w9giDDc1C4EEmiVVR-uyEO/view?usp=drivesdk