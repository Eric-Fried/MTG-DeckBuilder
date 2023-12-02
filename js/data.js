/* exported data */
let data = {
  view: 'entry-form',
  decks: [],
  editing: null,
  nextEntryId: 1,
};

window.addEventListener('beforeunload', handleUnload);

function handleUnload(event) {
  const jsonData = JSON.stringify(data);
  localStorage.setItem('jsonData', jsonData);
}
const jsonData = localStorage.getItem('jsonData');
if (jsonData !== null) {
  data = JSON.parse(jsonData);
}

console.log(jsonData);
