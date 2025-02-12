const scriptURL = "https://script.google.com/macros/s/AKfycbwALlTd71tHX-LjLHiZ9KmwNZFsEGu0Mjyv2bFbmLV78h--4v2s3up1uwr7Ht2cp1UR/exec";

document.addEventListener('DOMContentLoaded', function() {
    $('.odd').hide()
    const startDate = document.getElementById('startDate');
    const endDate = document.getElementById('endDate');
    const recordsTable = document.getElementById('recordsTable');
    const noRecords = document.getElementById('noRecords');

    // Set default date range (last 7 days)
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    function formatDate(dateString) {
        const date = new Date(dateString);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    }
    
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
                data: formattedData,
                responsive: true,
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
                ]
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}); 