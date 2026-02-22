const fs = require('fs');
const files = [
  'trustpay_mobile_dash.html',
  'trustpay_mobile_wallet.html',
  'trustpay_mobile_payments.html',
  'trustpay_mobile_subscription.html',
  'trustpay_mobile_rewards.html',
  'aboutus.html'
];

const newLogoCss = `.logo-icon {
      width: 24px;
      height: 28px;
      background: #F97316;
      clip-path: polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%);
      display: inline-block;
      vertical-align: middle;
    }`;

for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');

    // Remove old logo styles
    content = content.replace(/\.logo-icon\s*{[\s\S]*?}/, newLogoCss);
    content = content.replace(/\.logo-icon::after\s*{[\s\S]*?}/, '');

    // Ensure aboutus.html and rewards.html have the right bottom-nav
    if (file === 'trustpay_mobile_rewards.html' || file === 'aboutus.html') {
      content = content.replace(/grid-template-columns:\s*repeat\(4,\s*1fr\);/g, 'grid-template-columns: repeat(5, 1fr);');
      if (!content.includes('"aboutus.html">About</a>')) {
        content = content.replace(/<\/nav>/, '  <a class="bn-item" href="aboutus.html">About</a>\n  </nav>');
      }
    }
    
    // Fix toast in wallet page
    if (file === 'trustpay_mobile_wallet.html') {
      content = content.replace(/transform: translateX\(-50%\) translateY\(80px\);/, 'transform: translateX(-50%) translateY(80px); opacity: 0; visibility: hidden;');
      content = content.replace(/#toast\.show\s*{[\s\S]*?}/, '#toast.show {\n      transform: translateX(-50%) translateY(0);\n      opacity: 1;\n      visibility: visible;\n    }');
    }

    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
}
