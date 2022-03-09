// instamojo api file

var request = require('request');
var Instamojo = require('instamojo-nodejs')
// let Order = require('../model/order')
exports.pay = async function (body) {
  var headers = {
    'X-Api-Key': 'test_d5f178f6f910a5ec48a429d540d',
    'X-Auth-Token': 'test_f3f32cda3a7aafc2a188579530f'
  }
  // Insta.isSandboxMode(true);

  var payload = {
    purpose: body.purpose,
    amount: body.amount,
    phone: body.phone,
    buyer_name: body.buyer_name,
    buyer_father_name: body.buyer_father_name,
    redirect_url: body.redirect_url,
    send_email: body.send_email,
    webhook: body.webhook,
    send_sms: body.send_sms,
    email: body.email,
    allow_repeated_payments: body.allow_repeated_payments,
    pincode: body.pincode,
    additional_number: body.additional_number,
    street: body.street,
    landmark: body.landmark,
    city: body.city,
    district: body.district,
    state: body.state,
  }
  let res = await instaPay(payload, headers)
  function instaPay(payload, headers) {
    return new Promise(function (resolve, reject) {
      request.post('https://test.instamojo.com/api/1.1/payment-requests/', { form: payload, headers: headers }, function (err, res) {
        if (err) {
          reject(err)
        } else {
          var parsed = JSON.parse(res.body);
          var redirectu = parsed.payment_request.longurl
          resolve(redirectu)
        }
      })
    })
  }
  if (!res) {
    throw new Error('No response came')
  }
  return res
}


