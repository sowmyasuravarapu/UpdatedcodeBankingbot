var fs = require('fs');
var path = require('path');
var mime = require('mime');
var express = require('express')
var fromEmailAddress = 'ssuravarapu@miraclesoft.com'
var app = express()
//var pdfreader = require("pdfreader");
var downloadpdf = require('./sample1.js');
var readStream = fs.createReadStream(path.join(__dirname, '../rparobot') + '/file.txt', 'utf8');
let data = ''
readStream.on('data', function (chunk) {
    data += chunk;
}).on('end', function () {
    //console.log(data);
});
var filePath = 'C:/Users/ssuravarapu/Desktop/rparobot/file.txt';
fs.unlinkSync(filePath);


var express = require('express')();
// var server=require('http').createServer(express);
// var io=require('socket.io').listen(server);
var watson = require('watson-developer-cloud');
//var AssistantV1 = require('watson-developer-cloud/assistant/v1');

var assistant = new watson.AssistantV1({
    iam_apikey: 'VxOGwHliRrU0hn4OPoS_XvYAcdlL1P60nNVjMUjE8HOz',
    version: '2018-09-20',
    url: 'https://gateway.watsonplatform.net/assistant/api'
});


var firstPay =
{
    workspace_id: 'c5786638-92b6-4b74-a08f-16f5cdac189d'
}
assistant.message(firstPay, function (err, res) {
    //console.log("this is first request");
    if (err) {
        console.log('error:', err);
    }
    else {
        context = res.context;
        //console.log(res.output.text[0]);
        //console.log(context);
        emailValidations(data);
    }
});


var context;
function emailValidations(data) {
    //console.log(data);
    var payload =
    {
        workspace_id: 'c5786638-92b6-4b74-a08f-16f5cdac189d',
        input: { "text": data },
        context: context
    }

    assistant.message(payload, function (err, res) {
        if (err) {
            console.log('error occured');
        }
        else {
            //console.log(data);
            console.log(res);
            context = res.context;


            if (res.intents[0].intent == "Account_Deactivation") {
                //console.log("account deactivation loop");
                //console.log(data.output.text);
                var finalData = res.output.text + " Customer Email Id:" + fromEmailAddress;
                var PDFDocument = require('pdfkit');
                doc = new PDFDocument
                doc.pipe(fs.createWriteStream('./account_deactivation/Account Deactivation.pdf'));

                doc.font('Times-Roman')
                    .fontSize(25)
                    .text(finalData, 100, 100)
                doc.end();
            }

            else if (res.intents[0].intent == "Original_Address") {
                //console.log("Address Change loop");
                //console.log(data.output.text);
                var newaddress = res.output.text + " Customer Email Id: " + fromEmailAddress;
                var PDFDocument = require('pdfkit');
                doc = new PDFDocument

                doc.pipe(fs.createWriteStream('./address_change/Address Change.pdf'));
                doc.font('Times-Roman')
                    .fontSize(25)
                    .text(newaddress, 100, 100)
                doc.end();
            }


            else if (res.intents[0].intent == "Travel_Update") {
                //console.log("Travel update loop");
                //console.log(data.output.text);
                var newTravel = res.output.text + " Customer Email Id: " + fromEmailAddress;
                var PDFDocument = require('pdfkit');
                doc = new PDFDocument
                doc.pipe(fs.createWriteStream('./travel_update/Travel_Update.pdf'));
                doc.font('Times-Roman')
                    .fontSize(25)
                    .text(newTravel, 100, 100)

                doc.end();
            }


            else if (res.intents[0].intent == "Reward_Redemption") {

                res.entities.filter(inData => {
                    console.log("inside filter")
                    if (inData.value == "new Saving") {
                        console.log(inData.value)
                        var newReward = res.output.text + " Customer Email Id: " + fromEmailAddress;
                        console.log(newReward)
                        var PDFDocument = require('pdfkit');
                        doc = new PDFDocument
                        doc.pipe(fs.createWriteStream('./reward_point/savings/Reward_Point.pdf'));
                        doc.font('Times-Roman')
                            .fontSize(25)
                            .text(newReward, 100, 100)

                        doc.end();
                    }
                })
            }

            else if (res.intents[0].intent == "Reward_Redemption") {
                //console.log("Reward point redemption loop");
                //console.log(data.output.text);
                res.entities.filter(indData => {
                    console.log('inside entities filter');
                    if (indData.value == "new CreditCard") {
                        console.log(indData.value);
                        var newReward = res.output.text + " Customer Email Id: " + fromEmailAddress;
                        var PDFDocument = require('pdfkit');
                        doc = new PDFDocument
                        doc.pipe(fs.createWriteStream('./reward_point/credit/Reward_Point.pdf'));
                        doc.font('Times-Roman')
                            .fontSize(25)
                            .text(newReward, 100, 100)

                        doc.end();
                    }
                })
            }



            // else if (res.intents[0].intent == 'Customer_onboarding' && res.entities[0].value == "new Checking") {

            //     //console.log(res.output.text[0])
               

            //     var source = fs.createReadStream(path.join(__dirname, '../rparobot') + '/Customer Onboarding.pdf', 'utf8');
               
            //     var dest = fs.createWriteStream('./customer_onboarding/new Checking/Customer Onboarding.pdf');

            //     source.pipe(dest);
            //     source.on('end', function () { /* copied */ });
            //     source.on('error', function (err) { /* error */ });

            // }

            // else if(res.intents[0].intent=='Customer_onboarding' && res.entities[0].value=='new Saving'){
            //     var source = fs.createReadStream(path.join(__dirname, '../rparobot') + '/Customer Onboarding.pdf', 'utf8');
               
            //     var dest = fs.createWriteStream('./customer_onboarding/new Saving/Customer Onboarding.pdf');

            //     source.pipe(dest);
            //     source.on('end', function () { /* copied */ });
            //     source.on('error', function (err) { /* error */ });
                
            // }

            else if(res.intents[0].intent=='Customer_onboarding' && res.entities[0].value=='new CreditCard'){
                var source = fs.createReadStream(path.join(__dirname, '../rparobot') + '/Customer Onboarding.pdf', 'utf8');
               
                var dest = fs.createWriteStream('./customer_onboarding/new CreditCard/Customer Onboarding.pdf');

                source.pipe(dest);
                source.on('end', function () { /* copied */ });
                source.on('error', function (err) { /* error */ });
            }
            
        }

    });


}




