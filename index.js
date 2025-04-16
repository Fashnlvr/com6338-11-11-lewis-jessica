const getPoemBtn = document.getElementById('get-poem')
const poemEl = document.getElementById('poem')
const poemURL = 'https://poetrydb.org/random,linecount/1;12/author,title,lines.json'

const getJSON = url => fetch(url).then(res => res.json())

const pipe = (...fns) => firstArg => fns.reduce((returnValue, fn) => fn(returnValue), firstArg)

const makeTag = tag => str => `<${tag}>${str}</${tag}>`

// complete this function
const makePoemHTML = ([poem]) => {
  const { title, author, lines } = poem;

  const makeH2 = makeTag('h2');
  const makeH3 = makeTag('h3');
  const makeEm = makeTag('em');
  const makeP = makeTag('p');

  const makeTitle = () => makeH2(title);
  const makeAuthor = () => makeH3(makeEm(`by ${author}`));

  const makeStanza = pipe(
    stanzaLines => stanzaLines.join('<br>'),
    makeP
  );

  const stanzas = lines.reduce((acc, line) => {
    if (line === '') acc.push([]);
    else acc[acc.length - 1].push(line);
    return acc;
  }, [[]]).map(makeStanza).join('');

  return `${makeTitle()}${makeAuthor()}${stanzas}`;
};

// attach a click event to #get-poem
getPoemBtn.onclick = async function() {
  // renders the HTML string returned by makePoemHTML to #poem
  poemEl.innerHTML = makePoemHTML(await getJSON(poemURL))
}
