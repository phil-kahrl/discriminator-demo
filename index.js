const arccore = require("@encapsule/arccore");

let factoryResponse= arccore.filter.create({
    operationID: "VzjSyFMoQlOhjeUhYx8mUg",
    operationName: "Filter 1",
    operationDescription: "Filter 1",
    outputFilterSpec: {____accept: "jsString"},
    inputFilterSpec: {
        ____types: "jsObject",
        A: {
            ____accept: "jsString"
        }
    },
    bodyFunction: (request_) => {
        return {result: "Hello from filter1"};
    }
});

if (factoryResponse.error) throw new Error(factoryResponse.error);

let filter1 = factoryResponse.result;

factoryResponse= arccore.filter.create({
    operationID: "hm8AwWv2Q7aShmcOWVUtFQ",
    operationName: "Filter 2",
    operationDescription: "Filter 2",
    outputFilterSpec: {____accept: "jsString"},
    inputFilterSpec: {
        ____types: "jsObject",
        B: {
            ____accept: "jsString"
        }
    },
    bodyFunction: (request_) => {
        return {result: "Hello from filter2"};
    }
});

if (factoryResponse.error) throw new Error(factoryResponse.error);

let filter2 = factoryResponse.result;

let discriminatorFactoryResponse = arccore.discriminator.create({
    filters: [
        filter1,
        filter2
    ],
    options: {
        action: "routeRequest" //____inValueSet ["getFilterID","getFilter","routeRequest"]
    }
});

const discriminator = discriminatorFactoryResponse.result;

let response = discriminator.request({A: "argh"});
console.log(response); //{ error: null, result: 'Hello from filter1' }

response = discriminator.request({B: "baz"});
console.log(response); //{ error: null, result: 'Hello from filter2' }

response = discriminator.request({C: "cat"});
console.log(response);
// 'Filter [ezd3pc69gF6NEaLnNWNUng::Discriminator Filter] failed while performing main operation. Unrecognized request format. Request signature must match one of filter set {[VzjSyFMoQlOhjeUhYx8mUg::Filter 1], [hm8AwWv2Q7aShmcOWVUtFQ::Filter 2]}.'

/**
    Discriminator constructor will return an error if number of filters < 1
**/

discriminatorFactoryResponse = arccore.discriminator.create({
    filters: [
        filter2
    ],
    options: {
        action: "routeRequest" //____inValueSet ["getFilterID","getFilter","routeRequest"]
    }
});

console.log(discriminatorFactoryResponse);
//{error: 'Filter [5A8uDJunQUm1w-HcBPQ6Gw::Request Discriminator Filter Factory] failed while performing main operation. Invalid request. You must specify an array of two or more Filter objects to construct a Discriminator Filter.',result: null}

/**
    Discriminator returns an error if filter specs over lap
**/

factoryResponse= arccore.filter.create({
    operationID: "xL2qDIobSMenfUu8cu6ayw",
    operationName: "Filter 3",
    operationDescription: "Filter 3",
    inputFilterSpec: {
        ____types: "jsObject",
        A: {
            ____types: ["jsString", "jsObject"],
            C: {
                ____accept: "jsObject",
                ____defaultValue: {}
            }
        }
    },
    bodyFunction: (request_) => {
        return {result: undefined}
    }
});

let filter3 = factoryResponse.result;

discriminatorFactoryResponse = arccore.discriminator.create({
    filters: [
        filter1,
        filter2,
        filter3
    ],
    options: {
        action: "routeRequest"
    }
});

console.log(discriminatorFactoryResponse);
//{error: "Filter [5A8uDJunQUm1w-HcBPQ6Gw::Request Discriminator Filter Factory] failed while performing main operation. Filters [VzjSyFMoQlOhjeUhYx8mUg, xL2qDIobSMenfUu8cu6ayw] overlap ambiguously at filter spec node 'request(jsObject).A(jsString)'.",result: null}

















