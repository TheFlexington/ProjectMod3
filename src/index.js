document.addEventListener("DOMContentLoaded", function(){
let cardShowView = false;
let characterUrl = 'http://localhost:3000/characters'
let addCharacter = false
const addBtn = document.querySelector('#new-character-btn')
const characterForm = document.querySelector('.container')
const cardViewContainer = document.querySelector(".show-card-container")

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  toggleFormView()
})

function toggleFormView() {
  addCharacter = !addCharacter
  console.log(addCharacter)
  if (addCharacter) {
    characterForm.style.display = 'block'
  } else {
    characterForm.style.display = 'none'
  }
}

function togglecardShowView() {
  console.log("this runs too")
  cardShowView = !cardShowView
  if(cardShowView) {
    cardViewContainer.classList.add("visible")
  } else {
    cardViewContainer.classList.remove("visible")
  }
}

let form = document.getElementsByClassName('add-character-form')[0]
form.addEventListener('submit', (e)=> {
  submitData(form.name.value, form.image.value)
  // console.log(`${form.name.value} ${form.image.value}`)
  form.reset()
  // let index = document.getElementById('character-collection')
  // index.innerHTML = ''
  // getCharacters()
  e.preventDefault()
})

function submitData(name, image){
  fetch(characterUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json"
    },
    body: JSON.stringify(
    {
      name: name,
      image: image,
      likes: '0'
    })
}).then(resp => resp.json())
  .then(json => renderACharacter(json))
}

// function getCharacters() {
//   fetch(characterUrl)
//   .then(resp => resp.json())
//   .then(data => {renderCharacters(data)})
// }

function getCharacters(url) {
  fetch(url)
  .then(resp => resp.json())
  .then(char => renderCharacters(char))
}

function renderACharacter(char){
  div.innerHTML += `
  <div class="card" data-url=${characterUrl} data-id=${char.id}>
  <h2>${char.name}</h2>
  <img src=${char.image} class="character-avatar" />
  <p> ${char.likes} </p>
  <p style="display:inline-block; vertical-align: middle;">
  <button class="like-btn" data-action="like">Like</button>
  <button class="delete-btn" data-action="delete">Delete</button>
  </p>
  </div>`
} // added p tag to buttons for the inline block

div = document.getElementById('character-collection')

function renderCharacters(characters) {
  characters.forEach(function(char) {
    renderACharacter(char)
		// div.innerHTML += `
    // <div class="card" data-url=${characterUrl} data-id=${char.id}>
    // <h2>${char.name}</h2>
    // <img src=${char.image} class="character-avatar" />
    // <p> ${char.likes} </p>
    // <button class="like-btn" data-action="like">Like</button>
    // <button class="delete-btn" data-action="delete">Delete</button>
    // </div>`
  })}

  function deleteData(item, url){
    return fetch(`${url}/${item}`, {
    method: 'DELETE'
  })
  .then(resp => resp.json());
  };
  
  
  function incrementLikes(item, url, likeCount){
    // debugger
    fetch(`${url}/${item}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        likes: likeCount.innerText
      })
    })
    .then(response => response.json())
  }
  
  document.addEventListener('click', event => {
    if (event.target.dataset.action === 'like') {
      let parent = event.target.parentNode.parentNode
      let parentUrl = parent.dataset.url
      let parentId = parent.dataset.id
      let likeCount = event.target.parentNode.previousSibling.previousSibling // added parentNode to line
      likeCount.innerText++
      incrementLikes(parentId, parentUrl, likeCount)
    } else if (event.target.dataset.action === 'delete') {
      let parent = event.target.parentNode.parentNode
      let parentUrl = parent.dataset.url
      let parentId = parent.dataset.id
      deleteData(parentId, parentUrl)
      parent.remove()
    }
  })

  let showDiv = document.getElementsByClassName('show-cards')[0]

  function renderShowCharacter(char){
    showDiv.innerHTML += `
    <div class="s-card show-card" data-url=${characterUrl} data-id=${char.id}>
    <h2>${char.name}</h2>
    <img src=${char.image} class="" />
    <p> ${char.likes} </p>
    <p style="display:inline-block; vertical-align: middle;">
    <button class="like-btn" data-action="like">Like</button>
    <button class="delete-btn" data-action="delete">Delete</button>
    </p>
    </div>`
  } // added p tag to buttons for the inline block

  document.addEventListener('click', e => {
    if (e.target.className == 'character-avatar') {
      // console.log(e.target.parentNode.dataset.id)
      let charId = e.target.parentNode.dataset.id
      fetch(`${characterUrl}/${charId}`)
        .then(resp => resp.json())
        .then(data => renderShowCharacter(data))
      togglecardShowView()

    }

    if(e.target.classList[0] == 'show-cards') {
      // console.log('click click clickckckckc')
      // console.log(showDiv)
      showDiv.innerHTML = ''
      togglecardShowView()
    }
  })
  
  getCharacters(characterUrl)
  
})



// function deleteData(item, url) {
//   return fetch(url + '/' + item, {
//     method: 'delete'
//   })
//   .then(response => response.json());
// }


// function addEventListener(nameOfEvent, callback) {
  //   if(nameOfEvent == "DOMContentLoaded") {
    //     console.log('the dom has loaded yo')
    //     console.log(nameOfEvent)
    //     callback()
    //   }
    // }
// function renderCharacters(characters) {
//   characters.forEach(function(char) {
//     console.log(char)
//   })
// }

// function getCharacters() {
//   // feth characters
//   // get data
//   // build cards 
//   fetch('http://localhost:3000/characters/')
//   .then(resp => resp.json())
//   .then(data => {
//     console.log(data)
//     renderCharacters(data)
//   })
// }

// function renderCharacters(characters) {
//   characters.forEach((char)=>{
//     div = document.getElementById('character-collection')
//     let newDiv = document.createElement('div')
//     newDiv.classList.add('card')

//     let h2 = document.createElement('h2')
//     h2.innerText = `${char.name}`

//     let img = document.createElement('img')
//     img.classList.add('character-avatar')
//     img.src = char.image
//     // img.outerHTML = `<img src=${char.image} class="character-avatar" />`
//     console.log(char.image)
//     console.log(img)

//     let p = document.createElement('p')
//     p.innerHTML = `<p id='likes'>${char.likes}</p>`

//     let button = document.createElement('button')
//     button.innerHTML = `<button class ='like-btn'>Like</button>`

//     newDiv.appendChild(h2)
//     newDiv.appendChild(img)
//     newDiv.appendChild(p)
//     newDiv.appendChild(button)
    
//     div.appendChild(newDiv)
//   })
// }