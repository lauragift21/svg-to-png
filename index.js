export default function convertSvgToPng() {
  const fileInput = document.getElementById('svg-file');
  const file = fileInput.files[0];

  if (!file || !file.type.startsWith('image/svg')) {
    alert('Please select an SVG file.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    const svg = event.target.result;

    const canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 500;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    canvg(canvas, svg, {
      renderCallback: function () {
        const dataUrl = canvas.toDataURL('image/png');
        const img = document.createElement('img');
        img.src = dataUrl;

        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = '';
        resultDiv.appendChild(img);

        // create download link
        const downloadLink = document.createElement('a');
        downloadLink.href = dataUrl;
        downloadLink.download = 'image.png';
        downloadLink.innerHTML = 'Download PNG';

        resultDiv.appendChild(document.createElement('br'));
        resultDiv.appendChild(downloadLink);
      },
    });
  };
  reader.readAsText(file);
}
