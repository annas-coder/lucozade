
document.addEventListener('DOMContentLoaded', function() {
    // Tab Switching Logic
    const tabBtns = document.querySelectorAll('.faq-tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Accordion Toggle Logic
    const accordionQuestions = document.querySelectorAll('.faq-question');

    accordionQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            
            // Optional: Close other items in the same tab
            /*
            const items = item.parentElement.querySelectorAll('.faq-item');
            items.forEach(i => {
                if (i !== item) i.classList.remove('active');
            });
            */

            item.classList.toggle('active');
        });
    });
});
