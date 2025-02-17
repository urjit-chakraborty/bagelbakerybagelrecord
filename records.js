const scriptURL = "https://script.google.com/macros/s/AKfycbwALlTd71tHX-LjLHiZ9KmwNZFsEGu0Mjyv2bFbmLV78h--4v2s3up1uwr7Ht2cp1UR/exec";

document.addEventListener('DOMContentLoaded', function() {
    const viewDate = document.getElementById('viewDate');
    const recordsTable = document.getElementById('recordsTable');
    const noRecords = document.getElementById('noRecords');
    const loadingSpinner = document.getElementById('loadingSpinner');

    // Set today as default date
    const today = new Date();
    viewDate.value = today.toISOString().split('T')[0];
    
    function formatDate(date) {
        // Format date consistently with how we store it
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            timeZone: 'America/New_York'  // Match the timezone used in script.js
        });
    }

    function clearTable() {
        const cells = document.querySelectorAll('#recordsTable tbody td:nth-child(2)');
        cells.forEach(cell => cell.textContent = '-');
    }

    function updateTable(date) {
        loadingSpinner.style.display = 'flex';
        recordsTable.style.display = 'none';
        noRecords.classList.add('hidden');
        
        fetch(scriptURL)
            .then(response => response.json())
            .then(data => {
                // Add time to force proper date handling
                const selectedDate = new Date(date + 'T00:00:00');
                const formattedSelectedDate = formatDate(selectedDate);
                
                const dayRecord = data.find(row => {
                    const rowDate = new Date(row.Date);
                    return formatDate(rowDate) === formattedSelectedDate;
                });
                
                if (dayRecord) {
                    Object.keys(dayRecord).forEach(key => {
                        if (key !== 'Date') {
                            const cell = document.getElementById(key);
                            if (cell) cell.textContent = dayRecord[key];
                        }
                    });
                    recordsTable.style.display = 'table';
                    noRecords.classList.add('hidden');
                } else {
                    clearTable();
                    noRecords.classList.remove('hidden');
                }
                loadingSpinner.style.display = 'none';
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                loadingSpinner.innerHTML = `
                    <p style="color: #f44336;">Error loading data. Please try refreshing the page.</p>
                `;
            });
    }

    // Update when date changes
    viewDate.addEventListener('change', (e) => {
        updateTable(e.target.value);
    });

    // Initial load with today's date
    updateTable(viewDate.value);
}); 