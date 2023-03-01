const form = document.querySelector('form')
const inputValue = document.querySelector('#newTask')
let checkBox = document.querySelectorAll('.checkbox')

form.addEventListener('submit',async (e)=>{
    e.preventDefault()
    await axios.post(`/add?taskName=${inputValue.value}`)
    inputValue.value = ""
    location.reload()
})

const startFunc = () =>{
    let allDiv = document.querySelectorAll('.added--task')
    allDiv.forEach(div =>{
        if(div.classList.contains('true')){
            div.children[0].checked = true
            div.children[1].style.textDecoration = "line-through"
        }else{
            div.children[0].checked = false
            div.children[1].style.textDecoration = "none"
        }   
    })
}
startFunc()

checkBox.forEach(element =>{
    element.addEventListener('click', async(e) =>{
        try {
            if(element.parentNode.classList.contains('false')){
                element.parentNode.classList.remove('false')
                element.parentNode.classList.add('true')
            }else{
                element.parentNode.classList.remove('true')
                element.parentNode.classList.add('false')
            }
            startFunc()
            await axios.put(`/update?_id=${element.className.slice(0, -9)}`)
        } catch (error) {
            
        }
        
    })
})