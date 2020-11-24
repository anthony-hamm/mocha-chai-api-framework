
# Installation

## Step 1. Clone the project
Use git to clone my repo into a new folder.

        https://github.com/anthony-hamm/mocha-chai-api-framework.git



## Step 2. Install the packages
Open your terminal and input the following command.

        npm install --save-dev chai

        npm install --save-dev mocha

        npm install --save-dev chai-http

        npm install --save-dev mochawesome
        
 Or simply run
 
        npm install



## Step 4. Run the tests
        npm test

or without reporter

        npm test:alone



 ## Directory Structure   
 
```
      mochaNchai-framework/
      ├── mochawesome-report
      ├── node_modules
      ├── test
      │   ├── coupons.js
      │   ├── orders.js
      │   └── products.js
      ├── .gitignore
      ├── .jshintrc
      ├── package-lock.json
      └── package.json
```



# Playground

The application under test is a dummy shopping site that comes already filled with sample products and realistic user workflows. 

● URL: http://34.205.174.166 

● User: shopmanager 

● Password: axY2 rimc SzO9 cobf AZBw NLnX (The spaces in the password are intentional).

● Notes: 

   ○ You can use "Basic Auth" to authenticate to the API. 
  
   ○ These credentials can only be used with the API, they won’t work on the WordPress login page 





## API Documentation: 

         https://woocommerce.github.io/woocommerce-rest-api-docs/





  
## API Coverage so Far:

Note: FYI As this is just a PoC, the verification of each parameter will be limited and left for the future.

#### Coupons CRUD 

    POST /coupons ✓
    
    GET /coupons/<id> ✓
    
    GET /coupons ✓
    
    PUT /coupons/<id> ✓
    
    DELETE   /coupons/<id> ✓
    

#### Products CRUD

    POST /products ✓
    
    GET /products/<id> ✓
    
    GET /products ✓
    
    PUT /products/<id> ✓
    
    DELETE /products/<id> v
    

#### Orders - The Challenge Provided

  ##### Setup
  
    create a new product ✓
    
    create a new coupon ✓
    
    create a new order with product and coupon output ✓
    
  ##### Integration Tests
  
    user should be able to retrieve the already created product ✓
    
    user should be able to retrieve the already created coupon ✓
    
    user should be able to retrieve the already created order ✓
    
  ##### Teardown - Clean Up
  
    user should be able to delete the already created product ✓
   
    user should be able to delete the already created coupon ✓
    
    user should be able to delete the already created order ✓
    
      


# Reporter


<img src="https://autom8able.com/assets/images/mocha-awesome.webp?raw=true"/>


