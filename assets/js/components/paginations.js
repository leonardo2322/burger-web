import { numberToCurrency } from "../helpers/numberCurrency.js";
import { db } from "./products.js";


export const pagination = () => {
  const product = db.methods.getAll();
  
  const tipoDatos = ['burgers', 'bebidas', 'porciones'];
  let options = JSON.parse(localStorage.getItem('options'));
  const itemsPerPage = 5;
  let currentPage = 1;
  const productLength = renderItems(product, currentPage, options.p)[0][options.p].length
  

  function showPage(pageNumber, product) {
    currentPage = pageNumber;
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const tipoDatos = ['burgers', 'bebidas', 'porciones'];
    
    const dataContainer = document.getElementById("product-container");
    dataContainer.innerHTML = "";
    let html = "";

    tipoDatos.forEach((tipo) => {
        if (product[0].hasOwnProperty(tipo)) {
            const datos = product[0][tipo].slice(startIndex, endIndex);
          

            datos.forEach((item) => {
                html += `
                    <div class="grid">
                        <div class="card" id="card" data-id="${item.id}">
                            <div class="card-img">
                                <img src="${item.imagen}" alt="${item.titulo}">
                            </div>
                            <div class="card-description" data-id="${item.id}">
                                <h4 class="card-title">${item.titulo}</h4>
                                <span class="card-price">${numberToCurrency(item.precio)}</span>
                                <span class="card-details">${item.detalles}</span>
                            </div>
                            <div class="buttons-i">
                                <div class="addCart" id="addCart">
                                    <i class="fa-solid fa-cart-plus addCarts" data-id="${item.id}"></i>
                                </div>
                                <div class="addCart" id="addCart">
                                    <i class="eyes fa-solid fa-eye" data-id="${item.id}"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
        }
  });

  dataContainer.innerHTML = html;
  updatePaginationButtons();
}

  function renderItems(prod, current, elmnt) {
    const filteredItems = prod.filter((item) => {
        // Filtrar por la propiedad `elmnt` según `options.p`
        
         
        return item.hasOwnProperty(elmnt) && Object.keys(item).includes(options.p) ;
       


    });
    
    return filteredItems;
}

function generatePaginationButtons(data) {
  const paginationContainer = document.getElementById("number-page");
  paginationContainer.innerHTML = "";

  tipoDatos.forEach((tipo) => {
      if (data[0].hasOwnProperty(tipo)) {
          const tipoData = data[0][tipo];
          for (let i = 1; i <= Math.ceil(tipoData.length / itemsPerPage); i++) {
              const button = document.createElement("button");
              button.classList.add("counter-page");
              button.textContent = i;
              button.addEventListener("click", () => showPage(i, data));
              paginationContainer.appendChild(button);
          }
      }
  });
}
  function updatePaginationButtons() {
    const buttons = document.querySelectorAll("#number-page .counter-page");
    buttons.forEach((button, index) => {
      if (index + 1 === currentPage) {
        button.classList.add("current");
      } else {
        button.classList.remove("current");
      }
    });
  }

  function goToNextPage() {
    const totalPages = Math.ceil(productLength / itemsPerPage);
    if (currentPage < totalPages) {
      showPage(currentPage + 1, renderItems(product, currentPage, options.p));
    }
  }

  function goToPrevPage() {
    if (currentPage > 1) {
      showPage(currentPage - 1, renderItems(product, currentPage, options.p));
    }
  }

   function initializePagination() {
    
    generatePaginationButtons(renderItems(product, currentPage, options.p));
    showPage(currentPage, renderItems(product, currentPage, options.p));
    // showPage(currentPage, product);

    document.getElementById("prev").addEventListener("click", goToPrevPage);
    document.getElementById("next").addEventListener("click", goToNextPage);
  }

  initializePagination();
};
