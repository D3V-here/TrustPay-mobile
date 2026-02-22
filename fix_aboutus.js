const fs = require('fs');

let html = fs.readFileSync('aboutus.html', 'utf8');

// Remove dark theme class injection mechanism
html = html.replace(/<body[^>]*>/, '<body>');
html = html.replace(/document\.body\.classList\.toggle\('dark'\)/g, "console.log('Theme toggle disabled')");
html = html.replace(/document\.body\.classList\.add\('dark'\)/g, "");

// Write back
fs.writeFileSync('aboutus.html', html);
console.log('Fixed aboutus dark mode script');
