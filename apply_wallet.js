const fs = require('fs');
const html = fs.readFileSync('trustpay_mobile_wallet.html', 'utf8');
const restore = fs.readFileSync('restore_wallet.txt', 'utf8');

const targetStr = `      </div>

    </div>
  </div>

  <!-- Bottom Navigation -->`;

const patternRegex = /<\/div>\s*<\/div>\s*<\/div>\s*(?:[\s\S]*?)var SIZE = 200, N = 25, M = SIZE \/ N;/;

if (html.match(patternRegex)) {
    const newHtml = html.replace(patternRegex, restore + '\n      var SIZE = 200, N = 25, M = SIZE / N;');
    fs.writeFileSync('trustpay_mobile_wallet.html', newHtml);
    console.log("Restored wallet logic.");
} else {
    console.log("Could not find matching wallet chunk");
}
