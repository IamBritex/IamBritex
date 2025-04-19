document.querySelectorAll('.card-buttons button').forEach(btn => {
    btn.addEventListener('click', function() {
    const icon = btn.querySelector('.material-symbols-outlined');
        if (icon) {
            icon.classList.remove('shake');
            void icon.offsetWidth;
            icon.classList.add('shake');
        }
    });
});