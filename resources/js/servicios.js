function init() {
    fetch('https://us-east1-cnr-glocation-demo.cloudfunctions.net/function-1')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en el servidor');
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
            const galleryContainer = document.getElementById('galleryContainer');
            galleryContainer.innerHTML = ''; 
            data.forEach(item => {
                const categoria = data[0].categoria; 
                document.getElementById('capa1Categoria').textContent = categoria;
                const imagen = data[0].img; 
                document.getElementById('imgCapa1').src = imagen;
                const description = data[0].description; 
                document.getElementById('capa1Descripcion').textContent = description;
                
                const card = document.createElement('div');
                card.className = 'col';
                card.innerHTML = `
                    <div class="card shadow-sm">
                        <img class="bd-placeholder-img card-img-top rounded" width="100%" height="300" src="${item.img}" alt="${item.name}">
                        <div class="card-body">
                            <p class="card-text fw-bold" style="color: orange;">${item.categoria}</p>
                            <p class="card-text fw-bold">${item.name}</p>
                            <p class="card-text">${item.description}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <a href="#">
                                        <img src="./resources/img/metadatosIcon.PNG" width="60" height="55" alt="Metadatos Icon">
                                    </a>    
                                    <a href="#">
                                        <img src="./resources/img/pdfIcon.PNG" width="95%" height="55" alt="PDF Icon">
                                    </a>  
                                </div>
                                <button id="btnVerCapa" class="btn btn-sm btn-secondary">Ver más</button>
                            </div>
                        </div>
                    </div>
                `;
                galleryContainer.appendChild(card); // Añade la tarjeta al contenedor
            });
        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud Fetch:', error);
        });
}

// Llama a la función al cargar la página
document.addEventListener('DOMContentLoaded', init);