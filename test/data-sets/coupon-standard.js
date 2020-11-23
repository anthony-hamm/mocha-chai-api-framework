let d = new Date();
let timestamp = [d.getFullYear(), d.getMonth()+1, d.getDate(), 
  d.getHours(), d.getMinutes(), Math.round(Math.random() * 10000)].join('');

exports.coupon = {
  "code": timestamp,
  "discount_type": "percent",
  "amount": "10.00",
  "individual_use": true,
  "exclude_sale_items": true,
  "minimum_amount": "1.00"
};