//const { response } = require("express")

const loginEl = document.querySelector('#login')
const formEl = document.querySelector('#login-form')
const userReport = document.querySelector('#userReport')
const signupForm = document.querySelector('#signupForm')

//Style user report 
userReport.setAttribute('class', 'text-danger')

//listen and handle login in button
loginEl.addEventListener('click', (e) => {
    e.preventDefault()
    loginEl.setAttribute('class', 'btn btn-dark btn-lg btn-center d-none')
    formEl.setAttribute('class', 'col-md-4 form-center')
    alert('hello world')
})

//const user = fetchUser()

formEl.addEventListener('submit',(e) => {
    e.preventDefault()
    const username = e.target.elements.user.value
    const password = e.target.elements.pass.value 

    userReport.textContent = ''

    if(username === '' || password === ''){
        userReport.textContent = 'Form must be filled completely'
    }else if(password.length < 8){
        userReport.textContent = 'Your password must be a least 8 characters'
    }else{
        fetch('/users/login', {
            method: 'post',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        }).then((response) => response.json()).then((data) => {
            if(data.message === 'User found'){
                fetch(`/users/dashboard/${data.id}`,{
                    method: 'get',
                    headers: {
                        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
                    }
                })
            }
        }).catch((e) => {
            userReport.textContent = e
        })
       
    
    }    
})