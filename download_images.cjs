const https = require('https');
const fs = require('fs');
const path = require('path');

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
};

const assets = [
  { url: 'https://s3-alpha-sig.figma.com/img/b585/c2a7/7f34e256b3110f60c93c2bdfdfa78fe6?Expires=1779667200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=c-F1vjJqYspvZUXz7~BxyrLrVlkYDuxuEfwuypO629NudbRz2n3QEa8RmnBA3p6kS0AVzcl8e62SfXXbxFS~y9OA8zMPjG~xWtGEs8eFMN18Nj-2Mq6NMTU8WiB3QraRBj3BUFn6q-PZfDseSD9ULlNkbgu82mKHBKylWppVxEf5XzXGr3GpTMkR96JA1YKgaWmwIifEl3-gkInmMl8M5HgJlMQ4Dxp3FKLIqhe7o3rK1HvmRgcYDirJKoh9uwd7NqNFtSLc48vBZYFiYb0HXdzErfiSBXFjRvnzw9Dg9TiFQIJcaWPWM4JdyO8CPJOFGaxCd31aWn4iSWXIVcC8~g__', name: 'logo.png' },
  { url: 'https://s3-alpha-sig.figma.com/img/9cc4/aa66/9b0d1badfac901e2a3453ffca37117df?Expires=1779667200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hJja~9GQjkX75EqAfu5sjskk-3J9lK6OrLymI2kUYSutcJwUUiuEfJMeGWvnaIpGikownAjiWrbbtAGuiFrzuBD39iiJwe84NEEgZq3CReOj~kKGUj-KWngR8g5etqbn9RKTHWfqiNlVJq~F8TMYvFijvlBcQjntatMSRgV17A2OG2Vmmw5UgK7UBi0rg6-Ywa8wpFPBushuZ0-uXFx2AWbIhuIlxayGnzDKrafwa9Sv33U1fm8t3rsPqgbnH2s1B0lJS4yc0jWj8QtfsL1B454dxz7S-DQMPL5ICRoODcLCAWasXgNJkvmio5lqkxqnBCcM~0rJH3Ohgc14H3fyTw__', name: 'hero-bg.png' },
  { url: 'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/d4f9ac56-ac31-444c-bf98-d8f7341b2d91', name: 'icon-price.svg' },
  { url: 'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/4dce8390-1bb1-4242-b7dc-63c982c8cad7', name: 'icon-bug.svg' },
  { url: 'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/5012c182-c9a6-4d0f-9016-e815665db098', name: 'icon-consult.svg' },
  { url: 'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/d8c88b65-2247-404c-8054-1e9a6c51db77', name: 'icon-hospital.svg' }
];

const dir = path.join(__dirname, 'public', 'assets');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

Promise.all(assets.map(asset => download(asset.url, path.join(dir, asset.name))))
  .then(() => console.log('All images downloaded successfully!'))
  .catch(console.error);
