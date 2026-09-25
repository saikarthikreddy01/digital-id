import * as THREE from 'three';

export function createHexTexture({
  hexSize = 23,
  bg = '#010202',
} = {}) {
  const columns = 24;
  const rows = 24;
  const stepX = Math.sqrt(3) * hexSize;
  const stepY = 1.5 * hexSize;
  const canvas = document.createElement('canvas');
  canvas.width = Math.ceil(columns * stepX);
  canvas.height = Math.ceil(rows * stepY);

  const context = canvas.getContext('2d');
  context.fillStyle = bg;
  context.fillRect(0, 0, canvas.width, canvas.height);

  for (let row = -1; row <= rows; row += 1) {
    for (let column = -1; column <= columns; column += 1) {
      const x = column * stepX + (row % 2 === 0 ? 0 : stepX / 2);
      const y = row * stepY;
      context.beginPath();
      for (let vertex = 0; vertex < 6; vertex += 1) {
        const angle = ((vertex * 60) - 90) * (Math.PI / 180);
        const px = x + Math.cos(angle) * (hexSize - 1.2);
        const py = y + Math.sin(angle) * (hexSize - 1.2);
        if (vertex === 0) context.moveTo(px, py);
        else context.lineTo(px, py);
      }
      context.closePath();
      const tone = (row * 17 + column * 31) % 5;
      context.strokeStyle = `rgba(238, 244, 239, ${tone === 0 ? 0.82 : 0.52})`;
      context.lineWidth = 1.05;
      context.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(18, 5);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}
