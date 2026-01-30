const { createCanvas, loadImage, registerFont } = require("canvas");
const fs = require("fs");
const path = require("path");

// ===== Font setup =====
const fontDir = path.join(__dirname, "fonts");
const canvasFontDir = path.join(__dirname, "canvasFonts");

registerFont(path.join(fontDir, "NotoSans-Bold.ttf"), { family: "NotoSans", weight: "bold" });
registerFont(path.join(fontDir, "NotoSans-SemiBold.ttf"), { family: "NotoSans", weight: "600" });
registerFont(path.join(fontDir, "NotoSans-Regular.ttf"), { family: "NotoSans", weight: "normal" });
registerFont(path.join(fontDir, "BeVietnamPro-Bold.ttf"), { family: "BeVietnamPro", weight: "bold" });
registerFont(path.join(fontDir, "BeVietnamPro-SemiBold.ttf"), { family: "BeVietnamPro", weight: "600" });
registerFont(path.join(fontDir, "BeVietnamPro-Regular.ttf"), { family: "BeVietnamPro", weight: "normal" });
registerFont(path.join(fontDir, "Kanit-SemiBoldItalic.ttf"), { family: "Kanit", weight: "600", style: "italic" });
registerFont(path.join(canvasFontDir, "Rounded.otf"), { family: "Rounded" });

// ===== Background link =====
const BACKGROUND_LINK = "https://files.catbox.moe/919i98.jpg";

// ===== Main function =====
async function createWelcomeCanvas(gcImg, joinedId, adderId, nickname, userNumber, threadName, authorName) {
  const width = 1200;
  const height = 600;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // ===== Background =====
  try {
    const bg = await loadImage(BACKGROUND_LINK);
    ctx.drawImage(bg, 0, 0, width, height);
    ctx.fillStyle = "rgba(0,0,0,0.45)";
    ctx.fillRect(0, 0, width, height);
  } catch {
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, width, height);
  }

  // ===== Diagonal lines =====
  ctx.strokeStyle = "rgba(255,255,255,0.05)";
  ctx.lineWidth = 2;
  for (let i = -height; i < width; i += 60) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + height, height);
    ctx.stroke();
  }

  // ===== Light gradient overlay =====
  const lightGradient = ctx.createLinearGradient(0, 0, width, height);
  lightGradient.addColorStop(0, "rgba(255,255,255,0.02)");
  lightGradient.addColorStop(0.5, "rgba(255,255,255,0.05)");
  lightGradient.addColorStop(1, "rgba(255,255,255,0.02)");
  ctx.fillStyle = lightGradient;
  ctx.fillRect(0, 0, width, height);

  // ===== Shapes (Squares) =====
  const squares = [
    { x: 50, y: 50, size: 80, rotation: 15 },
    { x: 1100, y: 80, size: 60, rotation: -20 },
    { x: 150, y: 500, size: 50, rotation: 30 },
    { x: 1050, y: 480, size: 70, rotation: -15 },
    { x: 900, y: 30, size: 40, rotation: 45 },
    { x: 200, y: 150, size: 35, rotation: -30 },
    { x: 400, y: 80, size: 45, rotation: 60 },
    { x: 700, y: 520, size: 55, rotation: -40 },
    { x: 950, y: 250, size: 38, rotation: 25 },
    { x: 300, y: 350, size: 42, rotation: -50 }
  ];

  squares.forEach(sq => {
    ctx.save();
    ctx.translate(sq.x + sq.size / 2, sq.y + sq.size / 2);
    ctx.rotate((sq.rotation * Math.PI) / 180);

    const g = ctx.createLinearGradient(-sq.size / 2, -sq.size / 2, sq.size / 2, sq.size / 2);
    g.addColorStop(0, "rgba(34,197,94,0.3)");
    g.addColorStop(1, "rgba(22,163,74,0.1)");

    ctx.fillStyle = g;
    ctx.fillRect(-sq.size / 2, -sq.size / 2, sq.size, sq.size);

    ctx.strokeStyle = "rgba(34,197,94,0.5)";
    ctx.lineWidth = 2;
    ctx.strokeRect(-sq.size / 2, -sq.size / 2, sq.size, sq.size);

    ctx.restore();
  });

  // ===== Circles =====
  const circles = [
    { x: 250, y: 250, radius: 30, alpha: 0.15 },
    { x: 850, y: 150, radius: 25, alpha: 0.12 },
    { x: 600, y: 50, radius: 20, alpha: 0.1 },
    { x: 100, y: 350, radius: 35, alpha: 0.18 },
    { x: 1000, y: 380, radius: 28, alpha: 0.14 },
    { x: 450, y: 480, radius: 22, alpha: 0.11 }
  ];

  circles.forEach(c => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
    const grad = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.radius);
    grad.addColorStop(0, `rgba(34,197,94,${c.alpha})`);
    grad.addColorStop(1, "rgba(22,163,74,0)");
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.strokeStyle = `rgba(34,197,94,${c.alpha * 2})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  });

  // ===== Triangles =====
  const triangles = [
    { x: 550, y: 150, size: 40, rotation: 0 },
    { x: 180, y: 420, size: 35, rotation: 180 },
    { x: 1080, y: 320, size: 38, rotation: 90 },
    { x: 380, y: 200, size: 32, rotation: -45 }
  ];

  triangles.forEach(tri => {
    ctx.save();
    ctx.translate(tri.x, tri.y);
    ctx.rotate((tri.rotation * Math.PI) / 180);

    ctx.beginPath();
    ctx.moveTo(0, -tri.size / 2);
    ctx.lineTo(-tri.size / 2, tri.size / 2);
    ctx.lineTo(tri.size / 2, tri.size / 2);
    ctx.closePath();

    const g = ctx.createLinearGradient(-tri.size / 2, 0, tri.size / 2, 0);
    g.addColorStop(0, "rgba(34,197,94,0.2)");
    g.addColorStop(1, "rgba(22,163,74,0.1)");
    ctx.fillStyle = g;
    ctx.fill();

    ctx.strokeStyle = "rgba(34,197,94,0.4)";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  });

  // ===== Facebook PFP URLs =====
  const joinedPfp = `https://graph.facebook.com/${joinedId}/picture?width=512&height=512`;
  const adderPfp = `https://graph.facebook.com/${adderId}/picture?width=512&height=512`;

  // ===== Draw avatars =====
  async function drawCircularImage(img, x, y, radius, borderColor) {
    try {
      const image = await loadImage(img);
      ctx.shadowColor = borderColor;
      ctx.shadowBlur = 15;

      ctx.beginPath();
      ctx.arc(x, y, radius + 5, 0, Math.PI * 2);
      ctx.fillStyle = borderColor;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(image, x - radius, y - radius, radius * 2, radius * 2);
      ctx.restore();
    } catch {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = "#1f1f1f";
      ctx.fill();
    }
  }

  await drawCircularImage(adderPfp, width - 120, 100, 55, "#22c55e");
  ctx.font = 'bold 20px "NotoSans"';
  ctx.fillStyle = "#22c55e";
  ctx.textAlign = "right";
  ctx.fillText("Added by " + authorName, width - 190, 105);

  await drawCircularImage(joinedPfp, 120, height - 100, 55, "#16a34a");
  ctx.font = 'bold 24px "NotoSans"';
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "left";
  ctx.fillText(nickname, 190, height - 95); // <--- nickname

  await drawCircularImage(gcImg, width / 2, 200, 90, "#22c55e", 6);

  // ===== Thread Name =====
  ctx.font = '600 42px "NotoSans"';
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.fillText(threadName, width / 2, 335);

  // ===== WELCOME =====
  ctx.font = 'italic 600 56px "Kanit"';
  const nameGradient = ctx.createLinearGradient(width / 2 - 200, 0, width / 2 + 200, 0);
  nameGradient.addColorStop(0, "#4ade80");
  nameGradient.addColorStop(1, "#22c55e");
  ctx.fillStyle = nameGradient;
  ctx.fillText("WELCOME", width / 2, 410);

  ctx.strokeStyle = "rgba(34,197,94,0.4)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 180, 430);
  ctx.lineTo(width / 2 + 180, 430);
  ctx.stroke();

  // ===== Member number =====
  ctx.font = '600 26px "NotoSans"';
  ctx.fillStyle = "#a0a0a0";
  ctx.fillText(`You are the ${userNumber}th member`, width / 2, 480);

  // ===== Version + Author =====
  ctx.font = '16px "NotoSans"';
  ctx.fillStyle = "#a0a0a0";
  ctx.textAlign = "right";
  ctx.fillText("v1.0 | " + authorName, width - 20, height - 10);

  // ===== Save image =====
  const outPath = path.join(__dirname, "welcome.png");
  const outStream = fs.createWriteStream(outPath);
  const stream = canvas.createPNGStream();
  stream.pipe(outStream);
  await new Promise(resolve => outStream.on("finish", resolve));

  return outPath;
}

module.exports = { createWelcomeCanvas };
