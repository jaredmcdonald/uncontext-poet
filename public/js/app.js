(function (SOURCE_TEXT_SPLIT) {
  const ALG_TOKEN_REGEX = /^[abcefms+-/*\(\)1234567890]$/
  const SPACE_REGEX = /\s/;

  const container = document.getElementById('container');
  const controls = document.getElementById('editor');
  const sample = document.getElementById('sample');

  const ws = io();

  let userScrolled = false;
  let algorithm = getAlgorithm();

  function getWord (dec) {
    return SOURCE_TEXT_SPLIT[Math.floor(SOURCE_TEXT_SPLIT.length * dec)];
  }

  function appendText (w) {
    container.innerText += ' ' + w;
  }

  function onScroll () {
    userScrolled =
      document.body.scrollHeight - window.innerHeight !== window.scrollY;
  }

  function updateScroll () {
    window.scrollTo(0, document.body.scrollHeight);
  }

  function validateAlgorithm (algString) {
    // validate individual tokens
    // (we get away with this because each token is one character)
    const tokensValid = algString.split('')
                                 .filter((c) => !SPACE_REGEX.test(c))
                                 .every((item) => ALG_TOKEN_REGEX.test(item));

    if (!tokensValid) return false;

     // test w/ real values and make sure it doesn't throw
     const [a, b, c, f, g] = [5, 1, 0, 175, 199];
     const m = Math.max(a, b, c, f, g);
     const s = a + b + c + f + g;
     let valueTestPasses = true;
     try {
       eval(algString);
     } catch (e) {
       valueTestPasses = false;
     };
     return valueTestPasses;
  }

  function getAlgorithm () {
    const alg = editor.value;
    const isValid = validateAlgorithm(alg);
    if (!isValid) return false;

    return alg;
  }

  // return a number between 0 and 1
  function normalizeResult (result) {
    const abs = Math.abs(result);
    return abs > 1 ? 1 / abs : abs;
  }

  function onAlgChange () {
    const alg = getAlgorithm();
    if (alg) {
      algorithm = alg;
    } else {
      console.error('invalid algorithm');
    }
  }

  function onMessage (message) {
    const {a, b, c, e: {f, g}} = JSON.parse(message);
    const m = Math.max(a, b, c, f, g); // max
    const s = a + b + c + f + g; // sum
    sample.innerText =
      `${JSON.stringify({a, b, c, f, g})}\nm: ${m}, s: ${s}`;

    // eval time :/
    // should be reasonably safe since `algorithm` is scrubbed pre-save
    const result = eval(algorithm);
    const normalized = normalizeResult(result);
    const word = getWord(normalized);
    appendText(` ${word || '\n'}`);
    // arbitrary line break logic
    if (Math.abs(0.5 - normalized) <= 0.01) {
      appendText('\n');
    }

    if (!userScrolled) {
      updateScroll();
    }
  }

  controls.addEventListener('change', onAlgChange);
  window.addEventListener('scroll', onScroll);
  ws.on('message', onMessage);

})(window.PARSED_DATA);
