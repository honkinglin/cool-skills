const effectInput = Array.from(document.querySelectorAll('.input-effect input'));

window.addEventListener('load', () => {
    effectInput.forEach(item => {
        item.onblur = function() {
            if (this.value !== '') {
                this.classList.add('has-content');
            } else {
                this.classList.remove('has-content');
            }
        }
    })
});
