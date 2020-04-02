console.log('Hello World');
$(document).ready(init);

function init() {
  console.log('DOM is ready!!!');

  // hook up event listeners
  $('.js-songs').on('click', '.js-delete', clickDelete);
  $('.js-songs').on('click', '.js-update', clickUpdate);

  // load songs to page
  getSongs();
}

//
// EVENT HANDLERS
// ----------

function clickUpdate(event) {
  const itemId = event.target.dataset.id;
  console.log('itemId:', itemId);

  updateSong(itemId);
}

function clickDelete(event) {
  console.log(this);
  // Getting id from element with jquery
  // const itemId = $(this).data('id');

  // Getting id from element with javascript
  const itemId = event.target.dataset.id;
  console.log('itemId:', itemId);

  deleteSong(itemId);
}

//
// SERVER API CALLS
// ----------

// get all of the songs from the server
function getSongs() {
  $.ajax({
    method: 'GET',
    url: '/songs',
  })
  .then((response) => {
    render(response);
  })
  .catch((err) => {
    console.log('ERROR:', err);
    alert('There was an error getting songs');
  });
}

function deleteSong(id) {
  $.ajax({
    method:'DELETE',
    url: `/songs/${id}`
  })
  .then((response) => {
    console.log('DELETE', response);
    getSongs();
  })
  .catch((err) => {
    console.log('ERROR', err);
    alert('There was an error deleting your song.');
  });
}

function updateSong(id, songData) {
  console.log('UPDATE:', id);
  console.log('update to: ', songData);

  $.ajax({
    method: 'PUT',
    url: `/songs/${id}`,
    data: songData
  })
  .then((response) => {
    console.log('UPDATED', response);
    getSongs();
  })
  .catch((err) => {
    console.log('ERROR:', err);
    alert('There was an error updating your song.');
  });
}

//
// DOM Updates
// ----------

function render(songsList) {
  console.log(songsList);

  $('.js-songs').empty();

  for (let songItem of songsList) {
    // moment.js for date formatting
    $('.js-songs').append(`
      <tr>
        <td>${songItem.rank}</td>
        <td>${songItem.track}</td>
        <td>${songItem.artist}</td>
        <td>${new Date(songItem.published).getFullYear()}</td>
        <td>
          <button class="js-delete btn" data-id="${songItem.id}">DELETE</button>
          <button class="js-update btn" data-id="${songItem.id}">UPDATE</button>
        </td>
      </tr>
    `);
  }
}