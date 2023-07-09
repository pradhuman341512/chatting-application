const kashishSelectorBtn = document.querySelector('#kashish-selector')
const pradhumanSelectorBtn = document.querySelector('#pradhuman-selector')
const chatHeader = document.querySelector('.chat-header')
const chatMessages = document.querySelector('.chat-messages')
const chatInputForm = document.querySelector('.chat-input-form')
const chatInput = document.querySelector('.chat-input')
const clearChatBtn = document.querySelector('.clear-chat-button')

const messages = JSON.parse(localStorage.getItem('messages')) || []

const createChatMessageElement = (message) => `
 <div class = "message ${message.sender === 'Kashish' ? 'blue-bg' : 'gray-bg'}" >
    <div class = "message-sender"> ${message.sender} </div>
     <div class = "message-text" > ${message.text} </div> 
    <div class = "message-timestamp" > ${message.timestamp} </div> 
    </div >
    `


window.onload = () => {
    messages.forEach((message) => {
        chatMessages.innerHTML += createChatMessageElement(message)
    });
}


let messageSender = 'Kashish'
const updateMessageSender = (name) => {
    messageSender = name
    chatHeader.innerText = `${messageSender} chatting...`
    chatInput.placeholder = `Type here, ${messageSender}...`


    if (name === 'Kashish') {
        kashishSelectorBtn.classList.add('active-person')
        pradhumanSelectorBtn.classList.remove('active-person')

    }
    if (name === 'Pradhuman') {
        pradhumanSelectorBtn.classList.add('active-person')
        kashishSelectorBtn.classList.remove('active-person')

    }

    chatInput.focus()
}

kashishSelectorBtn.onclick = () => updateMessageSender('Kashish')
pradhumanSelectorBtn.onclick = () => updateMessageSender('Pradhuman')

const sendMessage = (e) => {
    e.preventDefault()

    const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    const message = {
        sender: messageSender,
        text: chatInput.value,
        timestamp
    }
    messages.push(message)
    localStorage.setItem('messages', JSON.stringify(messages))

    chatMessages.innerHTML += createChatMessageElement(message)

    chatInputForm.reset()
    chatMessages.scrollTop = chatMessages.scrollHeight
}

chatInputForm.addEventListener('submit', sendMessage);


chatInputForm.addEventListener('submit', sendMessage)



clearChatBtn.addEventListener('click', () => {
    localStorage.removeItem('messages')
    chatMessages.innerHTML = ""
})