// Client-side validation for the prediction form
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('predictionForm');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            // Get form inputs
            const sex = document.getElementById('sex').value;
            const age = parseInt(document.getElementById('age').value);
            const g1 = parseInt(document.getElementById('g1').value);
            const g2 = parseInt(document.getElementById('g2').value);
            const g3 = parseInt(document.getElementById('g3').value);
            
            let isValid = true;
            let errorMessage = '';
            
            // Validate sex
            if (sex !== '0' && sex !== '1') {
                errorMessage += 'Please select your sex (Female or Male).\n';
                isValid = false;
            }
            
            // Validate age
            if (isNaN(age) || age < 10 || age > 25) {
                errorMessage += 'Age must be between 10 and 25.\n';
                isValid = false;
            }
            
            // Validate grades
            if (isNaN(g1) || g1 < 0 || g1 > 20) {
                errorMessage += 'First period grade must be between 0 and 20.\n';
                isValid = false;
            }
            
            if (isNaN(g2) || g2 < 0 || g2 > 20) {
                errorMessage += 'Second period grade must be between 0 and 20.\n';
                isValid = false;
            }
            
            if (isNaN(g3) || g3 < 0 || g3 > 20) {
                errorMessage += 'Third period grade must be between 0 and 20.\n';
                isValid = false;
            }
            
            // Check other required fields
            const selects = form.querySelectorAll('select[required]');
            selects.forEach(select => {
                if (!select.value) {
                    errorMessage += `Please select a value for ${select.previousElementSibling.textContent}.\n`;
                    isValid = false;
                }
            });
            
            // Show error message and prevent form submission if validation fails
            if (!isValid) {
                event.preventDefault();
                alert('Please correct the following errors:\n' + errorMessage);
            }
        });
    }
    
    // Add input event listeners for real-time validation
    const numericInputs = document.querySelectorAll('input[type="number"]');
    numericInputs.forEach(input => {
        input.addEventListener('input', function() {
            const min = parseInt(this.getAttribute('min'));
            const max = parseInt(this.getAttribute('max'));
            const value = parseInt(this.value);
            
            if (isNaN(value)) {
                this.classList.remove('is-valid');
                this.classList.remove('is-invalid');
            } else if (value < min || value > max) {
                this.classList.remove('is-valid');
                this.classList.add('is-invalid');
            } else {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            }
        });
    });
});
