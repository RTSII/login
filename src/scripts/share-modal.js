// Check if DOM is already loaded or wait for it
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initShareModal);
} else {
  initShareModal();
}

function initShareModal() {
  // Check if elements exist before trying to access them
  const shareButton = document.getElementById('shareButton');
  const shareModal = document.getElementById('shareModal');
  const closeModal = document.getElementById('closeModal');
  const copyLinkButton = document.getElementById('copyLinkButton');

  // Only proceed if all required elements exist
  if (!shareButton || !shareModal || !closeModal) {
    console.log('Share modal elements not found, skipping initialization');
    return;
  }

  // Add event listeners only if elements exist
  shareButton.addEventListener('click', function() {
    shareModal.style.display = 'block';
  });

  closeModal.addEventListener('click', function() {
    shareModal.style.display = 'none';
  });

  // Close modal when clicking outside
  window.addEventListener('click', function(event) {
    if (event.target === shareModal) {
      shareModal.style.display = 'none';
    }
  });

  // Copy link functionality (optional element)
  if (copyLinkButton) {
    copyLinkButton.addEventListener('click', function() {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href).then(function() {
          alert('Link copied to clipboard!');
        }).catch(function(err) {
          console.error('Failed to copy link: ', err);
        });
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = window.location.href;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          alert('Link copied to clipboard!');
        } catch (err) {
          console.error('Failed to copy link: ', err);
        }
        document.body.removeChild(textArea);
      }
    });
  }
}