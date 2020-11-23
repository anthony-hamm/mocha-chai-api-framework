let d = new Date();
let timestamp = [d.getFullYear(), d.getMonth()+1, d.getDate(), 
  d.getHours(), d.getMinutes(), Math.round(Math.random() * 10000)].join('');

exports.couponModified = {
  "code": timestamp+1,
  "discount_type": "percent",
  "amount": "5.00",
  "individual_use": true,
  "exclude_sale_items": true,
  "minimum_amount": "1.00"
};