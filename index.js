const arccore = require("@encapsule/arccore");

let factoryResponse= arccore.filter.create({
    operationID: "VzjSyFMoQlOhjeUhYx8mUg",
    operationName: "Filter 1",
    operationDescription: "Filter 1",
    inputFilterSpec: {
        ____types: "jsObject",
        A: {
            ____accept: "jsString"
        }
    },
    bodyFunction: (request_) => {
        return {result: undefined}
    }
});

if (factoryResponse.error) throw new Error(factoryResponse.error);

let filter1 = factoryResponse.result;

factoryResponse= arccore.filter.create({
    operationID: "hm8AwWv2Q7aShmcOWVUtFQ",
    operationName: "Filter 2",
    operationDescription: "Filter 2",
    inputFilterSpec: {
        ____types: "jsObject",
        B: {
            ____accept: "jsString"
        }
    },
    bodyFunction: (request_) => {
        return {result: undefined}
    }
});

if (factoryResponse.error) throw new Error(factoryResponse.error);

let filter2 = factoryResponse.result;

const discriminatorFactory = arccore.discriminator.create({
    filters: [
        filter1,
        filter2
    ],
    options: {
        action: "routeRequest" //____inValueSet ["getFilterID","getFilter","routeRequest"]
    }
});

if (discriminatorFactory.error) throw new Error (discriminatorFactory.error);

const discriminator = discriminatorFactory.result;

let response = discriminator.request({A: "argh"});
console.log(response); //{ error: null, result: undefined }

response = discriminator.request({B: "baz"});
console.log(response); //{ error: null, result: undefined }

response = discriminator.request({C: "cat"});
console.log(response);
// 'Filter [ezd3pc69gF6NEaLnNWNUng::Discriminator Filter] failed while performing main operation. Unrecognized request format. Request signature must match one of filter set {[VzjSyFMoQlOhjeUhYx8mUg::Filter 1], [hm8AwWv2Q7aShmcOWVUtFQ::Filter 2]}.'

/**
    Discriminator constructor will return an error if number of filters < 1
**/

//TODO

/**
    Discriminator returns an error if filter specs over lap
**/

//TODO

















