const fs = require('fs');
let html = fs.readFileSync('trustpay_mobile_dash.html', 'utf8');
const restoreCss = fs.readFileSync('restore.txt', 'utf8');

const targetStr = `      opacity: 0.028;
      pointer-events: none;
      z-index: 0;
    }

      gap: 8px;`;

const newStr = `      opacity: 0.028;
      pointer-events: none;
      z-index: 0;
    }

${restoreCss}

    .header-brand {
      display: flex;
      align-items: center;
      gap: 8px;`;

if (html.includes(targetStr)) {
    fs.writeFileSync('trustpay_mobile_dash.html', html.replace(targetStr, newStr));
    console.log('Restored CSS successfully!');
} else {
    console.log('Target string not found. Trying flexible match...');
    let pattern = /z-index:\s*0;\s*}\s*gap:\s*8px;/;
    if (html.match(pattern)) {
        html = html.replace(pattern, `z-index: 0; }\n\n${restoreCss}\n\n    .header-brand {\n      display: flex;\n      align-items: center;\n      gap: 8px;`);
        fs.writeFileSync('trustpay_mobile_dash.html', html);
        console.log('Restored with flexible match.');
    } else {
        console.log('Could not find injection point.');
    }
}
