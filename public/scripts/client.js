console.log('Hello World');
$(document).ready(init);

function init() {
  console.log('DOM is ready!!!');

  // hook up event listeners
  $('.js-songs').on('click', '.js-delete', clickDelete);

  // load songs to page
  getSongs();
}

//
// EVENT HANDLERS
// ----------

function clickDelete(event) {
  console.log(this);
}

//
// SERVER API CALLS
// ----------

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
        <td><button class="js-delete">DELETE</button></td>
      </tr>
    `);
  }
}