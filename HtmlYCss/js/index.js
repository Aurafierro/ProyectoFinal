<script>
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  let currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();

  const monthElement = document.getElementById('month');
  const calendarBody = document.getElementById('calendar-body');

  function generateCalendar() {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    monthElement.textContent = months[currentMonth] + ' ' + currentYear;

    calendarBody.innerHTML = '';

    let date = 1;
    for (let i = 0; i < 6; i++) {
      const row = document.createElement('tr');
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayOfMonth) {
          const cell = document.createElement('td');
          row.appendChild(cell);
        } else if (date > daysInMonth) {
          break;
        } else {
          const cell = document.createElement('td');
          cell.textContent = date;
          cell.addEventListener('click', selectDate);
          if (date === currentDate.getDate() && currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear()) {
            cell.classList.add('selected');
          }
          row.appendChild(cell);
          date++;
        }
      }
      calendarBody.appendChild(row);
    }
  }

  function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    generateCalendar();
  }

  function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    generateCalendar();
  }

  function selectDate(event) {
    const selectedDate = event.target.textContent;
    currentDate = new Date(currentYear, currentMonth, selectedDate);
    generateCalendar();
  }

  generateCalendar();
</script>