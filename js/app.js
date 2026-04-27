const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const grid = document.getElementById('grid');
const message = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');
const dropPreview = document.querySelector('.drop-preview');
const dropText = document.querySelector('.drop-text');
const images = document.querySelectorAll('.img-box img:not(.overlay)');

dropZone.addEventListener('click', () => fileInput.click());

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('dragover');
  handleFile(e.dataTransfer.files[0]);
});

fileInput.addEventListener('change', () => {
  handleFile(fileInput.files[0]);
});

function handleFile(file) {
  if (!file) return;

  message.textContent = '';

  const name = file.name.toLowerCase();

  if (name.endsWith('.ai') || name.endsWith('.eps')) {
    showError('Please convert AI/EPS files to SVG or PNG.');
    return;
  }

  if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
    showError('Invalid image file.');
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    images.forEach(img => img.src = reader.result);
    dropPreview.src = reader.result;
    dropZone.classList.add('has-preview');
    grid.style.display = 'flex';
    resetBtn.style.display = 'block';
  };

  reader.readAsDataURL(file);
}

function showError(text) {
  grid.style.display = 'none';
  fileInput.value = '';
  dropPreview.src = '';
  dropZone.classList.remove('has-preview');
  resetBtn.style.display = 'none';
  message.textContent = text;
}

resetBtn.addEventListener('click', () => {
  grid.style.display = 'none';
  fileInput.value = '';
  dropPreview.src = '';
  dropZone.classList.remove('has-preview');
  resetBtn.style.display = 'none';
  message.textContent = '';
});
