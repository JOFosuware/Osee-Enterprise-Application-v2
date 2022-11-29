//Fetch user from local storage
const fetchData = (key) => {
    const data = localStorage.getItem(key)

    if(data !== null){
        return JSON.parse(data)
    }else{
        return []
    }
}

/**
 * Wait for an element before resolving a promise
 * @param {String} querySelector - Selector of element to wait for
 * @param {Integer} timeout - Milliseconds to wait before timing out, or 0 for no timeout              
 */
function elementOnload(querySelector, timeout=0){
    const startTime = new Date().getTime();
    return new Promise((resolve, reject)=>{
        const timer = setInterval(()=>{
            const now = new Date().getTime();
            if(document.querySelector(querySelector)){
                clearInterval(timer);
                resolve();
            }else if(timeout && now - startTime >= timeout){
                clearInterval(timer);
                reject();
            }
        }, 100);
    });
}

//Generating product list in table
function createProductList(products, querySelector){
    for(let i =0; i < products.length; i++) {
        const formNum = i + 1
        const itemsArray = [formNum, products[i].serial, products[i].description, products[i].price, products[i].quantity]
        const nodes = itemsArray.map((item) => {
        const td = document.createElement('td')
        td.textContent = item
        return td
        })

        const tr = document.createElement('tr')
        const tbody = document.querySelector(querySelector)
        tr.append(...nodes)
        tbody.appendChild(tr)
        //itemsArray = []
    }
}

//function to swap the content of new product section
const displayProductCreated = (product, querySelector) => {
    const newProduct = document.querySelector(querySelector)

    newProduct.innerHTML = `
        <div class="table-responsive" id="entryReview">
            <table class="table">
                <caption>Products Created</caption>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Serial no.</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                    </tr>
                </thead>
                <tbody id="productList">
                    
                </tbody>
            </table>
        </div>
        <button class="btn btn-outline-dark" id="swapContent">New Product</button>
        <button class="btn btn-outline-dark" id="updateBtn">Update Product</button>
        `
        elementOnload('#productList', 0).then(function(){
            createProductList(product, '#productList')
        })
}



//Grab individual value from the product entry form into an array
const productData = (nodeList) => {
    let data = []
    for (let index = 0; index < nodeList.length; index++) {
        data[index] = nodeList[index].value
    }

    return data
}

//Generating product update form with filled product data
const prodUpdateForm = (product, querySelector) => {
    const updateForm = document.querySelector(querySelector)

    updateForm.innerHTML =  `
    <form class="col-md-6" id="productUpdate">
    <em class="text-info" id="prodUpdateReport">Change the values to update the product</em>
        <div class="form-group">
            <label class="text-dark text-center display-5" for="itemDescription">Item Description</label>
            <textarea name="itemDescription" id="itemDesc" placeholder="Enter Item Description here" cols="10" rows="10" class="form-control"></textarea>
        </div>
        <div class="form-group">
            <label class="text-dark text-center" for="price">Price</label>
            <input type="number" name="price" value="${product.price}" placeholder="0.00" class="form-control">
        </div>
        <div class="form-group">
            <label class="text-dark text-center" for="quantity">Quantity</label>
            <input type="number" name="quantity" value="${product.quantity}" placeholder="Quantity" class="form-control">
        </div>
        <button type="submit" class="btn btn-outline-dark">Continue</button>
    </form>
    `
}

//Extract an input value from the element by index
const eachInputValue = (els, index) => {
    const values = productData(els)
    return values[index]
}

//Extract the values of items and display in table dimension
const itemsDisplay = (items) =>{
    elementOnload('#displayItems').then(() => {
        const displayItemsEl = document.querySelector('#displayItems')
        const itemsArr = []
        for(let index = 0; index < items.length; index++){
            const trEl = document.createElement('tr')
            const tdEl1 = document.createElement('td')
            const tdEl2 = document.createElement('td')
            const tdEl3 = document.createElement('td')
            const tdEl4 = document.createElement('td')

            tdEl1.textContent = items[index].serialNumber
            tdEl2.textContent = items[index].items
            tdEl3.textContent = items[index].quantity
            tdEl4.textContent = items[index].price

            trEl.append(tdEl1, tdEl2, tdEl3, tdEl4)

            itemsArr[index] = trEl
        }

        displayItemsEl.append(...itemsArr)
    }).catch(e => {
        console.log(e.message)
    })
}

const displayClientInfo = (client) => {
    const {clientId, cName, cSex, cNumber, cLocation, cLandmark, cResidence, wName, wSex, wNumber} = client
                newContractDiv.innerHTML = `
                <table class="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Customer ID</th>
                            <th>Customer Name</th>
                            <th>Customer's Gender</th>
                            <th>Customer Number</th>
                            <th>Residential Area</th>
                            <th>Location</th>
                            <th>Landmark</th>
                            <th>Witness Name</th>
                            <th>Witness' Gender</th>
                            <th>Witness Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Client 1</th>
                            <td>${clientId}</td>
                            <td>${cName}</td>
                            <td>${cSex}</td>
                            <td>${'0' + cNumber}</td>
                            <td>${cLocation}</td>
                            <td>${cLandmark}</td>
                            <td>${cResidence}</td>
                            <td>${wName}</td>
                            <td>${wSex}</td>
                            <td>${'0' + wNumber}</td>
                        </tr>
                    </tbody>
                </table>
                <button class="btn btn-outline-dark" id="updateContract">Update</button>
                <button class="btn btn-outline-dark btn-inline" id="continueBtn">Continue</button>
                `
}

//Product form
function productForm() {
    return `
    <h2 class="text-primary">New Product</h2>
    <!--Product entry form-->
    <form id="productForm">
        <div id="productFormErr">

        </div>
        <div class="row mx-4">
            <div class="col-md-4">
                <div class="form-group">
                    <p class="text-center">
                        <small>Form One</small>
                    </p>
                    <label class="text-dark text-center display-5" for="serialInput">Serial number</label>
                    <input type="number" name="serial[]" placeholder="Serial no." id="serialInput" class="form-control">
                </div>
                <div class="form-group">
                    <label class="text-dark text-center display-5" for="itemDescription">Item Description</label>
                    <textarea name="itemDescription[]" placeholder="Enter Item Description here" cols="10" rows="10" class="form-control"></textarea>
                </div>
                <div class="form-group">
                    <label class="text-dark text-center" for="price">Price</label>
                    <input type="number" name="price[]" placeholder="0.00" class="form-control">
                </div>
                <div class="form-group">
                    <label class="text-dark text-center" for="quantity">Quantity</label>
                    <input type="number" name="quantity[]" placeholder="Quantity" class="form-control">
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <p class="text-center">
                        <small>Form Two</small>
                    </p>
                    <label class="text-dark text-center display-5" for="serial">Serial number</label>
                    <input type="number" name="serial[]" placeholder="Serial no." class="form-control">
                </div>
                <div class="form-group">
                    <label class="text-dark text-center display-5" for="itemDescription">Item Description</label>
                    <textarea name="itemDescription[]" placeholder="Enter Item Description here" cols="10" rows="10" class="form-control"></textarea>
                </div>
                <div class="form-group">
                    <label class="text-dark text-center" for="price">Price</label>
                    <input type="number" name="price[]" placeholder="0.00" class="form-control">
                </div>
                <div class="form-group">
                    <label class="text-dark text-center" for="quantity">Quantity</label>
                    <input type="number" name="quantity[]" placeholder="Quantity" class="form-control">
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <p class="text-center">
                        <small>Form Three</small>
                    </p>
                    <label class="text-dark text-center display-5" for="serial">Serial number</label>
                    <input type="number" name="serial[]" placeholder="Serial no." class="form-control">
                </div>
                <div class="form-group">
                    <label class="text-dark text-center display-5" for="itemDescription">Item Description</label>
                    <textarea name="itemDescription[]" placeholder="Enter Item Description here" cols="10" rows="10" class="form-control"></textarea>
                </div>
                <div class="form-group">
                    <label class="text-dark text-center" for="price">Price</label>
                    <input type="number" name="price[]" placeholder="0.00" class="form-control">
                </div>
                <div class="form-group">
                    <label class="text-dark text-center" for="quantity">Quantity</label>
                    <input type="number" name="quantity[]" placeholder="Quantity" class="form-control">
                </div>
            </div>
            <button type="submit" class="btn btn-outline-dark ml-2">Continue</button>
        </div>
    </form>`
}

function searchProductForm() {
    return `
        <form class="form-inline ml-5" id="searchProduct">
            <div class="form-group">
                <input type="number" name="search" placeholder="Enter product serial number" class="form-control mr-md-6" aria-label="Search" required>
            </div>
            <button type="submit" class="btn btn-outline-dark ml-3">Search Product</button>
        </form>
        <div id="productInfo" class="mt-5 ml-5">

        </div>
    `
}