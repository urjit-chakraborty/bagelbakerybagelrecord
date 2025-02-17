const scriptURL = "https://script.google.com/macros/s/AKfycbwALlTd71tHX-LjLHiZ9KmwNZFsEGu0Mjyv2bFbmLV78h--4v2s3up1uwr7Ht2cp1UR/exec";
const scriptUR = "https://script.google.com/macros/s/AKfycbzPW3Y-eEj6RNc4eyIkBgCGgM03fTU_Zj6K92pMQh5K2TzI_iRTzlmEQY9BwgHGX7JF0w/exec";
document.addEventListener('DOMContentLoaded', function() {
    // Set up date input with tomorrow as default
    const dateInput = document.getElementById('batchDate');
    
    // Get tomorrow's date in local timezone
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);  // Set to midnight
    
    // Format date as YYYY-MM-DD in local timezone
    const formattedDate = tomorrow.toLocaleDateString('en-CA');  // en-CA gives YYYY-MM-DD format
    dateInput.value = formattedDate;
    dateInput.defaultValue = formattedDate;

    // ... existing code ...
    const saveButton = document.getElementById('saveButton');

    const clearButton = document.getElementById('clearButton');

    const savedMessage = document.getElementById('savedMessage');

    const totalBagelsDisplay = document.getElementById('totalBagels');
    // Add focus event listeners to all number inputs
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('focus', function() {
            if (this.value === '0') {
                this.value = '';
            }
        });
        
        // Add blur event to reset to 0 if left empty
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.value = '0';
            }
        });
    });

    // Save batches
    saveButton.addEventListener('click', function() {
        const loadingOverlay = document.getElementById('loadingOverlay');
        loadingOverlay.classList.remove('hidden');
        saveButton.disabled = true;  // Disable save button while saving
        
        var formData = new FormData();
        
        // Standardize date formatting regardless of source
        let dateToSend;
        if (dateInput.value === dateInput.defaultValue) {
            // If it's the default date, format it to match the manual selection format
            const defaultDate = new Date(dateInput.value + 'T00:00:00');
            dateToSend = defaultDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                timeZone: 'America/New_York'
            });
        } else {
            // For manually selected dates, use existing formatting
            const selectedDate = new Date(dateInput.value + 'T00:00:00');
            dateToSend = selectedDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                timeZone: 'America/New_York'
            });
        }
        
        console.log(dateToSend);
        formData.append("Date", dateToSend);
        
        const bagelTypes = ['Plain', 'Asiago', 'CRaisin', 'Blueberry', 
                           'HoneyWheat', 'SdTomato', 'Pumpernickel', 'UltimateGrain',
                           'Jalapeno', 'Everything', 'Sesame', 'Onion', 
                           'Poppy', 'Salt', 'Garlic'];
        
        bagelTypes.forEach(type => {
            const amount = document.getElementById(type).value;
            const unit = document.getElementById(type + 'Unit').value;
            formData.append(type, `${amount} ${unit}`);
        });
       
        // Add this to see FormData contents
        console.log("FormData contents:");
        formData.forEach((value, key) => {
            console.log(key + ': ' + value);
        });
        
        fetch(scriptURL, { method: "POST", body: formData })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log("Success:", response);
            
            // Show success message
            savedMessage.textContent = 'Batch quantities saved successfully!';
            savedMessage.className = 'saved-message success';
            
            // Clear inputs
            document.querySelectorAll('input[type="number"]').forEach(input => {
                input.value = 0;
            });
            
            document.querySelectorAll('.unit-select').forEach(select => {
                select.value = 'board';
            });
        })
        .catch((error) => {
            console.error("Error:", error);
            savedMessage.textContent = 'Error saving batch quantities. Please try again.';
            savedMessage.className = 'saved-message error';
        })
        .finally(() => {
            // Hide loading overlay and re-enable save button
            loadingOverlay.classList.add('hidden');
            saveButton.disabled = false;
            
            // Hide message after 3 seconds
            setTimeout(() => {
                savedMessage.className = 'saved-message';
            }, 3000);
        });
    });

    // Clear all inputs
    clearButton.addEventListener('click', function() {
        document.querySelectorAll('input[type="number"]').forEach(input => {
            input.value = 0;
        });
        
        document.querySelectorAll('.unit-select').forEach(select => {
            select.value = 'board';
        });
        
        // Reset date to tomorrow
        dateInput.value = formattedDate;
    });
});