//다크모드


const toggleButton = document.getElementById('dark-mode');
const currentMode = localStorage.getItem('theme');

if (currentMode === 'dark') {
    document.body.classList.add('dark-mode');
}

toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});




//email send


emailjs.init("2ci2afRgN8F_MpF3O"); // EmailJS에서 받은 public key를 넣으세요

function sendEmail() {

    const fromName = document.getElementById('from_name').value;
    const fromEmail = document.getElementById('from_email').value;
    const message = document.getElementById('message').value;


    if (!fromName || !fromEmail || !message) {
        alert('Please fill in all fields');
        return;
    }


    const sendBtn = document.getElementById('sendBtn');
    sendBtn.style.backgroundColor = 'var(--blue)';
    sendBtn.textContent = 'SEND..';


    const templateParams = {
        from_name: fromName,
        from_email: fromEmail,
        message: message,
        to_name: 'SHIM MIN JI', 
        to_email: 'yenycall817@gmail.com' 
    };

    emailjs.send('service_yenycall', 'template_yenycall', templateParams)
        .then(function (response) {
            alert('Message sent successfully!');


            document.getElementById('from_name').value = '';
            document.getElementById('from_email').value = '';
            document.getElementById('message').value = '';


            sendBtn.style.backgroundColor = 'black';
            sendBtn.textContent = 'SEND';
        }, function (error) {
            alert('Failed to send message. Please try again.');

            
            sendBtn.style.backgroundColor = 'black';
            sendBtn.textContent = 'SEND';
        });
}


//프로젝트 팝업


const popupOverlay = document.querySelector('.popup-overlay');
const popupContent = document.querySelector('.popup-content');
const closeButton = document.querySelector('.popup-close');


document.querySelectorAll('.projectC').forEach(project => {
    if (!project.classList.contains('project08')) { 
        project.addEventListener('click', () => {
            
            const title = project.querySelector('.pTitle').textContent;
            const team = project.querySelector('.pTeam').textContent;
            const image = project.querySelector('img').src;
            const date = project.querySelector('.projectDate').textContent;
            const about = project.querySelector('.projectAbout').innerHTML;
            const codeElements = project.querySelector('.projectCode').innerHTML;

            
            popupContent.querySelector('.popup-project-title').textContent = title;
            popupContent.querySelector('.popup-project-image').src = image;
            popupContent.querySelector('.popup-project-image').alt = title;
            popupContent.querySelector('.projectDate').textContent = date;
            popupContent.querySelector('.projectAbout').innerHTML = about;
            popupContent.querySelector('.projectCode').innerHTML = codeElements;

            
            const detailSection = project.querySelector('.project-detail');

      
            const projectLinks = detailSection?.querySelector('.detail-links');
            const popupLinks = popupContent.querySelector('.popup-project-links');
            if (projectLinks) {
                popupLinks.innerHTML = projectLinks.innerHTML;
                popupLinks.style.display = 'flex';
            } else {
                popupLinks.style.display = 'none';
            }

      
            const detailContent = popupContent.querySelector('.detail-section');
            if (detailSection) {
                const detailContentElement = detailSection.querySelector('.detail-content');
                if (detailContentElement) {
                    detailContent.innerHTML = detailContentElement.innerHTML;
                    detailContent.style.display = 'block';
                } else {
                    detailContent.style.display = 'none';
                }
            } else {
                detailContent.style.display = 'none';
            }

     
            popupOverlay.style.display = 'flex';
            document.body.classList.add('popup-open');

        });
    }
});



closeButton.addEventListener('click', closePopup);


popupOverlay.addEventListener('click', (e) => {
    if (e.target === popupOverlay) {
        closePopup();
    }
});


function closePopup() {
    popupOverlay.style.display = 'none';
    document.body.classList.remove('popup-open');
}


document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePopup();
    }
});