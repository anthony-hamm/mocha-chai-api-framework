let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

let { expect, should } = chai;
let apiCall = chai.request('http://34.205.174.166/');
let temp = require('./data-sets/product-standard.js');
product = temp.product;

describe('Products CRUD', function() { 

    describe('POST /products', function() {
        it('allow user to create a new product' , function(done) {
            apiCall
            .post('/wp-json/wc/v3/products')
            .auth('shopmanager', 'axY2 rimc SzO9 cobf AZBw NLnX')
            .send(product)
            .end(function(err, res) {
                if (err) done(err);
                // focus on response body
                _body = res.body;
                // stores product ID for later use
                product.id = res.body.id;
                // Response verification
                // HTTP status should be 200
                expect(res).to.have.status(201);
                // Status message should be Created
                expect(res.res.statusMessage).to.equal('Created');
                // Response should have the right content type as per documentation
                expect(res).to.have.header('content-type', 'application/json; charset=UTF-8');
                // Response values verification. Only tested some values here but more can be added as per API documentation
                // body should be an object
                expect(_body).to.be.an('object');
                // Product should have property id
                expect(_body).to.have.property("id");
                // Product name should match the one provided
                expect(_body.name).to.equal(product.name);
                // roduct price should match the one provided
                expect(_body.price).to.equal(product.regular_price);
                done();
            });
        });

        it('user requires authentication' , function(done) {
            apiCall
            .post('/wp-json/wc/v3/products')
            .send(product)
            .end(function(err, res) {
                if (err) done(err);
                // HTTP status should be 401
                expect(res).to.have.status(401);
                // Status message should be Unauthorized
                expect(res.res.statusMessage).to.equal('Unauthorized');
                done();
            });
        });
    });

    describe('GET /products/<id>', function() {
        it('allow user to retrieve a specific product' , function(done) {
            apiCall
            .get('wp-json/wc/v3/products/' +product.id)
            .auth('shopmanager', 'axY2 rimc SzO9 cobf AZBw NLnX')
            .end(function(err, res) {
                if (err) done(err);
                // focus on response body
                _body = res.body;
                // Response verification
                // HTTP status should be 200
                expect(res).to.have.status(200);
                // Response should have the right content type as per documentation
                expect(res).to.have.header('content-type', 'application/json; charset=UTF-8');
                // Response values verification. Only tested some values here but more can be added as per API documentation
                // body should be an object
                expect(_body).to.be.an('object');
                // Product should have property id
                expect(_body).to.have.property("id");
                // Product name should match the one provided
                expect(_body.name).to.equal(product.name);
                // roduct price should match the one provided
                expect(_body.price).to.equal(product.regular_price);
                done();
            });
        });

        it('error validation for invalid product' , function(done) {
            apiCall
            .get('wp-json/wc/v3/products/' +(product.id+9999))
            .auth('shopmanager', 'axY2 rimc SzO9 cobf AZBw NLnX')
            .end(function(err, res) {
                if (err) done(err);
                // focus on response body
                _body = res.body;
                // HTTP status should be 200
                expect(res).to.have.status(404);
                // Status message should be Not Found
                expect(res.res.statusMessage).to.equal('Not Found');
                done();
            });
        });

        it('user requires authentication' , function(done) {
            apiCall
            .get('wp-json/wc/v3/products/' +product.id)
            .end(function(err, res) {
                if (err) done(err);
                // HTTP status should be 401
                expect(res).to.have.status(401);
                // Status message should be Unauthorized
                expect(res.res.statusMessage).to.equal('Unauthorized');
                done();
            });
        });
    });

    describe('GET /products', function() {
        it('allow user to get list of products', function(done) {
            apiCall
            .get('wp-json/wc/v3/products')
            .auth('shopmanager', 'axY2 rimc SzO9 cobf AZBw NLnX')
            .end(function(err, res) {
                if (err) done(err);
                // focus on response body
                _body = res.body;
                // Response verification
                // HTTP status should be 200
                expect(res).to.have.status(200);
                // Response should have the right content type as per documentation
                expect(res).to.have.header('content-type', 'application/json; charset=UTF-8');
                // Response values verification. Only tested some values here but more can be added as per API documentation
                // body should be an array
                expect(_body).to.be.an('array');
                // Product should have property id
                expect(_body[0]).to.have.property("id");
                // Product should have property name
                expect(_body[0]).to.have.property("name");
                done();
            });
        });

        it('user requires authentication', function(done) {
            apiCall
            .get('wp-json/wc/v3/products')
            .end(function(err, res) {
                if (err) done(err);
                // HTTP status should be 401
                expect(res).to.have.status(401);
                // Status message should be Unauthorized
                expect(res.res.statusMessage).to.equal('Unauthorized');
                done();
            });
        });
    });

    describe('PUT /products/<id>', function() {
        it('allow user to update specific product' , function(done) {
            apiCall
            .put('/wp-json/wc/v3/products/' +product.id)
            .auth('shopmanager', 'axY2 rimc SzO9 cobf AZBw NLnX')
            .send( {regular_price: "50", name: "Product TestNameModified"} )
            .end(function(err, res) {
                if (err) done(err);
                // focus on response body
                _body = res.body;
                // Response verification
                // HTTP status should be 200
                expect(res).to.have.status(200);
                // Status message should be Ok
                expect(res.res.statusMessage).to.equal('OK');
                // Response should have the right content type as per documentation
                expect(res).to.have.header('content-type', 'application/json; charset=UTF-8');
                // Response values verification. Only tested some values here but more can be added as per API documentation
                // body should be an object
                expect(_body).to.be.an('object');
                // Product should have property id
                expect(_body).to.have.property("id");
                // Product name should match the new name
                expect(_body.name).to.equal("Product TestNameModified");
                // roduct price should match the new price
                expect(_body.price).to.equal("50");
                done();
            });
        });

        it('error validation for invalid products' , function(done) {
            apiCall
            .put('/wp-json/wc/v3/products/' +(product.id+9999))
            .auth('shopmanager', 'axY2 rimc SzO9 cobf AZBw NLnX')
            .send( {regular_price: "50", name: "Product TestNameModified"} )
            .end(function(err, res) {
                if (err) done(err);
                // focus on response body
                _body = res.body;
                // HTTP status should be 200
                expect(res).to.have.status(400);
                // Status message should be Not Found, but for some reason Prod app is throwing back a Bad Request message
                expect(res.res.statusMessage).to.equal('Bad Request');
                done();
            });
        });

        it('user requires authentication' , function(done) {
            apiCall
            .put('/wp-json/wc/v3/products/' +product.id)
            .send( {regular_price: "50", name: "Product TestNameModified"} )
            .end(function(err, res) {
                if (err) done(err);
                // HTTP status should be 401
                expect(res).to.have.status(401);
                // Status message should be Unauthorized
                expect(res.res.statusMessage).to.equal('Unauthorized');
                done();
            });
        });
    });

    describe('DELETE /products/<id>', function() {
        it('error validation for invalid products' , function(done) {
            apiCall
            .delete('/wp-json/wc/v3/products/' +(product.id+9999))
            .auth('shopmanager', 'axY2 rimc SzO9 cobf AZBw NLnX')
            .end(function(err, res) {
                if (err) done(err);
                // focus on response body
                _body = res.body;
                // Response verification
                // HTTP status should be 200
                expect(res).to.have.status(404);
                // Status message should be Not Found
                expect(res.res.statusMessage).to.equal('Not Found');
                done();
            });
        });
    
        it('user requires authentication' , function(done) {
            apiCall
            .delete('/wp-json/wc/v3/products/' +product.id)
            .end(function(err, res) {
                if (err) done(err);
                // HTTP status should be 401
                expect(res).to.have.status(401);
                // Status message should be Unauthorized
                expect(res.res.statusMessage).to.equal('Unauthorized');
                done();
            });
        });

        it('allow user to delete specific product' , function(done) {
            apiCall
            .delete('/wp-json/wc/v3/products/' +product.id)
            .auth('shopmanager', 'axY2 rimc SzO9 cobf AZBw NLnX')
            .end(function(err, res) {
                if (err) done(err);
                // focus on response body
                _body = res.body;
                // Response verification
                // HTTP status should be 200
                expect(res).to.have.status(200);
                // Status message should be Ok
                expect(res.res.statusMessage).to.equal('OK');
                // Response should have the right content type as per documentation
                expect(res).to.have.header('content-type', 'application/json; charset=UTF-8');
                // Response values verification. Only tested some values here but more can be added as per API documentation
                // body should be an object
                expect(_body).to.be.an('object');
                // Product should have property id
                expect(_body).to.have.property("id");
                // Product name should match the new name
                expect(_body.name).to.equal("Product TestNameModified");
                // roduct price should match the new price
                expect(_body.price).to.equal("50");
                done();
            });
        });
    });
});
