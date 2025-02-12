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
    // Save batches
    saveButton.addEventListener('click', function() {
        console.log(dateInput.value);
        // const batchData = {

        //     date: dateInput.value,  // Use selected date instead of tomorrow

        //     batches: {}

        // };



        const bagelTypes = ['Plain', 'Asiago', 'CRaisin', 'Blueberry', 

                           'HoneyWheat', 'SdTomato', 'Pumpernickel', 'UltimateGrain'];

        

        
        var formData = new FormData();
        // Convert the date input value to local timezone date string
        const selectedDate = new Date(dateInput.value);
        const localDate = selectedDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        });
        
        formData.append("Date", localDate);
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
            console.log("yay");
            console.log(response)
            console.log(formData);
            //window.location.reload();
        })
        .catch((error) => {
            console.log("nay");
            //window.location.reload();
        });
        // Show success message
        savedMessage.textContent = 'Batch    quantities saved successfully!';
        savedMessage.className = 'saved-message success';
        document.querySelectorAll('input[type="number"]').forEach(input => {
            input.value = 0;
        });
        
        document.querySelectorAll('.unit-select').forEach(select => {
            select.value = 'board';
        });
        // Hide message after 3 seconds
        setTimeout(() => {
            savedMessage.className = 'saved-message';
        }, 3000);
        
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