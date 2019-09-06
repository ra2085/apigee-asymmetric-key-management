var prompt = require("prompt");
var colors = require("colors/safe");
var replace = require("replace-in-file");
var apigeetool = require('apigeetool');
var sdk = apigeetool.getPromiseSDK();
var fs = require("fs");
var srcDir = "./";

var schema = {
    properties: {
      org: {
        description: colors.yellow("Please provide the Apigee Edge Organization name"),
        message: colors.red("Apigee Edge Organization name cannot be empty!"),
        required: true
      },
      env: {
        description: colors.yellow("Please provide the Apigee Edge Environment name"),
        message: colors.red("Apigee Edge Environment name cannot be empty!"),
        required: true
      },
      username: {
        description: colors.yellow("Please provide the Apigee Edge username"),
        message: colors.red("Apigee Edge username cannot be empty!"),
        required: true
      },
      password: {
        description: colors.yellow("Please provide the Apigee Edge password"),
        message: colors.red("Apigee Edge password cannot be empty!"),
        hidden: true,  
        replace: '*',
        required: true
      }
    }
  };
 
//
// Start the prompt
//
prompt.start();

prompt.get(schema, async function (err, options) {
	var opts = {};
	opts.organization = options.org;
	opts.username = options.username;
	opts.password = options.password;
	opts.environments = options.env;
	opts.directory = "./";
	await deleteDeveloper(opts);
	await deleteProduct(opts);
	await deleteApp(opts);
	await undeployProxy(opts);
	await deleteEncryptedKVMTransportKeys(opts);
	await deleteEncryptedKVMJWTKeyPairs(opts);
	await createEncryptedKVMTransportKeys_txport_private_key(opts);
	await createEncryptedKVMTransportKeys_txport_public_key(opts);
	await createEncryptedKVMJWTKeyPairs_gwjwt_key_pair(opts);
	await createEncryptedKVMJWTKeyPairs_gwjwt_pem_private_key(opts);
	await createEncryptedKVMJWTKeyPairs_gwjwt_pem_public_key(opts);
	await deployProxy(opts);
	await createDeveloper(opts);
	await createProduct(opts);
	await createApp(opts);
});

function jsonCopy(src) {
  return JSON.parse(JSON.stringify(src));
}

async function createDeveloper(options) {
	let localOptions = jsonCopy(options);
	localOptions.email = "someone@somewhere.com";
	localOptions.fistName = "Someone";
	localOptions.lastName = "Somewhere";
	localOptions.userName = "someonesomewhere";
	return sdk.createDeveloper(localOptions);
}

async function deleteDeveloper(options) {
	let localOptions = jsonCopy(options);
	localOptions.email = "someone@somewhere.com";
	return sdk.deleteDeveloper(localOptions);
}

async function createProduct(options) {
	let localOptions = jsonCopy(options);
	localOptions.productName = "asymmetric-key-management-product";
	localOptions.productDesc = 'description'
	localOptions.proxies = "asymmetric-key-management";
	localOptions.quota = '1', //quota amount
	localOptions.quotaInterval = '1' //interval
	localOptions.quotaTimeUnit = 'minute' //timeunit
	return sdk.createProduct(localOptions);
}

async function deleteProduct(options) {
	let localOptions = jsonCopy(options);
	localOptions.productName = "asymmetric-key-management-product";
	return sdk.deleteProduct(localOptions);
}

async function createApp(options) {
	let localOptions = jsonCopy(options);
	localOptions.name = "asymmetric-key-management-app";
	localOptions.apiproducts = "asymmetric-key-management-product";
	localOptions.email = "someone@somewhere.com";
	return sdk.createApp(localOptions);
}

async function deleteApp(options) {
	let localOptions = jsonCopy(options);
	localOptions.email = "someone@somewhere.com"
	localOptions.name = "asymmetric-key-management-app";
	return sdk.deleteApp(localOptions);
}

async function createEncryptedKVMTransportKeys(options) {
	let localOptions = jsonCopy(options);
	localOptions.mapName = "TransportKeys";
	localOptions.encrypted = true;
	return sdk.createKVM(localOptions);
}

async function deleteEncryptedKVMTransportKeys(options) {
	let localOptions = jsonCopy(options);
	localOptions.mapName = "TransportKeys";
	return sdk.deleteKVM(localOptions);
}

async function createEncryptedKVMJWTKeyPairs(options) {
	let localOptions = jsonCopy(options);
	localOptions.mapName = "JWTKeyPairs";
	localOptions.encrypted = true;
	return sdk.createKVM(localOptions);
}

async function deleteEncryptedKVMJWTKeyPairs(options) {
	let localOptions = jsonCopy(options);
	localOptions.mapName = "JWTKeyPairs";
	return sdk.deleteKVM(localOptions);
}

async function createEncryptedKVMTransportKeys_txport_private_key(options) {
	let localOptions = jsonCopy(options);
	localOptions.mapName = "TransportKeys";
	localOptions.entryName = "txport_private_key";
	localOptions.entryValue = "initial";
	return sdk.addEntryToKVM(localOptions);
}

async function createEncryptedKVMTransportKeys_txport_public_key(options) {
	let localOptions = jsonCopy(options);
	localOptions.mapName = "TransportKeys";
	localOptions.entryName = "txport_public_key";
	localOptions.entryValue = "initial";
	return sdk.addEntryToKVM(localOptions);
}

async function createEncryptedKVMJWTKeyPairs_gwjwt_key_pair(options) {
	let localOptions = jsonCopy(options);
	localOptions.mapName = "JWTKeyPairs";
	localOptions.entrtName = "gwjwt_key_pair";
	return sdk.addEntryToKVM(localOptions);
}

async function createEncryptedKVMJWTKeyPairs_gwjwt_pem_private_key(options) {
	let localOptions = jsonCopy(options);
	localOptions.mapName = "JWTKeyPairs";
	localOptions.entrtName = "gwjwt_pem_private_key";
	return sdk.addEntryToKVM(localOptions);
}

async function createEncryptedKVMJWTKeyPairs_gwjwt_pem_public_key(options) {
	let localOptions = jsonCopy(options);
	localOptions.mapName = "JWTKeyPairs";
	localOptions.entrtName = "gwjwt_pem_public_key";
	return sdk.addEntryToKVM(localOptions);
}

async function deployProxy(options) {
	let localOptions = jsonCopy(options);
	localOptions.api = "asymmetric-key-management";
	return sdk.deployProxy(localOptions);
}

async function undeployProxy(options) {
	let localOptions = jsonCopy(options);
	localOptions.api = "asymmetric-key-management";
	return sdk.undeploy(localOptions);
}