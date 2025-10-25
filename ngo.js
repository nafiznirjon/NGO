const form = document.getElementById('memberForm');
const tableBody = document.querySelector('#memberTable tbody');

let members = JSON.parse(localStorage.getItem('members')) || [];

function renderTable() {
  tableBody.innerHTML = '';
  members.forEach((m, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${m.name}</td>
      <td>৳${m.loan}</td>
      <td>৳${m.installment}</td>
      <td>৳${m.paid}</td>
      <td>৳${m.loan - m.paid}</td>
      <td>
        <button onclick="addInstallment(${index})">💸 কিস্তি দিন</button>
        <button onclick="deleteMember(${index})">❌ মুছুন</button>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const loan = parseFloat(document.getElementById('loan').value);
  const installment = parseFloat(document.getElementById('installment').value);

  members.push({ name, loan, installment, paid: 0 });
  localStorage.setItem('members', JSON.stringify(members));
  form.reset();
  renderTable();
});

function addInstallment(index) {
  members[index].paid += members[index].installment;
  if (members[index].paid > members[index].loan) {
    members[index].paid = members[index].loan;
  }
  localStorage.setItem('members', JSON.stringify(members));
  renderTable();
}

function deleteMember(index) {
  if (confirm('আপনি কি নিশ্চিত মুছতে চান?')) {
    members.splice(index, 1);
    localStorage.setItem('members', JSON.stringify(members));
    renderTable();
  }
}

renderTable();