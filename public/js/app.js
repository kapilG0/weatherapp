const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.getElementById('message-1')
const messageTwo=document.getElementById('message-2')
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    messageOne.textContent=''
    messageTwo.textContent=''
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        
            if(data.error){
                // console.log(error)
                messageOne.textContent=data.error
            }else{
                // console.log(data.location)
            // console.log(data.forecast)
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast
            }
        })
    })

})