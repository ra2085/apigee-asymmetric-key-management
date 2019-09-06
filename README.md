# Asymmetric Key Management
This is an Apigee Edge API Proxy that:
 - Supports Data-In-Motion encryption using [JWE](https://tools.ietf.org/html/rfc7516#section-3) and [JWK](https://tools.ietf.org/html/rfc7517) to securely transport and push Key Pairs into Encrypted KVMs.
 - Uses Encrypted KVM key pair values to validate and sign JWTs using the RS256 algorithm.
# Installation
## Clone the repository
```
git clone https://github.com/apigee/apigeetool-node.git
```
## Install Script And Follow instructions
```
npm install && node setup.js
```
# NOT A GOOGLE PRODUCT
This is not an officially supported Google product.

License
----
MIT
**Free Software, Hell Yeah!**