(function (SOURCE_TEXT_SPLIT) {
  var el = document.getElementById('container');
  var userScrolled = false;

  function getWord (dec) {
    return SOURCE_TEXT_SPLIT[Math.floor(SOURCE_TEXT_SPLIT.length * dec)];
  }

  function appendText (w) {
    el.innerText += ' ' + w;
  }

  function onScroll () {
    userScrolled =
      document.body.scrollHeight - window.innerHeight !== window.scrollY;
  }

  function updateScroll () {
    window.scrollTo(0, document.body.scrollHeight);
  }

  var ws = io();

  window.addEventListener('scroll', onScroll);

  ws.on('message', function (message) {
    var data = JSON.parse(message);
    var nums = [data.a, data.b, data.e.f, data.e.g];
    var messageMax = Math.max.apply(null, nums);

    nums.map(function (r) {
      return getWord(r / messageMax);
    }).forEach(function (w) {
      setTimeout(function () {
        appendText(w ? ' ' + w : '\n');
        if (!userScrolled) {
          updateScroll();
        }
      }, (1 / data.c) * 1000);
    });

  });

})(window.PARSED_DATA);
