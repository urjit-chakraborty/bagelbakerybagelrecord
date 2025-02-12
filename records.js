const scriptURL = "https://script.google.com/macros/s/AKfycbwALlTd71tHX-LjLHiZ9KmwNZFsEGu0Mjyv2bFbmLV78h--4v2s3up1uwr7Ht2cp1UR/exec";

document.addEventListener('DOMContentLoaded', function() {
    $('.odd').hide()
    const startDate = document.getElementById('startDate');
    const endDate = document.getElementById('endDate');
    const recordsTable = document.getElementById('recordsTable');
    const noRecords = document.getElementById('noRecords');
    const tableContainer = document.querySelector('.container.mt-5');
    const loadingSpinner = document.getElementById('loadingSpinner');

    // Set default date range (last 7 days)
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    // Add loading class to container
    tableContainer.classList.add('loading');
    
    fetch(scriptURL)
        .then(response => response.json())
        .then(data => {
            // Format dates in the data
            const formattedData = data.map(row => ({
                ...row,
                Date: formatDate(row.Date)
            }));

            $('#dataTable').DataTable({
                scrollX: true,
                responsive: true,
                data: formattedData,
                columns: [
                    { data: 'Date' },
                    { data: 'Plain' },
                    { data: 'Asiago' },
                    { data: 'CRaisin' },
                    { data: 'Blueberry' },
                    { data: 'HoneyWheat' },
                    { data: 'SdTomato' },
                    { data: 'Pumpernickel' },
                    { data: 'UltimateGrain' }
                ],
                initComplete: function() {
                    // Remove loading class and spinner when table is ready
                    tableContainer.classList.remove('loading');
                    loadingSpinner.style.display = 'none';
                }
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            // Show error message if data fetch fails
            loadingSpinner.innerHTML = `
                <p style="color: #f44336;">Error loading data. Please try refreshing the page.</p>
            `;
        });
}); 