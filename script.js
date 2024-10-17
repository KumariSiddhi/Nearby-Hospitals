document.addEventListener('DOMContentLoaded', () => {
    const locateBtn = document.getElementById('locate-btn');
    const resultDiv = document.getElementById('result');

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    locateBtn.addEventListener('click', findNearbyHospitals);

    function findNearbyHospitals() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    
                    resultDiv.innerHTML = `
                        <p>Your location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}</p>
                        <p>Nearby hospitals:</p>
                        <ul>
                            <li>City General Hospital (0.5 miles)</li>
                            <li>St. Mary's Medical Center (1.2 miles)</li>
                            <li>University Hospital (2.3 miles)</li>
                        </ul>
                    `;
                },
                (error) => {
                    resultDiv.textContent = `Error: ${error.message}`;
                }
            );
        } else {
            resultDiv.textContent = 'Geolocation is not supported by your browser.';
        }
    }

    // Animate services on scroll
    const services = document.querySelectorAll('.service-item');
    const testimonials = document.querySelectorAll('.testimonial');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    services.forEach(service => {
        service.style.opacity = 0;
        service.style.transform = 'translateY(20px)';
        service.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(service);
    });

    testimonials.forEach(testimonial => {
        testimonial.style.opacity = 0;
        testimonial.style.transform = 'translateY(20px)';
        testimonial.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(testimonial);
    });
});