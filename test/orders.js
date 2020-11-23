let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let { expect, should } = chai;

let apiCall = chai.request('http://34.205.174.166/');
let d = new Date();
let timestamp = [d.getFullYear(), d.getMonth()+1, d.getDate(), 
  d.getHours(), d.getMinutes(), Math.round(Math.random() * 10000)].join('');
let coupon = { code: timestamp, amount: "10.00", };
let product = { name: "Hamm Quality", regular_price: "100.00", };
let order = { 
    line_items: [{ product_id: 7903 }], 
    coupon_lines: [{ code: 123, }]
};

describe('Orders - The Challenge', function() { 

    describe('Setup', function() {

        it('create a new product' , (done) => {
            apiCall
            .post('/wp-json/wc/v3/products')
            .auth('shopmanager', 'axY2 rimc SzO9 cobf AZBw NLnX')
            .send(product)
            .end(function(err, res) {
                // stores product ID for later use
                product.id = res.body.id;
                // Response verification
                // HTTP status should be 200
                expect(res).to.have.status(201);
                done();
            });
        });

        it('create a new coupon' , function(done) {
            apiCall
            .post('/wp-json/wc/v3/coupons')
            .auth('shopmanager', 'axY2 rimc SzO9 cobf AZBw NLnX')
            .send(coupon)
            .end(function(err, res) {
                // stores coupon ID for later use
                coupon.id = res.body.id;
                // HTTP status should be 200
                expect(res).to.have.status(201);
                done();
            });
        });

        it('create a new order with product and coupon output' , function(done) {
            order.line_items[0].product_id = product.id;
            order.coupon_lines[0].code = coupon.code;
            apiCall
            .post('/wp-json/wc/v3/orders')
            .auth('shopmanager', 'axY2 rimc SzO9 cobf AZBw NLnX')
            .send(order)
            .end(function(err, res) {
                // stores coupon ID for later use
                order.id = res.body.id;
                // HTTP status should be 200
                expect(res).to.have.status(201);
            done();
            });
        });

        
    });

    describe('Integration Tests', function() {
        it('user should be able to retrieve the already created product' , function(done) {
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

        it('user should be able to retrieve the already created coupon' , function(done) {
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

        it('user should be able to retrieve the already created order' , function(done) {
            apiCall
            .get('/wp-json/wc/v3/orders/' +order.id)
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
                expect(_body.discount_total).to.equal(coupon.amount);
                // roduct price should match the one provided
                expect(_body.line_items[0].product_id).to.equal(product.id);
                done();
            });
        });

    });

    describe('Teardown - Clean Up', function() {
        it('user should be able to delete the already created product' , function(done) {
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
                done();
            });
        });

        it('user should be able to delete the already created coupon' , function(done) {
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
                done();
            });
        });

        it('user should be able to delete the already created order' , function(done) {
            apiCall
            .delete('/wp-json/wc/v3/orders/' +order.id)
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
                done();
            });
        });


    });

});