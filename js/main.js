const $dataViewHome = document.querySelector("[data-view='home']");
const $dataViewCardSearch = document.querySelector("[data-view='card-search']");
const $deckViewRow = document.querySelector('.deck-view-row');
const $dataViewDecks = document.querySelector("[data-view='deck-view']");
const $navBar = document.querySelector('.nav-bar');
const $cardSearchRow = document.querySelector('.card-search-row');
const $deckForm = document.querySelector('form');

function viewSwap(nameOfView) {
  if (nameOfView === 'home') {
    $dataViewCardSearch.className = 'card-search hidden';
    $dataViewHome.className = 'home';
    $dataViewDecks.classList.add('hidden');
    $navBar.setAttribute('class', 'row nav-bar hidden');
    $dataViewDecks.classList.add('hidden');
  } else if (nameOfView === 'card-search') {
    $dataViewHome.className = 'home hidden';
    $dataViewCardSearch.className = 'card-search';
    $navBar.setAttribute('class', 'row nav-bar');
    $dataViewDecks.classList.add('hidden');
  } else if (nameOfView === 'decks') {
    $dataViewCardSearch.classList.add('hidden');
    $dataViewHome.classList.add('hidden');
    $dataViewDecks.className = 'decks';

    toggleNoEntries();
  }
}

const $cardSearchButton = document.querySelector('.card-search-button');
$cardSearchButton.addEventListener('click', handleCardSearchClick);
function handleCardSearchClick(event) {
  while ($cardSearchRow.firstChild) {
    $cardSearchRow.removeChild($cardSearchRow.firstChild);
  }
  viewSwap('card-search');
  getCardData();
}

const $deckBuilderButton = document.querySelector('.deck-builder-button');
$deckBuilderButton.addEventListener('click', handleDeckBuildClick);
function handleDeckBuildClick(event) {
  viewSwap('decks');
  getCardData();
  while ($deckViewRow.firstChild) {
    $deckViewRow.removeChild($deckViewRow.firstChild);
  }
  getButtons();
}

const $homeButton = document.querySelector('#home-button');
$homeButton.addEventListener('click', handleHomeClick);
function handleHomeClick(event) {
  viewSwap('home');
}
const $titleText = document.querySelector('.title-text');
$titleText.addEventListener('click', handleTitleClick);
function handleTitleClick(event) {
  viewSwap('home');
}

const $setDropDown = document.querySelector('#sets');
$setDropDown.addEventListener('change', handleSetClick);
function handleSetClick(event) {
  while ($cardSearchRow.hasChildNodes()) {
    $cardSearchRow.firstChild.remove();
  }
  getSetSortedCardData();
}

const $colorsDropDown = document.querySelector('#colors');
$colorsDropDown.addEventListener('change', handleColorClick);
function handleColorClick(event) {
  while ($cardSearchRow.hasChildNodes()) {
    $cardSearchRow.firstChild.remove();
  }
  getColorSortedCardData();
}

const $searchBar = document.querySelector('#search-box');
$searchBar.addEventListener('search', handleSearchEntry);

console.dir($searchBar);

function handleSearchEntry(event) {
  event.preventDefault();
  console.log($searchBar.value);
  while ($cardSearchRow.hasChildNodes()) {
    $cardSearchRow.firstChild.remove();
  }
  getSearchedCardData();
  console.log(event.target);
  console.log(getSearchedCardData(event.target.value));
}

$deckForm.addEventListener('submit', handleNewDeckClick);
const $newDeckButton = document.querySelector('.new-deck-button');
const $deckName = document.querySelector('input');
function handleNewDeckClick(event) {
  event.preventDefault();
  const deckName = $deckName.value;
  if (deckName === '') {
    return;
  }

  const newDeck = {
    name: deckName,
    cards: [],
  };

  newDeck.id = data.nextEntryId;
  data.nextEntryId++;
  data.decks.push(newDeck);
  data.editing = newDeck;
  viewSwap('card-search');
}

function renderEntry(entry) {
  const $columnOneFifth = document.createElement('div');
  $columnOneFifth.setAttribute('class', 'column-one-fifth');
  const $img = document.createElement('img');
  const $pencil = document.createElement('i');
  $pencil.setAttribute('class', 'fa-solid fa-circle-plus add-icon');

  $img.setAttribute('src', entry.imageUrl);
  $img.setAttribute('alt', 'card artwork');
  $img.setAttribute('loading', 'lazy');
  $columnOneFifth.appendChild($img);
  $columnOneFifth.appendChild($pencil);
  $columnOneFifth.addEventListener('click', handleAddCLick);

  return $columnOneFifth;
}

function renderDeckViewEntry(entry) {
  const $columnOneFifth = document.createElement('div');
  $columnOneFifth.setAttribute('class', 'column-one-fifth');
  const $img = document.createElement('img');
  const $pencil = document.createElement('i');
  $pencil.setAttribute('class', 'fa-solid fa-circle-plus add-icon');

  $img.setAttribute('src', entry);
  $img.setAttribute('alt', 'card artwork');
  $img.setAttribute('loading', 'lazy');
  $columnOneFifth.appendChild($img);
  $columnOneFifth.appendChild($pencil);
  $columnOneFifth.addEventListener('click', handleAddCLick);

  return $columnOneFifth;
}

function renderButtons(entry) {
  const $columnOneFifth = document.createElement('div');
  $columnOneFifth.setAttribute('class', 'column-one-fifth');
  const $deckSelectButton = document.createElement('button');
  $deckSelectButton.setAttribute('class', 'deck-select-button');
  $deckSelectButton.textContent = entry.name;
  $columnOneFifth.appendChild($deckSelectButton);

  // add click event to $deckSelectButton
  $deckSelectButton.addEventListener('click', handleDeckSelectClick);

  //
  return $columnOneFifth;
}

function getButtons() {
  for (let i = 0; i < data.decks.length; i++) {
    const currentRender = renderButtons(data.decks[i]);

    $deckViewRow.prepend(currentRender);
  }
}
function handleAddCLick(event) {
  if (event.target.tagName === 'I') {
    const closestDataEntry = event.target.closest('.column-one-fifth');

    const closestDataEntryImg = closestDataEntry.children[0].src;

    for (let i = 0; i < data.decks.length; i++) {
      if (data.editing.id === data.decks[i].id) {
        data.editing.cards.push(closestDataEntryImg);
      }
    }
  }
}

function handleDeckSelectClick(event) {
  //get event.target.textContent and store as variable
  const currentDeckButtonText = event.target.textContent;

  //loop over data.decks
  for (i = 0; i < data.decks.length; i++) {
    debugger;
    data.decks[i].name = 'deck' + ' ' + (i + 1);

    //conditional statment to check if variable created on line 121 is equal to
    //name property of current deck in loop
    if (currentDeckButtonText === data.decks[i].name) {
      //if true view swap to card search
      while ($cardSearchRow.firstChild) {
        $cardSearchRow.removeChild($cardSearchRow.firstChild);
      }

      for (j = 0; j < data.decks[i].cards.length; j++) {
        const currentRender = renderDeckViewEntry(data.decks[i].cards[j]);
        $cardSearchRow.appendChild(currentRender);
      }
      viewSwap('card-search');
    }
  }
}

function getCardData() {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://api.magicthegathering.io/v1/cards');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (let i = 0; i < xhr.response.cards.length; i++) {
      if (xhr.response.cards[i].imageUrl) {
        const currentRender = renderEntry(xhr.response.cards[i]);
        $cardSearchRow.appendChild(currentRender);
      }
    }
  });
  xhr.send();
}

let cardData = {
  color: 'W',
  set: '',
};

console.log(cardData);

function getSetSortedCardData() {
  const xhr = new XMLHttpRequest();

  if (cardData.color) {
    xhr.open(
      'GET',
      `https://api.magicthegathering.io/v1/cards?set=${event.target.value}&colorIdentity=${cardData.color}`,
    );
  } else {
    xhr.open(
      'GET',
      `https://api.magicthegathering.io/v1/cards?set=${event.target.value}`,
    );
  }
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (let i = 0; i < xhr.response.cards.length; i++) {
      if (xhr.response.cards[i].imageUrl) {
        const currentRender = renderEntry(xhr.response.cards[i]);
        $cardSearchRow.appendChild(currentRender);
      }
    }
  });
  console.log(xhr);
  xhr.send();
}

function getColorSortedCardData() {
  const xhr = new XMLHttpRequest();
  xhr.open(
    'GET',
    `https://api.magicthegathering.io/v1/cards?colorIdentity=${event.target.value}`,
  );
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (let i = 0; i < xhr.response.cards.length; i++) {
      if (xhr.response.cards[i].imageUrl) {
        const currentRender = renderEntry(xhr.response.cards[i]);
        $cardSearchRow.appendChild(currentRender);
      }
    }
  });
  xhr.send();
}

function getSearchedCardData() {
  const xhr = new XMLHttpRequest();
  xhr.open(
    'GET',
    `https://api.magicthegathering.io/v1/cards?name=${event.target.value}`,
  );
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (let i = 0; i < xhr.response.cards.length; i++) {
      if (xhr.response.cards[i].imageUrl) {
        const currentRender = renderEntry(xhr.response.cards[i]);
        $cardSearchRow.appendChild(currentRender);
      }
    }
  });
  xhr.send();
}

const $noEntriesMessage = document.getElementById('noDecks');
function toggleNoEntries() {
  if (data.decks.length === 0) {
    $noEntriesMessage.classList.remove('hidden');
  } else {
    $noEntriesMessage.classList.add('hidden');
  }
}
