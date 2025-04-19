let topZ = 2000; // z-index inicial para modales

const modalFiles = {
  About: "./html/about.html",
  Links: "./html/links.html",
  Work: "./html/work.html",
  Faq: "./html/faq.html",
  Contact: "./html/contact.html"
};

document.querySelectorAll('.card-buttons button').forEach(btn => {
  btn.addEventListener('click', function() {
    const label = btn.querySelector('span:last-child').textContent.trim();
    if (modalFiles[label]) {
      fetch(modalFiles[label])
        .then(res => res.text())
        .then(html => createModal(html));
    }
  });
});

function createModal(contentHtml) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.style.display = 'flex';
  modal.style.zIndex = ++topZ;

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  // Centrar la ventana modal en el viewport
  modalContent.style.position = 'fixed';
  modalContent.style.left = '50%';
  modalContent.style.top = '50%';
  modalContent.style.transform = 'translate(-50%, -50%)';
  modalContent.style.margin = '';
  modalContent.style.zIndex = topZ;

  // Header draggable
  const modalHeader = document.createElement('div');
  modalHeader.id = 'modalHeader';
  modalHeader.style.cursor = 'move';
  modalHeader.style.userSelect = 'none';

  // Botón cerrar
  const closeModal = document.createElement('span');
  closeModal.className = 'close-modal';
  closeModal.innerHTML = '[&times;]';
  closeModal.setAttribute('aria-label', 'Cerrar');
  closeModal.onclick = () => document.body.removeChild(modal);

  modalHeader.appendChild(closeModal);

  // Extraer título del contenido
  const temp = document.createElement('div');
  temp.innerHTML = contentHtml;
  const title = temp.querySelector('h2')?.textContent || "Modal";
  const bodyContent = temp.innerHTML.replace(/<h2>.*?<\/h2>/, '');

  // Agregar título al header
  const modalTitle = document.createElement('div');
  modalTitle.className = 'modal-title';
  modalTitle.textContent = title;
  modalTitle.style.flex = '1';
  modalTitle.style.paddingLeft = '1rem';
  modalHeader.insertBefore(modalTitle, closeModal);

  // Cuerpo
  const modalBody = document.createElement('div');
  modalBody.className = 'modal-body';
  modalBody.innerHTML = bodyContent;

  // Ensamblar
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  // Traer al frente al hacer click
  modalContent.addEventListener('mousedown', function() {
    modal.style.zIndex = ++topZ;
    modalContent.style.zIndex = topZ;
  });

  // Drag & drop solo para este modal
  let isDragging = false, offsetX = 0, offsetY = 0;
  modalContent.onmousedown = function(e) {
    if (e.target.classList.contains('close-modal')) return;
    isDragging = true;
    modal.style.zIndex = ++topZ;
    modalContent.style.zIndex = topZ;

    // Quita el centrado por transform y calcula la posición real
    const rect = modalContent.getBoundingClientRect();
    const left = rect.left;
    const top = rect.top;
    modalContent.style.transform = '';
    modalContent.style.left = left + 'px';
    modalContent.style.top = top + 'px';

    offsetX = e.clientX - left;
    offsetY = e.clientY - top;
    document.body.style.userSelect = "none";
  };
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

  function onMouseMove(e) {
    if (isDragging) {
      modalContent.style.position = 'fixed';
      modalContent.style.left = (e.clientX - offsetX) + 'px';
      modalContent.style.top = (e.clientY - offsetY) + 'px';
      modalContent.style.margin = '0';
    }
  }
  function onMouseUp() {
    isDragging = false;
    document.body.style.userSelect = "";
  }

  // Limpia los listeners al cerrar
  closeModal.addEventListener('click', () => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  });
}