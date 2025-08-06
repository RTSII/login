// Check if DOM is already loaded or wait for it
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initShareModal);
} else {
  initShareModal();
}

function initShareModal() {
  const shareButton = document.getElementById('shareButton');
  const shareModal = document.getElementById('shareModal');
  const closeModal = document.getElementById('closeModal');
  const copyLinkButton = document.getElementById('copyLinkButton');

  // Check if elements exist before adding event listeners
  if (!shareButton || !shareModal || !closeModal || !copyLinkButton) {
    console.log('Share modal elements not found, skipping initialization');
    return;
  }

  shareButton.addEventListener('click', function() {
    shareModal.style.display = 'block';
  });

  closeModal.addEventListener('click', function() {
    shareModal.style.display = 'none';
  });

  window.addEventListener('click', function(event) {
    if (event.target === shareModal) {
      shareModal.style.display = 'none';
    }
  });

  if (copyLinkButton) {
    copyLinkButton.addEventListener('click', function() {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    });
  }
}