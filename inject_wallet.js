const fs = require('fs');

const htmlFile = 'trustpay_mobile_wallet.html';
let html = fs.readFileSync(htmlFile, 'utf8');

const missingUI = `            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="card actions-card">
        <div class="actions-title">Quick Actions</div>
        <div class="actions-grid">
          <div class="action-btn" onclick="showToast('Send Money')">
            <div class="action-icon">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            </div>
            <div class="action-label">Send</div>
          </div>
          <div class="action-btn" onclick="showToast('Add Money')">
            <div class="action-icon">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
            </div>
            <div class="action-label">Add</div>
          </div>
          <div class="action-btn" onclick="showToast('Bank Transfer')">
            <div class="action-icon">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 10h3v7H4zM10.5 10h3v7h-3zM2 19h20v3H2zM17 10h3v7h-3zM12 1L2 6v2h20V6L12 1z" /></svg>
            </div>
            <div class="action-label">Bank</div>
          </div>
          <div class="action-btn" onclick="showToast('Self Transfer')">
            <div class="action-icon">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" /></svg>
            </div>
            <div class="action-label">Self</div>
          </div>
        </div>
      </div>

      <!-- QR -->
      <div class="card qr-card">
        <div class="qr-header">
          <span class="qr-title">Payment QR</span>
          <span class="qr-status"><span class="qr-dot"></span>Active</span>
        </div>
        <div class="qr-frame">
          <span class="qr-corner tl"></span><span class="qr-corner tr"></span>
          <span class="qr-corner bl"></span><span class="qr-corner br"></span>
          <canvas id="qrCanvas" width="200" height="200"></canvas>
        </div>
        <div class="qr-upi-label">Your UPI ID</div>
        <div class="qr-upi-row">
          <span class="qr-upi-id">dev@trustpay</span>
          <button class="btn-copy" id="copyBtn" onclick="copyUPI()" type="button">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
            </svg>
            Copy
          </button>
        </div>
        <div class="qr-actions">
          <button class="qr-action-btn" onclick="showToast('QR shared!')" type="button">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92z" />
            </svg>
            Share
          </button>
          <button class="qr-action-btn" onclick="showToast('QR downloaded!')" type="button">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
            </svg>
            Download
          </button>
        </div>
        <p class="qr-note">Scan with any UPI app to pay instantly. Works with PhonePe, GPay, Paytm &amp; more.</p>
      </div>

      <!-- Transactions -->
      <div class="card tx-card">
        <div class="tx-header">
          <span class="tx-title">Transaction History</span>
          <a class="tx-link" onclick="showToast('Loading...')">View All</a>
        </div>
        <div class="tx-tabs">
          <button class="tx-tab active" onclick="filterTx(this,'all')" type="button">All</button>
          <button class="tx-tab" onclick="filterTx(this,'sent')" type="button">Sent</button>
          <button class="tx-tab" onclick="filterTx(this,'received')" type="button">Received</button>
        </div>
        <div class="tx-list" id="txList"></div>
        <button class="tx-view-all" onclick="showToast('Loading all transactions...')" type="button">View All Transactions</button>
      </div>
    </div>
  </div>`;

// Replace the broken closing tags snippet with the full UI.
const brokenRegex = /<div class="bal-stat-val neg">-&#8377;6,538\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/;

if (html.match(brokenRegex)) {
    html = html.replace(brokenRegex, '<div class="bal-stat-val neg">-&#8377;6,538</div>' + missingUI);
    fs.writeFileSync(htmlFile, html);
    console.log('Restored Quick Actions, QR, and Tx History successfully.');
} else {
    // alternative match if spacing varies
    console.log('Regex 1 failed. Trying more generic regex...');
    const altRegex = /-&#8377;6,538[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
    if (html.match(altRegex)) {
        html = html.replace(altRegex, '-&#8377;6,538</div>' + missingUI);
        fs.writeFileSync(htmlFile, html);
        console.log('Restored via alternative regex.');
    } else {
        console.log('Both regex failed. Could not locate injection point.');
    }
}
