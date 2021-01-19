# Greentree Tracker

Coder Academy T3A1 Full Stack App (Part B) assessment

Created by Tyler Hall and Katrina Marquez 

# Links

**Deployed site (Front End)** - [GreenTree Tracker Front End](https://www.greentree-tracker.netlify.app "Greentree Tracker Wesbite")

**Github Repository (Front End)** - [Github Repo Front End](https://github.com/Impicklerick12/greentree-tracker-FE "Greentree Tracker Github Repo")

**Deployed site (Back End)** - [GreenTree Tracker Back End](https://limitless-springs-78183.herokuapp.com/ "Greentree Tracker Wesbite Back End")

**Github Repository (Back End)** - [Github Repo Back End](https://github.com/katrinamarquez/app-greentree-tracker "Greentree Tracker Github Repo Back End")

## Test Admin Access

Will allow access to plant CRUD functionalities, and /admin dashboard

**Username:** testAdmin
**Password:** Password123

### Purpose 

Greentree Tracker is an inventory and order management solution designed for small to medium wholesale nursery businesses. 

The key issues small to medium sized wholesale nurseries currently face is finding software that is simple to use and includes product classification fields specific for inventory found in nurseries.

Greentree Tracker worked in collaboration with a wholesale nursery in Queensland to develop a solution that is simple and easy to use with a twist. The solution provides additional functionality for customers to view and select items and request a final quotation from the nursery. 

Greentree Tracker's focus is to reduce the amount of software small to medium wholesale nurseries are required to set up and manage by combining inventory and sales function in one solution. 

### Functionality/Features 

**User Authentication**

Users are able to register for an account with Greentree Tracker, which will enable them to make a quote request to the wholesaler. Users are able to sign in using their registered email address and password. Once signed in, they will be able to edit their information on their account page, changing their password and client information.

**Authorisation**

Authorisation will be implemented to restrict the CRUD functionality to the Admin. Users accounts will have a different role to the Business, which will have the only Admin role. The Admin will be able to add, update and delete plant listings, and every user role will be able to read all components and content of the application. Authorisation will also restrict regular browsers from placing a quote request to the business, and will be prompted to sign in first. This will ensure that the business will only be dealing with accredited users.

**Admin CRUD Functionality**

Admin will have the ability to create new plant listings, update existing plants, and delete any or all plant listings. As mentioned previously, these functions will be limited only to users with the Admin role.

**Image Upload**

Image upload will be implemented to allow the Admin to post photos with plant listings. These will be stored with Amazon S3 cloud storage services, which will allow for multiple images to be hosted online for easy accessibility. If no image is uploaded, a stock image will be assigned to the plants.

**Quote Request**

The main functionality of Greentree Tracker is to allow users to make a quote request for a variety of plants from the wholesaler. Inventory can be a tricky component of Nurseries, as although the plants may be in location, they may not always be available for sale due to a number of reasons (bugs, plant quality etc). The quote request feature is provided for users to select multiple plants they wish to purchase, which can be sent to the business as well as a comment and also their contact information. The business will be able to access these quote requests through their admin dashboard, and subsequently can respond to each individual request with an informed response of their stock.

**Inventory Management**

As mentioned in the feature for Quote Request, inventory available for sale might not actually be ready for purchase due to plant conditions. The concept of remaining stock is to indicate if the nursery still has the plant available for purchase pending nursery confirmation from the stock. Admin accounts will have the functionality to add in *'remaining stock'* of a particular plant.
### Target Audience 

The target audience for Greetree Tracker is small to medium wholesale nurseries. Wholesale nuseries operate with a B2B (Business to Business) model rather than B2C (Business to Customer).