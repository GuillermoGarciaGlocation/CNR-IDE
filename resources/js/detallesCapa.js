document.addEventListener('DOMContentLoaded', () => {
    const selectedItem = JSON.parse(localStorage.getItem('selectedItem'));
    if (selectedItem) {
        document.getElementById('imgCapa1').src = selectedItem.imagen;
        document.getElementById('capa1Categoria').textContent = selectedItem.categoria;
        document.getElementById('capa1Descripcion').textContent = selectedItem.description;
    }
});