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
      },
	  cleanup: {
		  message: 'Do you want to uninstall?',
		  validator: /y[es]*|n[o]?/,
		  warning: 'Must respond yes or no',
		  default: 'no'
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
	try {
	if(options.cleanup.startsWith("y")){
		console.log("Uninstalling...");
		await deleteEncryptedKVMTransportKeys_txport_private_key(opts);
		await deleteEncryptedKVMTransportKeys_txport_public_key(opts);
		await deleteEncryptedKVMTransportKeys(opts);
		await deleteEncryptedKVMJWTKeyPairs_gwjwt_key_pair(opts);
		await deleteEncryptedKVMJWTKeyPairs_gwjwt_pem_private_key(opts);
		await deleteEncryptedKVMJWTKeyPairs_gwjwt_pem_public_key(opts);
		await deleteEncryptedKVMJWTKeyPairs(opts);
		console.log("KVMs Deleted...");
		await deleteApp(opts);
		console.log("App Deleted...");
		await deleteDeveloper(opts);
		console.log("Developer Deleted...");
		await deleteProduct(opts);
		console.log("Product Deleted...");
		await undeployProxy(opts);
		console.log("Proxy Undeployed...");
	} else {	
		console.log("Installing...");
		await createEncryptedKVMTransportKeys(opts);
		await createEncryptedKVMJWTKeyPairs(opts);
		console.log("KVMs Created...")
		await createEncryptedKVMTransportKeys_txport_private_key(opts);
		await createEncryptedKVMTransportKeys_txport_public_key(opts);
		await createEncryptedKVMJWTKeyPairs_gwjwt_key_pair(opts);
		await createEncryptedKVMJWTKeyPairs_gwjwt_pem_private_key(opts);
		await createEncryptedKVMJWTKeyPairs_gwjwt_pem_public_key(opts);
		console.log("KVMs Entries Created...");
		await deployProxy(opts);
		console.log("Proxy Deployed...");
		await createDeveloper(opts);
		console.log("Developer Created...");
		await createProduct(opts);
		console.log("Product Created...");
		await createApp(opts);
		console.log("App Created...");
	}
	} catch (ex){
		console.log(ex);
	}
});

function jsonCopy(src) {
  return JSON.parse(JSON.stringify(src));
}

async function createDeveloper(options) {
	let localOptions = jsonCopy(options);
	localOptions.email = "someone@somewhere.com";
	localOptions.firstName = "Someone";
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
	localOptions.apiProducts = "asymmetric-key-management-product";
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
	localOptions.environment = localOptions.environments;
	return sdk.createKVM(localOptions);
}

async function deleteEncryptedKVMTransportKeys(options) {
	let localOptions = jsonCopy(options);
	localOptions.mapName = "TransportKeys";
	localOptions.environment = localOptions.environments;
	return sdk.deleteKVM(localOptions);
}

async function createEncryptedKVMJWTKeyPairs(options) {
	let localOptions = jsonCopy(options);
	localOptions.mapName = "JWTKeyPairs";
	localOptions.encrypted = true;
	localOptions.environment = localOptions.environments;
	return sdk.createKVM(localOptions);
}

async function deleteEncryptedKVMJWTKeyPairs(options) {
	let localOptions = jsonCopy(options);
	localOptions.mapName = "JWTKeyPairs";
	localOptions.environment = localOptions.environments;
	return sdk.deleteKVM(localOptions);
}

async function createEncryptedKVMTransportKeys_txport_private_key(options) {
	let localOptions = jsonCopy(options);
	localOptions.mapName = "TransportKeys";
	localOptions.entryName = "txport_private_key";
	localOptions.entryValue = "initial";
	localOptions.environment = localOptions.environments;
	return sdk.addEntryToKVM(localOptions);
}

async function createEncryptedKVMTransportKeys_txport_public_key(options) {
	let localOptions = jsonCopy(options);
	localOptions.mapName = "TransportKeys";
	localOptions.entryName = "txport_public_key";
	localOptions.entryValue = "initial";
	localOptions.environment = localOptions.environments;
	return sdk.addEntryToKVM(localOptions);
}

async function deleteEncryptedKVMTransportKeys_txport_private_key(options) {
	let localOptions = jsonCopy(options);
	localOptions.mapName = "TransportKeys";
	localOptions.entryName = "txport_private_key";
	localOptions.entryValue = "initial";
	localOptions.environment = localOptions.environments;
	return sdk.deleteKVMentry(localOptions);
}

async function deleteEncryptedKVMTransportKeys_txport_public_key(options) {
	let localOptions = jsonCopy(options);
	localOptions.mapName = "TransportKeys";
	localOptions.entryName = "txport_public_key";
	localOptions.entryValue = "initial";
	localOptions.environment = localOptions.environments;
	return sdk.deleteKVMentry(localOptions);
}

async function createEncryptedKVMJWTKeyPairs_gwjwt_key_pair(options) {
	let localOptions = jsonCopy(options);
	localOptions.mapName = "JWTKeyPairs";
	localOptions.entryName = "gwjwt_key_pair";
	localOptions.entryValue = "initial";
	localOptions.environment = localOptions.environments;
	return sdk.addEntryToKVM(localOptions);
}

async function createEncryptedKVMJWTKeyPairs_gwjwt_pem_private_key(options) {
	let localOptions = jsonCopy(options);
	localOptions.mapName = "JWTKeyPairs";
	localOptions.entryName = "gwjwt_pem_private_key";
	localOptions.entryValue = "initial";
	localOptions.environment = localOptions.environments;
	return sdk.addEntryToKVM(localOptions);
}

async function createEncryptedKVMJWTKeyPairs_gwjwt_pem_public_key(options) {
	let localOptions = jsonCopy(options);
	localOptions.mapName = "JWTKeyPairs";
	localOptions.entryName = "gwjwt_pem_public_key";
	localOptions.entryValue = "initial";
	localOptions.environment = localOptions.environments;
	return sdk.addEntryToKVM(localOptions);
}

async function deleteEncryptedKVMJWTKeyPairs_gwjwt_key_pair(options) {
	let localOptions = jsonCopy(options);
	localOptions.mapName = "JWTKeyPairs";
	localOptions.entryName = "gwjwt_key_pair";
	localOptions.environment = localOptions.environments;
	return sdk.deleteKVMentry(localOptions);
}

async function deleteEncryptedKVMJWTKeyPairs_gwjwt_pem_private_key(options) {
	let localOptions = jsonCopy(options);
	localOptions.mapName = "JWTKeyPairs";
	localOptions.entryName = "gwjwt_pem_private_key";
	localOptions.environment = localOptions.environments;
	return sdk.deleteKVMentry(localOptions);
}

async function deleteEncryptedKVMJWTKeyPairs_gwjwt_pem_public_key(options) {
	let localOptions = jsonCopy(options);
	localOptions.mapName = "JWTKeyPairs";
	localOptions.entryName = "gwjwt_pem_public_key";
	localOptions.environment = localOptions.environments;
	return sdk.deleteKVMentry(localOptions);
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