var Trackster = {};

$(document).ready(function() {

  const API_KEY = '8ed60dd9077857e18a04b6549034e103';
  $('#search-button').click(function() {
    Trackster.searchTracksByTitle($('#search-input').val());
  });
//  $('#play-button').click(function() {
//    console.log('https://youtu.be/eI_O5_tJ1hA');
//  });

/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks.
*/
Trackster.renderTracks = function(tracks) {
  var $songList = $('#song-List');
  $songList.empty();

  for (var songIndex = 0; songIndex < tracks.length; songIndex++) {
    var track = tracks[songIndex];
    var mediumAlbumArt = track.image[1]["#text"];
    var songHTML =
    '<div class="row song">' +
    '  <div class="col-xs-1 col-xs-offset-1" id="play-button">' +
    '    <a href="' + track.url + '" target="_blank">' +
    '      <i class="fa fa-play-circle-o fa-2x"></i>' +
    '    </a>' +
    '  </div>' +
    '  <a class="col-xs-4 song-title" href="#">' + track.name + '</a>' +
    '  <a class="col-xs-2 song-artist" href="#">' + track.artist + '</a>' +
    '  <a class="col-xs-2 song-art" href="#"><img src="' + mediumAlbumArt + '"/></a>' +
    '  <a class="col-xs-2 song-listen" href="#">' + track.listeners + '</a>' +
    '</div>';
    $songList.append(songHTML);
    console.log(track);
  }
};

/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = function(title) {
  $.ajax({
    url: 'http://ws.audioscrobbler.com/2.0/?method=track.search&track=' + title + '&api_key=' + API_KEY + '&format=json',
    success: function(response) {
      Trackster.renderTracks(response.results.trackmatches.track);
    }
  });
};
});
