const elements = {
  photoGrid: document.getElementById("photoGrid"),
  uploadModal: document.getElementById("uploadModal"),
  addPhotoButton: document.getElementById("addPhotoBtn"),
  closeButton: document.querySelector(".close"),
  uploadForm: document.getElementById("uploadForm"),
  toast: document.getElementById("toast"),
  nameInput: document.getElementById("name"),
  fileInput: document.getElementById("file"),
};

const config = {
  apiUrl: "http://localhost:4000/pictures",
};

function showNotification(message, type = "success") {
  const { toast } = elements;

  toast.textContent = message;
  toast.className = `toast ${type}`;
  toast.style.opacity = "1";

  setTimeout(() => {
    toast.style.opacity = "0";
  }, 3000);
}

async function fetchPhotos() {
  try {
    const response = await fetch(config.apiUrl);

    if (!response.ok) {
      throw new Error(`Erro na requisição: status ${response.status}`);
    }

    const data = await response.json();
    return data.pictures || [];
  } catch (error) {
    console.error("Falha ao carregar fotos", error);
    showNotification("Falha ao carregar fotos", "error");
    return [];
  }
}

/* Incluir a Foto (Array de objetos) */

function createPhotoCardElement(photo) {
  const card = document.createElement("div");
  card.className = "photo-card";

  const imageUrl = `${config.apiUrl}/${photo._id}/image`;

  card.innerHTML = ``; // Incluir Preenchimento do Card

  return card;
}

async function uploadNewPhoto(formData) {
  try {
    const response = await fetch(config.apiUrl, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Falha no upload da foto");
    }

    showNotification("Foto enviada com sucesso!");
    closeUploadModal();
    elements.uploadForm.reset();
    loadAndDisplayPhotos();
  } catch (error) {
    console.error("Erro no upload:", error);
    showNotification("Falha ao enviar foto", "error");
  }
}

function openUploadModal() {
  elements.uploadModal.style.display = "block";
}

function closeUploadModal() {
  elements.uploadModal.style.display = "none";
}

function handleOutsideClick(event) {
  if (event.target === elements.uploadModal) {
    closeUploadModal();
  }
}

function handleFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData();
  formData.append("name", elements.nameInput.value);
  formData.append("file", elements.fileInput.files[0]);

  uploadNewPhoto(formData);
}

async function loadAndDisplayPhotos() {
  const photos = await fetchPhotos();
  renderPhotoGrid(photos);
}

function setupEventListeners() {
  elements.addPhotoButton.addEventListener("click", openUploadModal);
  elements.closeButton.addEventListener("click", closeUploadModal);
  window.addEventListener("click", handleFormSubmit);
  elements.uploadForm.addEventListener("submit", handleOutsideClick);
}

document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  loadAndDisplayPhotos();
});
