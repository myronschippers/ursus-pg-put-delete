console.log('Hello World');
$(document).ready(init);

let itemUpdateId = 0;

function init() {
  console.log('DOM is ready!!!');

  // hook up event listeners
  $('.js-songs').on('click', '.js-delete', clickDelete);
  $('.js-songs').on('click', '.js-update', clickUpdate);
  $('.js-btn-save').on('click', clickSaveUpdate);

  // load songs to page
  getSongs();
}

//
// EVENT HANDLERS
// ----------

function clickSaveUpdate(event) {
  console.log('SAVE UPDATE');

  // updateSong(itemId, newSongData);
}

function clickUpdate(event) {
  itemUpdateId = event.target.dataset.id;
  console.log('itemUpdateId:', itemUpdateId);
  const $songRowElement = $(this)
    .parent() // to <td>
    .parent(); // to <tr>
  const currentRank = $songRowElement
    .children('.js-song-rank') // <td> for rank
    .text();
  const currentTrack = $songRowElement
    .children('.js-song-track') // <td> for rank
    .text();
  const currentArtist = $songRowElement
    .children('.js-song-artist') // <td> for rank
    .text();
  const currentPublished = $songRowElement
    .children('.js-song-published') // <td> for rank
    .text();

  $('.js-input-rank').val(parseInt(currentRank));
  $('.js-input-track').val(currentTrack);
  $('.js-input-artist').val(currentArtist);
  $('.js-input-published').val(currentPublished);

  // making the form visible
  $('.js-update-form').toggleClass('hide');
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
        <td class="js-song-rank">
          ${songItem.rank}
        </td>
        <td class="js-song-track">
          ${songItem.track}
        </td>
        <td class="js-song-artist">
          ${songItem.artist}
        </td>
        <td class="js-song-published">
          ${new Date(songItem.published).getFullYear()}
        </td>
        <td>
          <button class="js-delete btn" data-id="${songItem.id}">DELETE</button>
          <button class="js-update btn" data-id="${songItem.id}">UPDATE</button>
        </td>
      </tr>
    `);
  }
}