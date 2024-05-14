
export default function getAllOlympics() {
    var request = require('request');

    request('https://private-8b911c-olympicsapi.apiary-mock.com/scrape/olympics', function (error: any, response: { statusCode: any; headers: any; }, body: any) {
    console.log('Status:', response.statusCode);
    console.log('Headers:', JSON.stringify(response.headers));
    console.log('Response:', body);
    });
}