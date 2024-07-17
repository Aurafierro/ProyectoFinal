document.addEventListener('DOMContentLoaded', function() {
    const calendarBody = document.getElementById('calendar-body');
    const monthYear = document.getElementById('month-year');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');

    let currentDate = new Date();

    // Sample data for occupied and pending days
    const occupiedDays = [5, 12, 19];
    const pendingDays = [10, 20, 25];

    function renderCalendar() {
        calendarBody.innerHTML = '';
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        monthYear.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${currentYear}`;

        let date = 1;
        for (let i = 0; i < 6; i++) {
            const row = document.createElement('tr');

            for (let j = 0; j < 7; j++) {
                const cell = document.createElement('td');
                if (i === 0 && j < firstDay) {
                    cell.innerHTML = '';
                } else if (date > daysInMonth) {
                    break;
                } else {
                    cell.innerHTML = date;
                    cell.classList.add('selectable-day');
                    if (
                        date === new Date().getDate() &&
                        currentYear === new Date().getFullYear() &&
                        currentMonth === new Date().getMonth()
                    ) {
                        cell.classList.add('current-day');
                    }
                    if (occupiedDays.includes(date)) {
                        cell.classList.add('occupied');
                    } else if (pendingDays.includes(date)) {
                        cell.classList.add('pending');
                    }
                    date++;
                }
                row.appendChild(cell);
            }

            calendarBody.appendChild(row);
        }
    }

    prevMonthBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    calendarBody.addEventListener('click', function(event) {
        if (event.target.classList.contains('selectable-day')) {
            alert(`Día seleccionado: ${event.target.innerHTML}`);
        }
    });

    renderCalendar();
});
