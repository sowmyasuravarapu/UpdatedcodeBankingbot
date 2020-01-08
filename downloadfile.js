var fs = require("fs");

var file = fs.createReadStream('Customer Onboarding.pdf');
    var stat = fs.statSync('Customer Onboarding.pdf');
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
    file.pipe(res);