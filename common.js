
    const toggleButton = document.getElementById('dark-mode');
    const currentMode = localStorage.getItem('theme');

    // 페이지 로드 시 다크모드 확인
    if (currentMode === 'dark') {
    document.body.classList.add('dark-mode');
}

    toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});




    //email send

    // EmailJS 초기화
    emailjs.init("2ci2afRgN8F_MpF3O"); // EmailJS에서 받은 public key를 넣으세요

    function sendEmail() {
        // 입력값 가져오기
        const fromName = document.getElementById('from_name').value;
        const fromEmail = document.getElementById('from_email').value;
        const message = document.getElementById('message').value;

        // 입력값 검증
        if (!fromName || !fromEmail || !message) {
            alert('Please fill in all fields');
            return;
        }

        // 보내기 버튼 비활성화
        const sendBtn = document.getElementById('sendBtn');
        sendBtn.style.backgroundColor = 'var(--blue)';
        sendBtn.textContent = 'SEND..';

        // 이메일 전송
        const templateParams = {
            from_name: fromName,
            from_email: fromEmail,
            message: message,
            to_name: 'SHIM MIN JI', // 수신자 이름
            to_email: 'yenycall817@gmail.com' // 수신자 이메일
        };

        emailjs.send('service_yenycall', 'template_yenycall', templateParams)
            .then(function(response) {
                alert('Message sent successfully!');

                // 폼 초기화
                document.getElementById('from_name').value = '';
                document.getElementById('from_email').value = '';
                document.getElementById('message').value = '';

                // 버튼 상태 복구
                sendBtn.style.backgroundColor = 'black';
                sendBtn.textContent = 'SEND';
            }, function(error) {
                alert('Failed to send message. Please try again.');

                // 버튼 상태 복구
                sendBtn.style.backgroundColor = 'black';
                sendBtn.textContent = 'SEND';
            });
    }


    //프로젝트 팝업

    // Get popup elements
    const popupOverlay = document.querySelector('.popup-overlay');
    const popupContent = document.querySelector('.popup-content');
    const closeButton = document.querySelector('.popup-close');

    // Add event listeners to project containers
    document.querySelectorAll('.projectC').forEach(project => {
        if (!project.classList.contains('project08')) { // Exclude the "In Progress" project
            project.addEventListener('click', () => {
                // Get project details
                const title = project.querySelector('.pTitle').textContent;
                const team = project.querySelector('.pTeam').textContent;
                const image = project.querySelector('img').src;
                const date = project.querySelector('.projectDate').textContent;
                const about = project.querySelector('.projectAbout').innerHTML;
                const codeElements = project.querySelector('.projectCode').innerHTML;

                // Populate popup content
                popupContent.querySelector('.popup-project-title').textContent = title;
                popupContent.querySelector('.popup-project-image').src = image;
                popupContent.querySelector('.popup-project-image').alt = title;
                popupContent.querySelector('.projectDate').textContent = date;
                popupContent.querySelector('.projectAbout').innerHTML = about;
                popupContent.querySelector('.projectCode').innerHTML = codeElements;

                // 상세 정보 가져오기 (있는 경우에만)
                const detailSection = project.querySelector('.project-detail');

                // 링크 처리
                const projectLinks = detailSection?.querySelector('.detail-links');
                const popupLinks = popupContent.querySelector('.popup-project-links');
                if (projectLinks) {
                    popupLinks.innerHTML = projectLinks.innerHTML;
                    popupLinks.style.display = 'flex';
                } else {
                    popupLinks.style.display = 'none';
                }

                // 상세 내용 처리
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

                // 팝업 표시
                popupOverlay.style.display = 'flex';
                document.body.classList.add('popup-open');

            });
        }
    });


    // Close popup when clicking the close button
    closeButton.addEventListener('click', closePopup);

    // Close popup when clicking outside
    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            closePopup();
        }
    });

    // Close popup function
    function closePopup() {
        popupOverlay.style.display = 'none';
        document.body.classList.remove('popup-open');
    }

    // Close popup with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePopup();
        }
    });