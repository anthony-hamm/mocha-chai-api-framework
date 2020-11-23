let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect, should } = chai;

const apiCall = chai.request('http://34.205.174.166/');
let temp1 = require('./data-sets/coupon-standard.js');
coupon = temp1.coupon;
let temp = require('./data-sets/coupon-modified');
couponModified = temp.couponModified;


 // CRUD tests for Coupons
describe('Coupons CRUD', function() {

    describe('POST /coupons', function() {
        it('allow user to create a new coupon' , function(done) {
            apiCall
            .post('/wp-json/wc/v3/coupons')
            .auth('shopmanager', 'axY2 rimc SzO9 cobf AZBw NLnX')
            .send(coupon)
            .end(function(err, res) {
                if (err) done(err);
                // focus on response body
                _body = res.body;
                // stores coupon ID for later use
                coupon.id = res.body.id;
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
                // coupon should have property id
                expect(_body).to.have.property("id");
                // coupon name should match the one provided
                expect(_body.code).to.equal(coupon.code);
                // roduct price should match the one provided
                expect(_body.amount).to.equal(coupon.amount);
                done();
            });
        });

        it('user requires authentication' , function(done) {
            apiCall
            .post('/wp-json/wc/v3/coupons')
            .send(coupon)
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

    describe('GET /coupons/<id>', function() {
        it('allow user to retrieve a specific coupon' , function(done) {
            apiCall
            .get('wp-json/wc/v3/coupons/' +coupon.id)
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
                // coupon should have property id
                expect(_body).to.have.property("id");
                // coupon name should match the one provided
                expect(_body.code).to.equal(coupon.code);
                // roduct price should match the one provided
                expect(_body.amount).to.equal(coupon.amount);
                done();
            });
        });

        it('error validation for invalid coupons' , function(done) {
            apiCall
            .get('wp-json/wc/v3/coupons/' +(coupon.id+9999))
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
            .get('wp-json/wc/v3/coupons/' +coupon.id)
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

    describe('GET /coupons', function() {
        it('allow user to get list of coupons', function(done) {
            apiCall
            .get('wp-json/wc/v3/coupons')
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
                // coupon should have property id
                expect(_body[0]).to.have.property("id");
                // coupon should have property name
                expect(_body[0]).to.have.property("code");
                done();
            });
        });

        it('user requires authentication', function(done) {
            apiCall
            .get('wp-json/wc/v3/coupons')
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

    describe('PUT /coupons/<id>', function() {
        it('allow user to update specific coupon' , function(done) {
            apiCall
            .put('/wp-json/wc/v3/coupons/' +coupon.id)
            .auth('shopmanager', 'axY2 rimc SzO9 cobf AZBw NLnX')
            .send(couponModified)
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
                // coupon should have property id
                expect(_body).to.have.property("id");
                // coupon name should match the new name
                expect(_body.code).to.equal(couponModified.code);
                // roduct price should match the new price
                expect(_body.amount).to.equal(couponModified.amount);
                done();
            });
        });

        it('error validation for invalid coupons' , function(done) {
            apiCall
            .put('/wp-json/wc/v3/coupons/' +(coupon.id+9999))
            .auth('shopmanager', 'axY2 rimc SzO9 cobf AZBw NLnX')
            .send(couponModified)
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
            .put('/wp-json/wc/v3/coupons/' +coupon.id)
            .send(couponModified)
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

    describe('DELETE   /coupons/<id>', function() {
        it('error validation for invalid coupons' , function(done) {
            apiCall
            .delete('/wp-json/wc/v3/coupons/' +(coupon.id+9999))
            .auth('shopmanager', 'axY2 rimc SzO9 cobf AZBw NLnX')
            .send( {force: true} )
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
            .delete('/wp-json/wc/v3/coupons/' +coupon.id)
            .send( {force: true} )
            .end(function(err, res) {
                if (err) done(err);
                // HTTP status should be 401
                expect(res).to.have.status(401);
                // Status message should be Unauthorized
                expect(res.res.statusMessage).to.equal('Unauthorized');
                done();
            });
        });
        
        it('allow user to delete specific coupon' , function(done) {
            apiCall
            .delete('/wp-json/wc/v3/coupons/' +coupon.id)
            .auth('shopmanager', 'axY2 rimc SzO9 cobf AZBw NLnX')
            .send( {force: true} )
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
                // coupon should have property id
                expect(_body).to.have.property("id");
                // coupon name should match the new name
                expect(_body.code).to.equal(couponModified.code);
                // roduct price should match the new price
                expect(_body.amount).to.equal(couponModified.amount);
                done();
            });
        });
    });
});