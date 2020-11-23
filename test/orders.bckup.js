let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let { expect, should } = chai;

// let apiCall, temp, temp1;
let apiCall = chai.request('http://34.205.174.166/');

// let temp = require('./data-sets/product-standard.js');
// let product = temp.product;
// let temp1 = require('./data-sets/coupon-standard.js');
// let coupon = temp1.coupon;
let temp2 = require('./data-sets/order-standard.js');
var order = temp2.order;
var finalOrder = {};
// var response;

let d = new Date();
let timestamp = [d.getFullYear(), d.getMonth()+1, d.getDate(), 
  d.getHours(), d.getMinutes(), Math.round(Math.random() * 10000)].join('');


var coupon = {
    "code": timestamp,
    "amount": "10.00"
  };

var product = {
    "name": "Product TestName External",
    "regular_price": "60.00"
};

describe('Orders CRUD', function() { 
    console.log("1 ***********");
    var response;


    // SETUP
    before(function() {
        // it('SETUP', function() {
        console.log("2 ***********");
        // create product
        // console.log("order.line_items.product_id 0: " +order.line_items[0].product_id);
        apiCall
        .post('/wp-json/wc/v3/products')
        .auth('shopmanager', 'axY2 rimc SzO9 cobf AZBw NLnX')
        .send(product)
        .end(function(err, res) {
            // stores product ID for later use
            order.line_items[0].product_id = res.body.id;
            // HTTP status should be 200
            expect(res).to.have.status(201);
            // console.log("order.line_items.product_id 1: " +order.line_items[0].product_id);

            // create coupon
            apiCall
            .post('/wp-json/wc/v3/coupons')
            .auth('shopmanager', 'axY2 rimc SzO9 cobf AZBw NLnX')
            .send(coupon)
            .end(function(err, res) {
                // stores coupon ID for later use
                coupon.id = res.body.id;
                order.coupon_lines[0].code = res.body.code;
                // HTTP status should be 200
                expect(res).to.have.status(201);

                // create order
                apiCall
                .post('/wp-json/wc/v3/orders')
                .auth('shopmanager', 'axY2 rimc SzO9 cobf AZBw NLnX')
                .send(order)
                .end(function(err, res) {
                    // stores coupon ID for later use
                    coupon.id = res.body.id;
                    // HTTP status should be 200
                    expect(res).to.have.status(201);
                    finalOrder = order;
                    response = res;
                    // console.log(order);
                });
            });
        });  
    });

    beforeEach(function() {
        
    });

    afterEach(function() {
        
    });
    

    describe('POST /Orders', function() {
        it('allow user to create a new product' , function(done) {
            // console.log(finalOrder.line_items[0].product_id);
            console.log("response: " +response);

            // console.log("order.line_items.product_id 2: " +order.line_items[0].product_id);


            done();

        });
    });
});