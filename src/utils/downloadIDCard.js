import { formatDate } from './formatDate';

const WIDTH = 1200;
const HEIGHT = 845;
const PALE = '#eff4ef';
const INK = '#17231b';
const MUTED = '#66756a';

const PALETTES = {
  forest: { green: '#2f7046', greenDark: '#17472d', highlight: '#a7c89b' },
  midnight: { green: '#36463a', greenDark: '#141d17', highlight: '#8ca88f' },
  classic: { green: '#66816b', greenDark: '#344b38', highlight: '#c7d5c4' },
};

function roundedRect(context, x, y, width, height, radius, fill, stroke, lineWidth = 1) {
  context.beginPath();
  context.roundRect(x, y, width, height, radius);
  context.fillStyle = fill;
  context.fill();
  if (stroke) {
    context.lineWidth = lineWidth;
    context.strokeStyle = stroke;
    context.stroke();
  }
}

function loadImage(source) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = source;
  });
}

function drawText(context, text, x, y, size, color = INK, weight = 500, align = 'left') {
  context.fillStyle = color;
  context.font = `${weight} ${size}px Arial, sans-serif`;
  context.textAlign = align;
  context.fillText(String(text || ''), x, y);
}

function drawLogo(context, logo, x, y, width, height) {
  if (logo) context.drawImage(logo, x, y, width, height);
  else drawText(context, 'VIGANN', x + width / 2, y + height / 2, 42, '#e5242b', 700, 'center');
}

function drawAvatar(context, x, y, width, height) {
  roundedRect(context, x, y, width, height, 14, '#dfe9de');
  context.fillStyle = '#cbdacb';
  context.beginPath();
  context.arc(x + width / 2, y + height * 0.47, width * 0.46, 0, Math.PI * 2);
  context.fill();

  context.fillStyle = '#426f50';
  context.beginPath();
  context.ellipse(x + width / 2, y + height * 0.98, width * 0.46, height * 0.33, 0, Math.PI, 0);
  context.lineTo(x + width * 0.96, y + height);
  context.lineTo(x + width * 0.04, y + height);
  context.closePath();
  context.fill();

  context.fillStyle = '#f2c2ae';
  context.fillRect(x + width * 0.43, y + height * 0.57, width * 0.14, height * 0.2);
  context.beginPath();
  context.ellipse(x + width / 2, y + height * 0.4, width * 0.22, height * 0.28, 0, 0, Math.PI * 2);
  context.fill();

  context.fillStyle = '#24372a';
  context.beginPath();
  context.ellipse(x + width / 2, y + height * 0.35, width * 0.24, height * 0.24, 0, Math.PI, Math.PI * 2);
  context.lineTo(x + width * 0.74, y + height * 0.42);
  context.lineTo(x + width * 0.26, y + height * 0.42);
  context.closePath();
  context.fill();

  context.fillStyle = '#f5f7fb';
  context.beginPath();
  context.moveTo(x + width * 0.37, y + height * 0.69);
  context.lineTo(x + width * 0.5, y + height * 0.83);
  context.lineTo(x + width * 0.63, y + height * 0.69);
  context.lineTo(x + width * 0.59, y + height);
  context.lineTo(x + width * 0.41, y + height);
  context.closePath();
  context.fill();
  context.fillStyle = '#a7c89b';
  context.beginPath();
  context.moveTo(x + width * 0.5, y + height * 0.81);
  context.lineTo(x + width * 0.58, y + height * 0.87);
  context.lineTo(x + width * 0.5, y + height);
  context.lineTo(x + width * 0.42, y + height * 0.87);
  context.closePath();
  context.fill();
}

function drawBarcode(context, value, x, y, width, height) {
  const source = value || 'STUDENT-ID';
  const bits = [...source].map((char) => char.charCodeAt(0).toString(2).padStart(7, '0')).join('0');
  const unit = width / bits.length;
  context.fillStyle = INK;
  bits.split('').forEach((bit, index) => {
    if (bit === '1') context.fillRect(x + index * unit, y, Math.max(1, unit * 0.72), height);
  });
}

function drawField(context, label, value, x, y, width, palette) {
  drawText(context, label.toUpperCase(), x, y, 18, palette.greenDark, 700);
  drawText(context, value || 'N/A', x + width, y, 24, INK, 500, 'right');
  context.beginPath();
  context.moveTo(x, y + 18);
  context.lineTo(x + width, y + 18);
  context.strokeStyle = '#cbd8cd';
  context.lineWidth = 2;
  context.stroke();
}

function drawFront(context, data, logo, photo, palette, x) {
  roundedRect(context, x, 0, WIDTH, HEIGHT, 30, '#fff', '#274834', 8);
  context.fillStyle = palette.green;
  context.fillRect(x + 8, 8, WIDTH - 16, 9);
  context.fillStyle = palette.highlight;
  context.fillRect(x + WIDTH - 230, 8, 222, 9);
  drawLogo(context, logo, x + 335, 30, 530, 130);
  context.fillStyle = palette.greenDark;
  context.fillRect(x + 8, 188, WIDTH - 16, 76);
  drawText(context, 'S T U D E N T   I D E N T I T Y   C A R D', x + WIDTH / 2, 238, 26, '#fff', 700, 'center');

  const photoX = x + 42;
  const photoY = 294;
  const photoW = 232;
  const photoH = 332;
  roundedRect(context, photoX, photoY, photoW, photoH, 12, '#f1f5f1', '#abc1ae', 4);
  if (photo) {
    const scale = Math.max(photoW / photo.width, photoH / photo.height);
    const drawWidth = photo.width * scale;
    const drawHeight = photo.height * scale;
    context.save();
    context.beginPath();
    context.roundRect(photoX + 4, photoY + 4, photoW - 8, photoH - 8, 8);
    context.clip();
    context.drawImage(photo, photoX + (photoW - drawWidth) / 2, photoY + (photoH - drawHeight) / 2, drawWidth, drawHeight);
    context.restore();
  } else {
    drawAvatar(context, photoX + 5, photoY + 5, photoW - 10, photoH - 10);
  }

  const detailsX = x + 310;
  const detailsWidth = 580;
  drawText(context, 'STUDENT NAME', detailsX, 332, 17, palette.greenDark, 700);
  drawText(context, data.name || 'Your name', detailsX, 372, 32, INK, 700);
  drawField(context, 'Roll / ID', data.rollNumber, detailsX, 410, detailsWidth, palette);
  drawField(context, 'Department', data.department, detailsX, 456, detailsWidth, palette);
  drawField(context, 'Section', data.section, detailsX, 502, detailsWidth, palette);
  drawField(context, 'Batch', data.batch, detailsX, 548, detailsWidth, palette);
  drawField(context, 'Blood group', data.bloodGroup, detailsX, 594, detailsWidth, palette);

  roundedRect(context, x + 922, 486, 228, 102, 18, '#eff4ef', '#c8d8ca', 2);
  drawText(context, 'RESIDENCE', x + 1036, 526, 18, MUTED, 700, 'center');
  drawText(context, data.residency || 'Not selected', x + 1036, 563, 23, palette.greenDark, 700, 'center');

  context.fillStyle = PALE;
  context.fillRect(x + 8, 668, WIDTH - 16, 169);
  drawText(context, 'Save card to generate barcode', x + 40, 716, 20, MUTED, 500);
  drawText(context, 'VERIFICATION BARCODE', x + 40, 754, 17, MUTED, 600);
  drawBarcode(context, data.rollNumber, x + 40, 772, 385, 45);
  drawText(context, data.rollNumber || 'STUDENT ID', x + 470, 813, 23, INK, 700, 'center');
  drawText(context, 'CONTACT', x + WIDTH - 46, 708, 18, MUTED, 600, 'right');
  drawText(context, data.phone || 'N/A', x + WIDTH - 46, 747, 26, INK, 700, 'right');
  drawText(context, `Issued by ${data.collegeName || 'your college'}`, x + WIDTH - 46, 790, 19, MUTED, 500, 'right');
}

function drawBack(context, data, logo, palette, x) {
  roundedRect(context, x, 0, WIDTH, HEIGHT, 30, '#fff', '#274834', 8);
  drawLogo(context, logo, x + 55, 35, 315, 94);
  drawText(context, 'STUDENT DETAILS', x + WIDTH - 55, 72, 20, palette.greenDark, 700, 'right');
  drawText(context, data.rollNumber || 'STUDENT ID', x + WIDTH - 55, 110, 25, INK, 600, 'right');
  context.beginPath();
  context.moveTo(x + 40, 150);
  context.lineTo(x + WIDTH - 40, 150);
  context.strokeStyle = '#cbd8cd';
  context.lineWidth = 2;
  context.stroke();

  drawField(context, 'Email', data.email, x + 55, 205, WIDTH - 110, palette);
  drawField(context, 'Phone', data.phone, x + 55, 258, WIDTH - 110, palette);
  drawField(context, 'Program', data.degree, x + 55, 311, WIDTH - 110, palette);
  drawField(context, 'Academic year', data.year, x + 55, 364, WIDTH - 110, palette);
  drawField(context, 'Date of birth', formatDate(data.dob), x + 55, 417, WIDTH - 110, palette);
  drawField(context, 'Address', data.address, x + 55, 470, WIDTH - 110, palette);
  drawText(context, 'IF FOUND, PLEASE RETURN TO', x + 55, 565, 18, MUTED, 700);
  drawText(context, data.collegeName || 'Your college', x + 55, 600, 28, INK, 700);
  drawText(context, 'Registrar', x + 80, 700, 24, palette.greenDark, 500);
  context.beginPath();
  context.moveTo(x + 50, 734);
  context.lineTo(x + 250, 734);
  context.strokeStyle = '#91a1b7';
  context.stroke();
  drawText(context, 'REGISTRAR', x + 150, 760, 16, MUTED, 700, 'center');
  drawBarcode(context, data.rollNumber, x + 825, 690, 285, 42);
  drawText(context, data.rollNumber || 'STUDENT ID', x + 1100, 754, 23, INK, 700, 'right');
  drawText(context, 'PREVIEW ONLY - NOT AN ISSUED CREDENTIAL', x + 55, 793, 16, MUTED, 500);
}

export async function downloadIDCard(data, theme, view) {
  const sides = view === 'both' ? ['front', 'back'] : [view];
  const gap = sides.length === 2 ? 24 : 0;
  const canvas = document.createElement('canvas');
  canvas.width = (WIDTH * sides.length) + gap;
  canvas.height = HEIGHT;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Canvas is unavailable.');

  const [logo, photo] = await Promise.all([
    loadImage('/vigann.svg'),
    data.photo ? loadImage(data.photo) : Promise.resolve(null),
  ]);
  const palette = PALETTES[theme] || PALETTES.forest;
  context.fillStyle = '#e7eee7';
  context.fillRect(0, 0, canvas.width, canvas.height);

  sides.forEach((side, index) => {
    const x = index * (WIDTH + gap);
    if (side === 'back') drawBack(context, data, logo, palette, x);
    else drawFront(context, data, logo, photo, palette, x);
  });

  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob((result) => (result ? resolve(result) : reject(new Error('PNG export failed.'))), 'image/png');
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const safeName = (data.name || 'student').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  link.href = url;
  link.download = `${safeName || 'student'}-id-card.png`;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
