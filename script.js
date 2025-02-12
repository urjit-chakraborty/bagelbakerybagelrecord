const scriptURL = "https://script.google.com/macros/s/AKfycbxyAarxG5TYx6sYFw_7Vz6nbVGWyvjVDHurSyO6CwKFYFxbXv1U2ubTvQ2omm4ZhrHg/exec";

document.addEventListener('DOMContentLoaded', function() {
    // Set up date input with tomorrow as default
    const dateInput = document.getElementById('batchDate');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Format date as YYYY-MM-DD for input value
    const formattedDate = tomorrow.toISOString().split('T')[0];
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



        // const bagelTypes = ['plain', 'asiago', 'cinnamonRaisin', 'blueberry', 

        //                    'honeyWheat', 'sunDriedTomato', 'pumpernickel', 'ultimateGrain'];

        

        // bagelTypes.forEach(type => {

        //     batchData.batches[type] = {

        //         amount: document.getElementById(type).value,

        //         unit: document.getElementById(type + 'Unit').value

        //     };

        // });
        var formData = new FormData();
        // formData.append("Employee", employeeName);
        // formData.append("BagelType", selectedBagel.charAt(0).toUpperCase() + selectedBagel.slice(1));
        formData.append("Date", "test");
        formData.append("Plain", "test");
        formData.append("Asiago", "test");
        formData.append("CRaisin", "test");
        formData.append("Blueberry", "test");
        formData.append("HoneyWheat", "test");
        formData.append("SdTomato", "test");
        formData.append("Pumpernickel", "test");
        formData.append("UltimateGrain", "test");
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