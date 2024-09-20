function init() {
    fetch('https://us-east1-cnr-glocation-demo.cloudfunctions.net/function-1')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en el servidor');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            const galleryContainer = document.getElementById('galleryContainer');
            galleryContainer.innerHTML = ''; 

            // Maneja el primer elemento como la "capa1"
            if (data.length > 0) {
                const item = data[0]; // Puedes cambiar esto según tu lógica
                const categoria = item.categoria; 
                document.getElementById('capa1Categoria').textContent = categoria;
                const imagen = item.img; 
                document.getElementById('imgCapa1').src = imagen;
                const nombre = item.name; 
                document.getElementById('capa1Nombre').textContent = nombre;
                const description = item.description; 
                document.getElementById('capa1Descripcion').textContent = description;

                // Añade el evento al botón
                const btnVerCapa = document.querySelector('#btnCapa1');
                const myModal = new bootstrap.Modal(document.getElementById('myModal'));
                btnVerCapa.addEventListener('click', () => {
                    localStorage.setItem('selectedItem', JSON.stringify(item));
                    window.location.href = 'detalles/detallesCapa.html';
                });
            
                const openModalButton = document.getElementById('openModal');
                openModalButton.addEventListener('click', function() {
                    myModal.show();
                });
            }

            // Crea las tarjetas para los demás elementos
            data.forEach(item => {
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
                                    <button id="openModal">
                                        <img src="./resources/img/pdfIcon.PNG" width="95%" height="55" alt="PDF Icon">
                                    </button>  
                                </div>
                                <button class="btn btn-sm btn-secondary" data-id="${item.id}">Ver más</button>
                            </div>
                        </div>
                    </div>
                `;
                galleryContainer.appendChild(card);

                // Añade el evento al botón
                const btnVerCapa = card.querySelector('.btn-secondary');
                btnVerCapa.addEventListener('click', () => {
                    localStorage.setItem('selectedItem', JSON.stringify(item));
                    window.location.href = 'detalles/detallesCapa.html';
                });
            });
        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud Fetch:', error);
        });

        document.addEventListener('DOMContentLoaded', function() {
            const openModalButton = document.getElementById('openModal');
            alert(openModalButton)
            // const myModal = new bootstrap.Modal(document.getElementById('myModal'));
        
            // openModalButton.addEventListener('click', function() {
            //   myModal.show();
            // });
        });
        
}
// function modal() {
//     const openModalButton = document.getElementById('openModal');
//     const myModal = document.getElementById('myModal');
//     const closeModalButton = document.querySelector('.close');

//     // Abrir modal al hacer clic en el botón
//     openModalButton.onclick = function() {
//         modal.style.display = "block";
//     }
// }

// // Agregar el evento de clic al botón

// modal()
// Llama a la función al cargar la página
document.addEventListener('DOMContentLoaded', init);