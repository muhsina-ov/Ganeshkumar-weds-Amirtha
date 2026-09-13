import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";

async function generateOgImage() {
  const photo1Path = path.resolve("src/assets/couple-ganeshkumar-amirtha.jpg");
  const photo2Path = path.resolve("src/assets/couple-rishikesan-karthika.jpg");

  const photo1Base64 = `data:image/jpeg;base64,${fs.readFileSync(photo1Path).toString("base64")}`;
  const photo2Base64 = `data:image/jpeg;base64,${fs.readFileSync(photo2Path).toString("base64")}`;

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Josefin+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1200px;
      height: 630px;
      background: #faf6f0;
      font-family: 'Cormorant Garamond', Georgia, serif;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      position: relative;
    }

    /* Ambient radiances */
    .bg-glow-1 {
      position: absolute;
      width: 650px;
      height: 650px;
      border-radius: 50%;
      top: -140px;
      left: -100px;
      background: radial-gradient(circle, rgba(230, 150, 25, 0.18) 0%, transparent 68%);
    }
    .bg-glow-2 {
      position: absolute;
      width: 650px;
      height: 650px;
      border-radius: 50%;
      bottom: -150px;
      right: -100px;
      background: radial-gradient(circle, rgba(175, 35, 55, 0.14) 0%, transparent 68%);
    }
    .bg-glow-3 {
      position: absolute;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: radial-gradient(circle, rgba(245, 235, 210, 0.6) 0%, transparent 75%);
    }

    /* Luxury border frames */
    .card-border {
      position: absolute;
      inset: 18px;
      border: 1px solid rgba(212, 175, 55, 0.65);
      pointer-events: none;
    }
    .card-inner-border {
      position: absolute;
      inset: 24px;
      border: 0.5px solid rgba(212, 175, 55, 0.35);
      pointer-events: none;
    }
    .corner-floret {
      position: absolute;
      width: 24px;
      height: 24px;
      border: 1px solid rgba(212, 175, 55, 0.8);
      transform: rotate(45deg);
      background: #faf6f0;
    }
    .c-tl { top: 12px; left: 12px; }
    .c-tr { top: 12px; right: 12px; }
    .c-bl { bottom: 12px; left: 12px; }
    .c-br { bottom: 12px; right: 12px; }

    .main-container {
      width: 100%;
      height: 100%;
      padding: 30px 44px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 32px;
      z-index: 10;
    }

    /* Photos Section (Left Side) */
    .photos-stage {
      width: 510px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 18px;
    }

    .portrait-card {
      width: 238px;
      height: 490px;
      border-radius: 119px 119px 24px 24px;
      padding: 5px;
      position: relative;
      box-shadow: 0 16px 36px -10px rgba(70, 20, 25, 0.22);
    }

    .portrait-card.c1 {
      background: linear-gradient(145deg, #e6b745, #d27926, #9e2838);
    }
    .portrait-card.c2 {
      background: linear-gradient(145deg, #e6b745, #9e2838, #187a74);
    }

    .portrait-inner {
      width: 100%;
      height: 100%;
      border-radius: 114px 114px 20px 20px;
      overflow: hidden;
      position: relative;
      background: #fff;
    }

    .portrait-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
      display: block;
    }

    .portrait-overlay-badge {
      position: absolute;
      bottom: 14px;
      left: 50%;
      transform: translateX(-50%);
      white-space: nowrap;
      background: rgba(250, 246, 240, 0.94);
      border: 1px solid rgba(212, 175, 55, 0.6);
      border-radius: 20px;
      padding: 4px 14px;
      font-family: 'Josefin Sans', sans-serif;
      font-size: 10px;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: #5c1e24;
      font-weight: 600;
      box-shadow: 0 4px 10px rgba(0,0,0,0.08);
    }

    /* Content Section (Right Side) */
    .content-stage {
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 10px 0;
    }

    .header-sub {
      font-family: 'Josefin Sans', sans-serif;
      text-transform: uppercase;
      font-size: 11.5px;
      letter-spacing: 0.42em;
      color: #9d3840;
      font-weight: 600;
      margin-bottom: 6px;
    }

    .header-title {
      font-size: 26px;
      letter-spacing: 0.1em;
      color: #1a100d;
      text-transform: uppercase;
      font-weight: 400;
      margin-bottom: 8px;
    }

    .gold-divider {
      width: 80px;
      height: 1.5px;
      background: linear-gradient(to right, #d4af37, #9d3840, #187a74);
      margin-bottom: 16px;
    }

    /* Couple Blocks */
    .couple-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }

    .couple-title-script {
      font-family: 'Alex Brush', cursive;
      font-size: 44px;
      line-height: 1.05;
      color: #58141c;
      white-space: nowrap;
    }

    .ampersand {
      font-family: 'Cormorant Garamond', serif;
      font-style: italic;
      font-size: 26px;
      color: #b57a16;
      margin: 0 8px;
    }

    .qualification-pill {
      font-family: 'Josefin Sans', sans-serif;
      text-transform: uppercase;
      font-size: 9px;
      letter-spacing: 0.22em;
      color: #a86c12;
      font-weight: 600;
      margin-top: 2px;
    }

    .family-line {
      font-family: 'Josefin Sans', sans-serif;
      text-transform: uppercase;
      font-size: 8.5px;
      letter-spacing: 0.18em;
      color: #634f43;
      margin-top: 3px;
    }

    .clan-tag {
      font-family: 'Josefin Sans', sans-serif;
      text-transform: uppercase;
      font-size: 8.5px;
      letter-spacing: 0.25em;
      color: #9d3840;
      font-weight: 600;
      margin-top: 2px;
    }

    .between-couples {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 8px 0;
    }
    .between-couples .b-line {
      width: 36px;
      height: 1px;
      background: rgba(212, 175, 55, 0.45);
    }
    .between-couples .b-text {
      font-family: 'Josefin Sans', sans-serif;
      text-transform: uppercase;
      font-size: 9.5px;
      letter-spacing: 0.3em;
      color: #b57a16;
    }

    /* Event pill footer */
    .ceremony-badge {
      margin-top: 14px;
      padding: 5px 22px;
      border-radius: 30px;
      background: rgba(212, 175, 55, 0.14);
      border: 1px solid rgba(212, 175, 55, 0.5);
      font-family: 'Josefin Sans', sans-serif;
      text-transform: uppercase;
      font-size: 10.5px;
      letter-spacing: 0.3em;
      color: #58141c;
      font-weight: 600;
    }

    .date-time-venue {
      margin-top: 8px;
      font-size: 19px;
      letter-spacing: 0.05em;
      color: #2b1f1a;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .dot {
      color: #d4af37;
      font-size: 16px;
    }
  </style>
</head>
<body>
  <div class="bg-glow-1"></div>
  <div class="bg-glow-2"></div>
  <div class="bg-glow-3"></div>
  <div class="card-border"></div>
  <div class="card-inner-border"></div>
  <div class="corner-floret c-tl"></div>
  <div class="corner-floret c-tr"></div>
  <div class="corner-floret c-bl"></div>
  <div class="corner-floret c-br"></div>

  <div class="main-container">
    <!-- Left: Dual Portrait Arches of the Real Couples -->
    <div class="photos-stage">
      <!-- Couple 1 Portrait -->
      <div class="portrait-card c1">
        <div class="portrait-inner">
          <img class="portrait-img" src="${photo1Base64}" alt="Ganeshkumar & Amirtha Varsini">
          <div class="portrait-overlay-badge">Ganeshkumar &amp; Amirtha</div>
        </div>
      </div>

      <!-- Couple 2 Portrait -->
      <div class="portrait-card c2">
        <div class="portrait-inner">
          <img class="portrait-img" src="${photo2Base64}" alt="Rishikesan & Karthika Devi">
          <div class="portrait-overlay-badge">Rishikesan &amp; Karthika</div>
        </div>
      </div>
    </div>

    <!-- Right: Invitation & Ceremony Details -->
    <div class="content-stage">
      <div class="header-sub">Save the Date</div>
      <div class="header-title">Engagement Ceremony</div>
      <div class="gold-divider"></div>

      <!-- Couple 1 Details -->
      <div class="couple-item">
        <div class="couple-title-script">
          Ganeshkumar <span class="ampersand">&amp;</span> Amirtha Varsini
        </div>
        <div class="qualification-pill">
          B.Sc., M.B.A. &nbsp;•&nbsp; B.P.T. (Pursuing)
        </div>
        <div class="family-line">
          S/o Sivakumar &amp; Neelavathi &nbsp;•&nbsp; D/o Rameshbabu &amp; Shanthe
        </div>
        <div class="clan-tag">
          Chinnakonda &nbsp;•&nbsp; Selukka
        </div>
      </div>

      <!-- Separator -->
      <div class="between-couples">
        <div class="b-line"></div>
        <div class="b-text">along with</div>
        <div class="b-line"></div>
      </div>

      <!-- Couple 2 Details -->
      <div class="couple-item">
        <div class="couple-title-script">
          Rishikesan <span class="ampersand">&amp;</span> Karthika Devi
        </div>
        <div class="qualification-pill">
          D.C.S.E., B.E. &nbsp;•&nbsp; B.Com.
        </div>
        <div class="family-line">
          S/o Rameshbabu &amp; Shanthe &nbsp;•&nbsp; D/o Sivakumar &amp; Neelavathi
        </div>
        <div class="clan-tag">
          Selukka &nbsp;•&nbsp; Chinnakonda
        </div>
      </div>

      <!-- Ceremony Timing & Venue -->
      <div class="ceremony-badge">Thursday, 17th September 2026</div>
      <div class="date-time-venue">
        <span>6:00 PM to 7:00 PM</span>
        <span class="dot">•</span>
        <span>Madurai</span>
      </div>
    </div>
  </div>
</body>
</html>
`;

  console.log("Launching headless browser to render creative couples OG image...");
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
  await page.setContent(htmlContent, { waitUntil: "networkidle0" });

  const publicDir = path.resolve("public");
  await page.screenshot({ path: path.join(publicDir, "og-image.png"), type: "png" });
  await page.screenshot({ path: path.join(publicDir, "og-image.jpg"), type: "jpeg", quality: 95 });

  console.log("Successfully generated bespoke couples og-image.png and og-image.jpg!");
  await browser.close();
}

generateOgImage().catch(console.error);
