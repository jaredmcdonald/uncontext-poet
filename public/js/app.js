(function (SOURCE_TEXT_SPLIT) {
  const ALG_TOKEN_REGEX = /^(?:[abcfgms\+\-\/\*\(\)]{1}|[\d\.]+)$/;

  const container = document.getElementById('container');
  const editor = document.getElementById('editor');
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
    // validate individual tokens. tokens must be space-separated
    if (!algString.split(' ').every((t) => ALG_TOKEN_REGEX.test(t))) {
      return false;
    }

     // test w/ realistic values and make sure it doesn't throw
     const [a, b, c, f, g] = [5, 1, 0, 175, 199];
     const m = Math.max(a, b, c, f, g);
     const s = a + b + c + f + g;

     let valueTestPasses;

     try {
       valueTestPasses = Number.isFinite(eval(algString));
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
    }
    toggleInvalidState(!alg);
  }

  function toggleInvalidState (isInvalid) {
    const c = 'invalid';
    if (isInvalid) {
      editor.classList.add(c);
    } else {
      editor.classList.remove(c);
    }
  }

  function updateInfoPanel (a, b, c, f, g, m, s, result, normalized) {
    sample.innerText =
      `${JSON.stringify({a, b, c, f, g})}\n` +
      `m: ${m}, s: ${s}\n` +
      `result: ${result}\n`+
      `normalized: ${normalized}\n` +
      `current algorithm: ${algorithm}`;
  }

  function onMessage (message) {
    const {a, b, c, e: {f, g}} = JSON.parse(message);
    const m = Math.max(a, b, c, f, g); // max
    const s = a + b + c + f + g; // sum

    // eval time :/
    // should be reasonably safe since `algorithm` is scrubbed pre-save
    const result = eval(algorithm);
    const normalized = normalizeResult(result);
    updateInfoPanel(a, b, c, f, g, m, s, result, normalized);

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

  editor.addEventListener('keyup', onAlgChange);
  window.addEventListener('scroll', onScroll);
  ws.on('message', onMessage);

})(window.PARSED_DATA);
