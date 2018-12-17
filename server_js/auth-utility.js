const crypto = require('crypto');
const sign = crypto.createSign('RSA-SHA256');
const fs = require('fs');
const base64UrlEncode = require('base64url');
const request = require('request');

var getSessionInfo = async function () {
    var jwt = await generateJWT();
    var sessionInfo = await authenticateSF(jwt);
    return sessionInfo;
}

var generateJWT = async function () {
    var header = createHeaderBase64Encoded();
    var payload = createPayloadBase64Encoded();
    var signature = await getSignature(header, payload);
    var jwt = header + '.' + payload + '.' + base64UrlEncode.encode(sign.sign(signature));
    return jwt;
}

var getSignature = async function (header, payload) {
    var signature = header + '.' + payload;
    sign.update(signature);
    return await getServerKey();
}

var getServerKey = async function () {
    var key;
    key = fs.readFileSync('./key_files/server.key', 'utf-8');
    return key;
}

var createPayloadBase64Encoded = function () {
    var payload = {};
    payload.iss = '3MVG9I1kFE5Iul2ByL7xC2RUdobMqBUTjVBmCMEmXktsDdGOouWMWhKjShAMTiKcnz_6CRbFt7q7vTVjclvXT';
    payload.sub = 'gms.client@gmail.com';
    payload.aud = 'https://login.salesforce.com';
    var nowTime = new Date(new Date().getTime() + 120000);
    payload.exp = '' + nowTime.getTime() + '';
    return base64UrlEncode.encode(JSON.stringify(payload));
}

var createHeaderBase64Encoded = function () {
    var header = {};
    header.alg = 'RS256';
    return base64UrlEncode.encode(JSON.stringify(header));
}

var authenticateSF = async function (jwt) {
    var options = {};
    options.url = 'https://login.salesforce.com/services/oauth2/token';
    options.headers = {};
    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    options.method = 'POST';
    options.form = {};
    options.form['grant_type'] = 'urn:ietf:params:oauth:grant-type:jwt-bearer';
    options.form['assertion'] = jwt;
    return postRequest(options);
}

var postRequest = function (options) {
    return new Promise(function (resolve, reject) {
        request(options, function (error, response, body) {
            resolve(body);
        });
    });
}

module.exports = {
    getSessionInfo: getSessionInfo
};