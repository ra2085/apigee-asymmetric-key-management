var http = require('http');
var jose = require('node-jose');

console.log('node.js application starting...');
var svr = http.createServer(function(req, resp) {
    if(req.method == 'POST'){
        let body = [];
        req.on('data', (chunk) => {
          body.push(chunk);
        }).on('end', () => {
          body = Buffer.concat(body).toString();
	  wrapper = JSON.parse(body);
		jose.JWK.asKey(wrapper.privateKey).
        then(function(keys) {
	jose.JWE.createDecrypt(keys.keystore).
        decrypt(wrapper.jwe).
        then(function(result) {
        resp.setHeader('Content-Type', 'application/json');
		resp.end(result.payload);
        });
        });
        });
    } else {
resp.setHeader('Content-Type', 'application/json');
var props = {
  alg: 'RSA1_5',
  use: 'enc'
};
jose.JWK.createKeyStore().generate("RSA", 2048, props).
        then(function(key) {
	var keypair = {};
	keypair.publicKey = key.toJSON();
	keypair.privateKey = key.toJSON(true);
	resp.end(JSON.stringify(keypair));
        });
}
});

svr.listen(9000, function() {
    console.log('Node HTTP server is listening');
});
