function productToCard(id, urlImage, name, price) {
    let quantity = 1;
    return {
        getID() {
            return id;
        },
        getUrlImage() {
            return urlImage;
        },
        getName() {
            return name;
        },
        getQuantity() {
            return quantity;
        },
        getPrice() {
            return price;
        },
        getCost() {
            console.log(price * quantity)
            return price * quantity;
        },
        setUrl(newUrl) {
            url = newUrl;
        },
        setName(newName) {
            name = newName;
        },
        setQuantity(newQuantity) {
            quantity = newQuantity;
        },
        setPrice(newPrice) {
            price = newPrice;
        },
        toJSON() {
            const cost = this.getCost();
            return JSON.stringify({
                id,
                urlImage,
                name,
                quantity,
                price,
                cost
            });
        },
        fromJSON(json) {
            const data = JSON.parse(json);
            const product = productToCard(data.id, data.urlImage, data.name, data.price);
            product.setQuantity(data.quantity);
            return product;
        }
    };
}

var cardContr = cardController();

function cardController() {
    var tableMain;
    var tableBody;
    var tableBodyMobile;
    var totalCost;
    var updateCallback;
    var emptyLable;
    var resultLable;
    var deleteButtonMobile;
    var products = [];

    return {
        getCost: function () {
            var cost = 0;
            products.forEach((element) => {
                cost = cost + element.getCost();
            });
            return cost;
        },
        isEmpty: function () {
            return products.length === 0
        },
        setTableBody: function (table) {
            tableBody = table;
        },
        setTableMobile: function (table) {
            tableBodyMobile = table;
        },
        setTotalCost: function (cost) {
            totalCost = cost;
        },
        setTable: function (table1) {
            tableMain = table1;
        },
        setEmptyLable: function (lable) {
            emptyLable = lable;
        },
        setResult: function (lable) {
            resultLable = lable;
        },
        setDeleteButtonMobile: function (button) {
            deleteButtonMobile = button;
        },
        setUpdate: function (update) {
            updateCallback = update;
        },
        loadProducts_localstorage: function () {
            products = [];
            var localStorage = allStorage();
            var p = productToCard('','','',0)
            localStorage.forEach((element) => {
                p = p.fromJSON(element);
                console.log(p.getQuantity())
                products.push(p);
            });
        },
        loadProducts: function () {
            this.loadProducts_localstorage();
            products.forEach((element) => {
                console.log(element.getName())
                console.log(element.getQuantity())
                var item = renderItemProduct(element)
                tableBody.appendChild(item[0]);
                tableBodyMobile.appendChild(item[1]);
            });
            totalCost.innerText = formatPrice(this.getCost());
            if (products.length === 0) {
                tableMain.style.display = 'none';
                resultLable.style.display = 'none';
                emptyLable.style.display = '';
                deleteButtonMobile.style.display = 'none';
            }
            else {
                tableMain.style.display = '';
                resultLable.style.display = '';
                emptyLable.style.display = 'none';
                deleteButtonMobile.style.display = '';
            }
        },
        deleteProductsView: function () {
            while (tableBody.firstChild) {
                tableBody.removeChild(tableBody.firstChild);
            }
            while (tableBodyMobile.firstChild) {
                tableBodyMobile.removeChild(tableBodyMobile.firstChild);
            }
        },
        deleteProducts: function () {
            products.forEach((element) => {
                localStorage.removeItem(element.getID());
            });
            this.refreshProducts()
        },
        refreshProducts: function () {
            this.deleteProductsView();
            this.loadProducts();
            updateCallback();
        },
        updateTotalCost() {
            totalCost.innerText = formatPrice(this.getCost());

        }
    }
}

function deleteItem (product) {
    localStorage.removeItem(product.getID());
    cardContr.refreshProducts();
}

function renderItemProduct (product) {
    const tr = document.createElement('tr');

    // Создаем ячейку с изображением и названием продукта
    const th = document.createElement('th');
    th.setAttribute('scope', 'row');
    const a = document.createElement('a');
    a.setAttribute('href', "product.html?" + product.getID());
    a.classList.add('table-product');
    const img = document.createElement('img');
    img.setAttribute('src', product.getUrlImage());
    img.setAttribute('alt', '');
    img.classList.add('table-product-img');
    const p = document.createElement('p');
    p.classList.add('table-product-p', 'text-black');
    p.textContent = product.getName();
    a.appendChild(img);
    a.appendChild(p);
    th.appendChild(a);
    tr.appendChild(th);

    // Создаем ячейку с количеством продукта
    const tdQuantity = document.createElement('td');
    const lowerSpan = document.createElement('button');
    const quantityControl = document.createElement('div');
    const quantityTextNode = document.createElement('span');
    const upperSpan = document.createElement('button');
  
    tdQuantity.classList.add('table-product-quantity');
    lowerSpan.classList.add('card-quantity-action-d', 'card-quantity-lower', 'delete-item-btn');
    upperSpan.classList.add('card-quantity-action-d', 'card-quantity-upper', 'delete-item-btn');
  
    lowerSpan.textContent = '-';
    upperSpan.textContent = '+';
    quantityTextNode.textContent = product.getQuantity();
  
    quantityControl.appendChild(lowerSpan);
    quantityControl.appendChild(quantityTextNode);
    quantityControl.appendChild(upperSpan);
    tdQuantity.appendChild(quantityControl);
    tr.appendChild(tdQuantity);

    // Создаем ячейку с ценой продукта
    const tdPrice = document.createElement('td');
    tdPrice.classList.add('table-product-price');
    tdPrice.textContent = formatPrice(product.getPrice());
    tr.appendChild(tdPrice);

    // Создаем ячейку с общей стоимостью продукта
    const tdCost = document.createElement('td');
    tdCost.classList.add('table-product-cost');
    tdCost.textContent = formatPrice(product.getCost());
    tr.appendChild(tdCost);

    // Создаем ячейку с кнопкой удаления продукта
    const tdDelete = document.createElement('td');
    tdDelete.classList.add('table-delete-item');
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.classList.add('delete-item-btn');
    button.textContent = '×';
    button.onclick = function(){deleteItem(product)};
    tdDelete.appendChild(button);
    tr.appendChild(tdDelete);

    // Mobile

    const tableItemMobile = document.createElement('div');
    tableItemMobile.classList.add('table-item-mobile');

    const tableProductMobile = document.createElement('div');
    tableProductMobile.classList.add('table-product-mobile');
    tableItemMobile.appendChild(tableProductMobile);

    const tableProductLink = document.createElement('a');
    tableProductLink.href = "product.html?" + product.getID();
    tableProductMobile.appendChild(tableProductLink);

    const tableProductImg = document.createElement('img');
    tableProductImg.src = product.getUrlImage();
    tableProductImg.alt = '';
    tableProductImg.classList.add('table-product-img');
    tableProductLink.appendChild(tableProductImg);

    const tableProductP = document.createElement('p');
    tableProductP.textContent = product.getName();
    tableProductP.classList.add('table-product-p-mobile', 'text-black');
    tableProductLink.appendChild(tableProductP);

    const deleteItemBtn = document.createElement('button');
    deleteItemBtn.type = 'button';
    deleteItemBtn.classList.add('delete-item-btn', 'table-delete-item');
    deleteItemBtn.textContent = '×';
    deleteItemBtn.onclick = function(){deleteItem(product)};
    tableProductMobile.appendChild(deleteItemBtn);

    const tableProductData1 = document.createElement('div');
    tableProductData1.classList.add('table-product-data');
    tableItemMobile.appendChild(tableProductData1);

    const tableProductData1P = document.createElement('p');
    tableProductData1P.textContent = 'Количество';
    tableProductData1.appendChild(tableProductData1P);

    const lowerSpanMobile = document.createElement('button');
    const quantityTextNodeMobile = document.createElement('span');
    const upperSpanMobile = document.createElement('button');
  
    lowerSpanMobile.classList.add('card-quantity-action', 'card-quantity-lower', 'delete-item-btn');
    upperSpanMobile.classList.add('card-quantity-action', 'card-quantity-upper', 'delete-item-btn');
  
    lowerSpanMobile.textContent = '-';
    upperSpanMobile.textContent = '+';
    quantityTextNodeMobile.textContent = product.getQuantity();
 
    tableProductData1.appendChild(lowerSpanMobile);
    tableProductData1.appendChild(quantityTextNodeMobile);
    tableProductData1.appendChild(upperSpanMobile);

    const tableProductData2 = document.createElement('div');
    tableProductData2.classList.add('table-product-data');
    tableItemMobile.appendChild(tableProductData2);

    const tableProductData2P = document.createElement('p');
    tableProductData2P.textContent = 'Цена';
    tableProductData2.appendChild(tableProductData2P);

    const tableProductPrice = document.createElement('span');
    tableProductPrice.classList.add('table-product-price');
    tableProductPrice.textContent = formatPrice(product.getPrice());
    tableProductData2.appendChild(tableProductPrice);

    const tableProductData3 = document.createElement('div');
    tableProductData3.classList.add('table-product-data');
    tableItemMobile.appendChild(tableProductData3);

    const tableProductData3P = document.createElement('p');
    tableProductData3P.textContent = 'Стоимость';
    tableProductData3.appendChild(tableProductData3P);

    const tableProductCost = document.createElement('span');
    tableProductCost.classList.add('table-product-cost');
    tableProductCost.textContent = formatPrice(product.getCost());
    tableProductData3.appendChild(tableProductCost);

    upperSpanMobile.onclick = function(){quantityUpper(product, quantityTextNodeMobile, quantityTextNode, tableProductCost, tdCost)};
    lowerSpanMobile.onclick = function(){quantityLower(product, quantityTextNodeMobile, quantityTextNode, tableProductCost, tdCost)};
    upperSpan.onclick = function(){quantityUpper(product, quantityTextNode, quantityTextNodeMobile, tableProductCost, tdCost)};
    lowerSpan.onclick = function(){quantityLower(product, quantityTextNode, quantityTextNodeMobile, tableProductCost, tdCost)};

    return [tr, tableItemMobile];
}


function formatPrice(price) {
    const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return `${formattedPrice} руб`;
}

function quantityLower(product, lable, lable2, lableSum1, lableSum2) {
    if (product.getQuantity() - 1 > 0) {
        product.setQuantity(product.getQuantity()-1);
        lable.textContent = product.getQuantity();
        lable2.textContent = product.getQuantity();
        lableSum1.textContent = formatPrice(product.getCost());
        lableSum2.textContent = formatPrice(product.getCost());
        productUpdate(product);
    }
}

function quantityUpper(product, lable, lable2, lableSum1, lableSum2) {
    product.setQuantity(product.getQuantity()+1)
    lable.textContent = product.getQuantity();
    lable2.textContent = product.getQuantity();
    lableSum1.textContent = formatPrice(product.getCost());
    lableSum2.textContent = formatPrice(product.getCost());
    productUpdate(product)
}

function productUpdate(product) {
    localStorage.setItem(product.getID(), product.toJSON());
    cardContr.updateTotalCost();
}

function allStorage() {

    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        values.push( localStorage.getItem(keys[i]) );
    }

    return values;
}