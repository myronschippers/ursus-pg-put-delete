console.log('Hello World');
$(document).ready(init);

function init() {
  console.log('DOM is ready!!!');

  // do stuff

  // load songs to page
  getSongs();
}

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
      </tr>
    `);
  }
}