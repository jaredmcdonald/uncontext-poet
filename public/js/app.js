(function (SOURCE_TEXT_SPLIT) {
  var el = document.getElementById('container');

  function getWord (dec) {
    return SOURCE_TEXT_SPLIT[Math.floor(SOURCE_TEXT_SPLIT.length * dec)];
  }

  function appendText (w) {
    el.innerText += ' ' + w;
  }

  var ws = io();

  ws.on('message', function (message) {
    var data = JSON.parse(message);
    var wordRatios = [1 / data.a, 1 / data.b, 1 / data.c, 1 / data.e.f];

    wordRatios.map(getWord).forEach(function (w) {
      setTimeout(function () {
        appendText(w ? ' ' + w : '\n');
      }, (1 / data.e.g) * 1000);
    });

  });

})(window.PARSED_DATA);
