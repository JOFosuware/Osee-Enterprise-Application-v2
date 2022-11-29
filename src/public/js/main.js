//Dashboard setup 
/*window.addEventListener('load', (e) => {
    if(fetchData('UserToken').length !== 0){
        fetch(`/users/me?authorization=${fetchData('UserToken')}`).then((response) => response.json()).then((username) => {
            const userelId = document.querySelector('#userelId')
            const userImage = document.querySelector('#userImage')
            //Set Username
            userelId.textContent = username.username.toUpperCase()
            //Set user profile image
            userImage.setAttribute('src', `http://localhost:3000/user/${username.elId}/profile`)
        })
    }
})*/


//Grub the log out buttons and handle the event for logging out
//const oneDevice = document.querySelector('#oneDevice')
//const allDevices = document.querySelector('#allDevices')

function logout(elId) {
    if(elId) {
        const oneDeviceEl = document.getElementById(elId)
        oneDeviceEl.addEventListener('click', () => {
            if(fetchData('UserToken').length !== 0){
                axios.get(`/admin/me/logout`,{
                    params: {
                        authorization: fetchData('UserToken')
                    }
                })
                .then(res => {
                        if(res.data.success) {
                            location.assign(`/`)
                            localStorage.removeItem('UserToken')
                        }
                    })
                    .catch(e => console.log(e.message))
            }
        })
    }
}

logout('logOut')

//Product stocking
//Add product to store
/*elementOnload('#productForm').then(() => {
    const formEl = document.getElementById('productForm')
    console.log(formEl)
        formEl.addEventListener('submit', (e) => {
            e.preventDefault()
    
            const serial = extractValues('serial[]')
            const description = extractValues('itemDescription[]')
            const price = extractValues('price[]')
            const quantity = extractValues('quantity[]')
            const forms = []
            const errorEl = document.getElementById('productFormErr')
            
            if(serial.length === description.length 
                && price.length === quantity.length
                && serial.length === price.length) {
                    for(let i = 0; i < serial.length; i++){
                        forms[i] = {
                            serial: serial[i],
                            description: description[i],
                            price: price[i],
                            quantity: quantity[i]
                        }
                    }
            }
            
            if(forms.length === 0) {
                errorEl.setAttribute('class', 'text-danger')
                errorEl.textContent ='At least only one form must be filled completely or all forms must be completely filled'
                return 0
            }
    
            if(fetchData('UserToken')){
                axios.post('/product/create', forms, {
                    headers: {
                        Authorization: 'Bearer ' + fetchData('UserToken')
                    }
                })
                .then(res => {
                    //Display the created product
                    displayProductCreated(res.data, '#newProduct')
                })
                .catch(e => {
                    errorEl.setAttribute('class', 'text-danger')
                    errorEl.textContent = e.message
                })
            }
        })
}).catch(e => console.log(e))*/

function processProductFormData(formEl = undefined, mutations = undefined) {
    formEl = document.getElementById(formEl) || mutations[0].addedNodes[5]
    formEl.addEventListener('submit', (e) => {
        e.preventDefault()

        const serial = extractValues('serial[]')
        const description = extractValues('itemDescription[]')
        const price = extractValues('price[]')
        const quantity = extractValues('quantity[]')
        const forms = []
        const errorEl = document.getElementById('productFormErr')
        
        if(serial.length === description.length 
            && price.length === quantity.length
            && serial.length === price.length) {
                for(let i = 0; i < serial.length; i++){
                    forms[i] = {
                        serial: serial[i],
                        description: description[i],
                        price: price[i],
                        quantity: quantity[i]
                    }
                }
        }
        
        if(forms.length === 0) {
            errorEl.setAttribute('class', 'text-danger')
            errorEl.textContent ='At least only one form must be filled completely or all forms must be completely filled'
            return 0
        }

        if(fetchData('UserToken')){
            axios.post('/admin/me/product/create', forms, {
                headers: {
                    Authorization: 'Bearer ' + fetchData('UserToken')
                }
            })
            .then(res => {
                //Display the created product
                displayProductCreated(res.data, '#newProduct')
            })
            .catch(e => {
                errorEl.setAttribute('class', 'text-danger')
                errorEl.textContent = e.message
            })
        }
    })
}

processProductFormData('productForm')

//Listen and handle form element change for product re-entry
function productFormChange() {
    const newProductEl = document.getElementById('newProduct')
    const observer = new MutationObserver((mutations) => {
        processProductFormData(undefined, mutations)
    })

    observer.observe(newProductEl, {childList: true})
}

productFormChange()

//Extract and filter array of input data values
function extractValues(inputName) {
    const values = []
    document.getElementsByName(inputName)
                    .forEach((el) => el.value === '' ? '' : values.push(el.value))

    return values
}

function handleNewProductBtn(buttonEl, sectionId, callback){
    sectionId = document.getElementById(sectionId)
    const observer = new MutationObserver((mutations) => {
        buttonEl = mutations[0].addedNodes[3]
        buttonEl.addEventListener('click', () => {
            sectionId.innerHTML = callback()
        })
        //observer.disconnect()
    })

    observer.observe(sectionId, {childList: true})
}

handleNewProductBtn('swapContent', 'newProduct', productForm)

//Updating product
//Searching a product
let serial = undefined
function searchProduct(elId) {
    if(elId && fetchData('UserToken')) {
        const searchEl = document.getElementById(elId)
        searchEl.addEventListener('submit', (e) => {
            e.preventDefault()

            serial = e.target.elements.search.value
            axios.get('/admin/me/product/fetch', {
                params: {
                    serial
                },
                headers: {
                    Authorization: 'Bearer ' + fetchData('UserToken')
                }
            })
            .then(res => {
                //Display product form with filled product data
                prodUpdateForm(res.data, '#productInfo')

                //Filling the item description input of update form
                //Filling the item description input of update form
                elementOnload('#itemDesc').then(() => {
                    const itemDesc = document.querySelector('#itemDesc')
                    itemDesc.textContent = res.data.description
                })
            })
            .catch(({response}) => {
                const productInfo = document.querySelector('#productInfo')
                productInfo.setAttribute('class', 'text-danger ml-5')
                productInfo.textContent = response.data.error
            })
        })
    }
}

searchProduct('searchProduct')

function watchSearchProduct(sectionId) {
    sectionId = document.getElementById(sectionId)
    const observer = new MutationObserver((mutations) => {
        console.log(mutations)
    })

    observer.observe(sectionId, {childList: true})
}

//Grab product update form and process for product update
elementOnload('#productUpdate').then(() => {
    const updateForm = document.querySelector('#productUpdate')
    const updateReport = document.querySelector('#prodUpdateReport')

    updateForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const description = e.target.elements.itemDescription.value
        const price = e.target.elements.price.value
        const quantity = e.target.elements.quantity.value

        if(description === '' || price === '' || quantity === ''){
            updateReport.setAttribute('class', 'text-warning')
            updateReport.textContent = 'Form must be filled completely'
        }else{
            const update = [{
                description,
                price,
                quantity 
            }]
            
            if(fetchData('UserToken')){
                axios.patch('/admin/me/product/update', update, {
                    params: {
                        serial
                    },
                    headers: {
                        Authorization: 'Bearer ' + fetchData('UserToken')
                    }
                })
                .then((res) => {
                    displayProductCreated([res.data], '#updateProduct')
                })
                .catch(({response}) => {
                    console.log(response.data.error)
                })
            }
        }
    })
})

handleNewProductBtn('swapContent', 'updateProduct', searchProductForm)

watchSearchProduct('updateProduct')