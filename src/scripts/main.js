'use strict';

const table = document.querySelector('table');
const headers = table.querySelectorAll('th');
const tableBody = table.querySelector('tbody');
const tableRows = tableBody.querySelectorAll('tr');

const employees = [];

const replaceSalary = (salary) => {
  return Number(salary.replace(/[$,]/g, ''));
};

for (const element of tableRows) {
  const { children } = element;
  const [nameEl, position, office, age, salary] = children;
  const bio = {
    name: nameEl.textContent,
    position: position.textContent,
    office: office.textContent,
    age: age.textContent,
    salary: replaceSalary(salary.textContent),
  };

  employees.push(bio);
}

const populateRow = ({ nameEl, position, office, age, salary }) => `<tr>
<td>${nameEl}</td>
<td>${position}</td>
<td>${office}</td>
<td>${age}</td>
<td>$${salary.toLocaleString()}</td>
</tr>`;

for (const header of headers) {
  const sortEmployees = ({ target }) => {
    const field = target.textContent.toLowerCase();
    const sortedEmployees = [...employees].sort((a, b) => a[field] - b[field]);
    const populatedData = sortedEmployees
      .map((empoloyee) => populateRow(empoloyee))
      .join('');

    tableBody.innerHTML = populatedData;
  };

  header.addEventListener('click', sortEmployees);
}

const body = document.querySelector('body');

const form = `<form action="" class="new-employee-form">
  <label>Name: <input  data-qa="name" name="name" type="text"></label>
  <label>
  Position: <input data-qa="position" name="position" type="text">
  </label>
 <label>Office<select data-qa="office" name="office" id="">
   <option value="tokyo">Tokyo</option>
   <option value="singapore">Singapore</option>
   <option value="london">London</option>
   <option value="new york">New York</option>
   <option value="edinburgh">Edinburgh</option>
   <option value="san francisco">San Francisco</option>
 </select></label>
  <label>Age: <input  data-qa="age" name="age" type="number"></label>
  <label>Salary: <input  data-qa="salary" name="salary" type="number"></label>
 <button type="submit">Save to table</button>
</form>`;

body.insertAdjacentHTML('beforeend', form);

const formEl = document.querySelector('form');

const handleSubmit = (eventt) => {
  eventt.preventDefault();

  const employee = {};
  const formInputs = formEl.querySelectorAll('[data-qa]');

  for (const input of formInputs) {
    const { name: fieldName, value } = input;

    if (fieldName === 'age' || fieldName === 'salary') {
      employee[fieldName] = Number(value) || 0;
    } else {
      employee[fieldName] = value || 'null';
    }
  }
  employees.push(employee);
  tableBody.insertAdjacentHTML('beforeend', populateRow(employee));
};

formEl.addEventListener('submit', handleSubmit);
