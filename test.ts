// https://stackoverflow.com/questions/51445767/how-to-define-a-regex-matched-string-type-in-typescript/67511209#67511209

//const url = encodeURIComponent(p);

function getStoreFile(url: string) {
    const [ baseUrl, queryStr ] = url.split('?');
    const storePath = decodeURIComponent(baseUrl.split('/o/')[1]);
    console.log('storePath:', storePath);
    const query = queryStr.split('&').reduce((acc, cur) => {
        const [ key, value ] = cur.split('=');
        acc[key] = encodeURIComponent(value);
        return acc;
    }, {} as Record<string, string>);
    console.log('query:', query);
}

function main() {
    const url = 'https://firebasestorage.googleapis.com/v0/b/edelivery-24x7.appspot.com/o/test%2Fimages%2Fc%2F19d45b4eacd073cea749afea321035a2.jpg?alt=media&token=dd338c30-94b8-423f-be76-adac67f40629';
    getStoreFile(url);
}

main();

/*
https://firebasestorage.googleapis.com/v0/b/edelivery-24x7.appspot.com/o/test%2Fimages%2Fc%2F19d45b4eacd073cea749afea321035a2.jpg?alt=media&token=dd338c30-94b8-423f-be76-adac67f40629
https://firebasestorage.googleapis.com/v0/b/edelivery-24x7.appspot.com/o/test%2Fimages%2Fc%2F4282103dc9f1d8d94a92e47fe4e7929e.jpg?alt=media&token=fb015b66-cee2-4aff-81d5-43a784fc42b1
https://firebasestorage.googleapis.com/v0/b/edelivery-24x7.appspot.com/o/test%2Fimages%2Fc%2F4282103dc9f1d8d94a92e47fe4e7929e.jpg?alt=media&token=f13294d9-505c-4ae5-b835-44b2fe4712d5


*/
