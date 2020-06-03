let allPeople = [];
let resultPeople = [];
let findPeople = null;
let inoutPeople = null;
let man = 0;
let woman = 0;
let countAge = 0;
let averageAge = 0;

window.addEventListener('load', () => {
  findPeople = document.querySelector('#findPeople');
  inoutPeople = document.querySelector('#name');
  man = document.querySelector('#man');
  woman = document.querySelector('#woman');
  countAge = document.querySelector('#countAge');
  averageAge = document.querySelector('#averageAge');
  fetchPeople();
});
async function fetchPeople() {
  const res = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  const json = await res.json();
  allPeople = json.results.map((person) => {
    const { name, picture, dob, gender } = person;

    return {
      firstname: name.first,
      lastname: name.last,
      nameLowerCase: `${name.first} ${name.last}`.toLowerCase(),
      picture: picture.thumbnail,
      age: dob.age,
      gender,
    };
  });
  console.log(allPeople);
  render();
}

function render() {
  renderPeople();
  addEventList();
  filterPeople(allPeople);
  renderSummary();
}
function renderPeople() {
  let peopleHTML = '<div>';
  resultPeople.forEach((person) => {
    const { firstname, lastname, picture, age, gender } = person;
    const peoplesHTML = `
      <div class="people">
        <div class="thumbnail">
          <img src="${picture}" alt="${firstname} ${lastname}">
        </div>
        <div class="data">
          <span> ${firstname} ${lastname}, ${age} - ${gender}</span>
        </div>
      </div>
      `;
    peopleHTML += peoplesHTML;
  });
  peopleHTML += '</div>';
  findPeople.innerHTML = peopleHTML;
}
function addEventList() {
  inoutPeople.addEventListener('keyup', handleKeyUp);
}
function handleKeyUp(event) {
  textSeach = event.target.value;
  textLowerCase = textSeach.toLowerCase();
  if (textLowerCase.trim() !== '') {
    let button = document.querySelector('#button');
    button.addEventListener('click', filterPeople(textLowerCase));
    console.log(textSeach);
  }
}
function filterPeople(textLowerCase) {
  resultPeople = allPeople.filter((el) => {
    return el.nameLowerCase.includes(textLowerCase);
  });
  console.log(resultPeople);
  renderPeople();
}
function renderSummary() {}
