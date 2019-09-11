

export function getAllCards() {
  return fetchCards()   
  }

  export function getSingleCard(id) {
    return fetchCards({id})
  }  

  export function postCard(data) {
    return fetchCards({
      data,
      method: 'POST',
    })
  }  

  export function changeCard(id, data) {
    return fetchCards({
      data,
      id,
      method: 'PATCH'
    })
  }

  export function deleteCard(id) {
    return fetchCards({
      id,
      method: 'DELETE',
    })
}

function fetchCards({id='', method='GET', data} = {}) {
  return fetch('http://localhost:3333/cards/' + id, {
      method,
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => res.json())  
}