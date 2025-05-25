document.addEventListener("DOMContentLoaded", function() {
    const prompts = [
        { id: 'name', label: 'Full Name', type: 'text' },
        { id: 'dob', label: 'Date of Birth', type: 'date' },
        { id: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female'] },
        { id: 'email', label: 'Email Address', type: 'email' },
        { id: 'phone', label: 'Phone Number', type: 'tel' },
        { id: 'username', label: 'Username', type: 'text' },
        { id: 'password', label: 'Password', type: 'password' },
        { id: 'security-question', label: 'Security Question', type: 'select', options: ['What was your first pet\'s name?',  'In what city were you born?'] },
        { id: 'security-answer', label: 'Answer', type: 'text' },
        { id: 'height', label: 'Height', type: 'number' },
        { id: 'weight', label: 'Weight', type: 'number' },
        { id: 'exercise', label: 'Exercise Routine', type: 'select', options: ['Morning', 'Night'] },
        { id: 'medical-history', label: 'Medical History', type: 'select', options: ['Yes', 'No'] },
        { id: 'emergency-contact', label: 'Emergency Contact Information', type: 'tel' }
    ];

    let currentPromptIndex = 0;
    const profile = {};
    const promptsContainer = document.getElementById('prompts-container');
    const profileOutput = document.getElementById('profile-output');
    const progressBar = document.getElementById('progress-bar');

    function updateProgress() {
        const progress = ((currentPromptIndex / prompts.length) * 100).toFixed(2);
        progressBar.style.width = `${progress}%`;
    }

    function isValidPhoneNumber(number) {
        const regex = /^\d{10}$/; 
        return regex.test(number);
    }

    function showNextPrompt() {
        if (currentPromptIndex < prompts.length) {
            const prompt = prompts[currentPromptIndex];
            let inputElement;

            if (prompt.type === 'select') {
                inputElement = `<select id="${prompt.id}" required>
                                    <option value="">Select ${prompt.label}</option>
                                    ${prompt.options.map(option => `<option value="${option.toLowerCase()}">${option}</option>`).join('')}
                                </select>`;
            } else {
                inputElement = `<input type="${prompt.type}" id="${prompt.id}" required>`;
            }

            promptsContainer.innerHTML = `<div class="prompt active">
                                            <label for="${prompt.id}">${prompt.label}:</label>
                                            ${inputElement}
                                            <button id="next-btn">Next</button>
                                          </div>`;

            document.getElementById('next-btn').addEventListener('click', () => {
                const inputValue = document.getElementById(prompt.id).value;
                
                if ((prompt.id === 'phone' || prompt.id === 'emergency-contact') && !isValidPhoneNumber(inputValue)) {
                    alert('Please enter a valid 10-digit phone number with no letters.');
                    return;
                }

                if (inputValue) {
                    profile[prompt.id] = inputValue;
                    currentPromptIndex++;
                    if (currentPromptIndex === 1) {
                        document.getElementById('progress-bar-container').style.display = 'block';
                    }
                    updateProgress();
                    showNextPrompt();

                    if (currentPromptIndex === prompts.length) {
                        promptsContainer.innerHTML = ''; 
                        profileOutput.style.display = 'block'; 
                        profileOutput.innerHTML = '<h3>Profile Complete!</h3>'; 
                        for (let key in profile) {
                            profileOutput.innerHTML += `<div class="output-item">
                                                            <strong>${prompts.find(p => p.id === key).label}:</strong>
                                                            <span class="output-value">${profile[key]}</span>
                                                        </div>`;
                        }
                    }
                } else {
                    alert(`Please enter your ${prompt.label.toLowerCase()}`);
                }
            });
        }
    }

    document.getElementById('progress-bar-container').style.display = 'none';
    profileOutput.style.display = 'none';

    showNextPrompt();
});

document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.querySelector('.toggle_btn');
    const links = document.querySelector('.navbar .links');

    toggleBtn.addEventListener('click', function() {
        links.classList.toggle('active');
    });
});





