/* Description: Custom JS file */
(function($) {
    "use strict";

    // =============================================
    // Navbar Scripts
    // =============================================

    // Collapse the navbar on scroll
    $(window).on('scroll load', function() {
        if ($(".navbar").offset().top > 60) {
            $(".fixed-top").addClass("top-nav-collapse");
        } else {
            $(".fixed-top").removeClass("top-nav-collapse");
        }
    });

    // Smooth scrolling for page navigation
    $(function() {
        $(document).on('click', 'a.page-scroll', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 600, 'easeInOutExpo');
            event.preventDefault();
        });
    });

    // Toggle offcanvas menu on small viewports
    $('[data-toggle="offcanvas"], .navbar-nav li a:not(.dropdown-toggle').on('click', function () {
        $('.offcanvas-collapse').toggleClass('open');
    });

    // Hover effect for dropdown menus in desktop mode
    function toggleDropdown(e) {
        const _d = $(e.target).closest('.dropdown'),
              _m = $('.dropdown-menu', _d);
        setTimeout(function(){
            const shouldOpen = e.type !== 'click' && _d.is(':hover');
            _m.toggleClass('show', shouldOpen);
            _d.toggleClass('show', shouldOpen);
            $('[data-toggle="dropdown"]', _d).attr('aria-expanded', shouldOpen);
        }, e.type === 'mouseleave' ? 300 : 0);
    }
    $('body')
        .on('mouseenter mouseleave', '.dropdown', toggleDropdown)
        .on('click', '.dropdown-menu a', toggleDropdown);

    // =============================================
    // Form Field Label Animation
    // =============================================

    // Move form field labels when user types
    $("input, textarea").keyup(function() {
        if ($(this).val() != '') {
            $(this).addClass('notEmpty');
        } else {
            $(this).removeClass('notEmpty');
        }
    });

    // =============================================
    // Service Cards Animation on Scroll
    // =============================================

    document.addEventListener("DOMContentLoaded", () => {
        const cards = document.querySelectorAll(".basic-2 .text-box");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.transform = "translateY(0)";
                        entry.target.style.opacity = "1";
                    }
                });
            },
            { threshold: 0.2 }
        );

        cards.forEach(card => observer.observe(card));
    });

    // =============================================
    // Project Filtering and View More Functionality
    // =============================================
    
    document.addEventListener('DOMContentLoaded', function () {
        const filterButtons = document.querySelectorAll('.filter-buttons .btn');
        const projectItems = document.querySelectorAll('.project-item');
        const viewMoreBtn = document.getElementById('view-more');
        const maxVisibleStep = 6;
        let activeFilter = 'all';
        let visibleCount = maxVisibleStep;
    
        // Helper: filter visible projects
        function getFilteredProjects() {
            return Array.from(projectItems).filter(item =>
                activeFilter === 'all' || item.getAttribute('data-category') === activeFilter
            );
        }
    
        // Update displayed projects based on visibleCount
        function updateProjects() {
            const filtered = getFilteredProjects();
    
            // Hide all projects first
            projectItems.forEach(item => {
                item.style.display = 'none';
                item.classList.add('hidden');
            });
    
            // Show only visibleCount items for the active filter
            filtered.forEach((item, index) => {
                if (index < visibleCount) {
                    item.style.display = 'block';
                    item.classList.remove('hidden');
                }
            });
    
            // Show/hide "View More" button
            if (visibleCount < filtered.length) {
                viewMoreBtn.style.display = 'inline-block';
                // Place the button after the last visible project
                const lastVisible = filtered[Math.min(visibleCount, filtered.length) - 1];
                if (lastVisible && lastVisible.parentNode) {
                    lastVisible.parentNode.insertBefore(viewMoreBtn, lastVisible.nextSibling);
                }
            } else {
                viewMoreBtn.style.display = 'none';
            }
        }
    
        // Function to filter projects based on category
        function filterProjects(category) {
            // Update active state of filter buttons
            filterButtons.forEach(btn => btn.classList.remove("active"));
            const activeButton = document.querySelector(`.filter-buttons .btn[data-filter="${category}"]`);
            if (activeButton) {
                activeButton.classList.add("active");
            }
    
            activeFilter = category;
            visibleCount = maxVisibleStep; // Reset to first 6
            updateProjects();
        }
    
        // Handle filter button clicks
        filterButtons.forEach(button => {
            button.addEventListener('click', function () {
                const filterValue = this.getAttribute('data-filter');
                filterProjects(filterValue);
            });
        });
    
        // Handle navbar dropdown item clicks
        document.querySelectorAll('.dropdown-menu a[data-filter]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const filterValue = this.getAttribute('data-filter');
                filterProjects(filterValue);
    
                // Scroll to projects section
                document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
    
                // Update URL without reloading the page
                history.pushState(null, null, `#projects?filter=${filterValue}`);
            });
        });
    
        // Handle click on the main "Projects" navbar button
        document.querySelectorAll('.nav-link.dropdown-toggle[href="#projects"]').forEach(link => {
            link.addEventListener('click', function(e) {
                // Only prevent default if it's not a mobile dropdown toggle
                if (!isMobile()) {
                    e.preventDefault();
                    filterProjects("all"); // Show all projects
                    // Scroll to projects section
                    document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
                    // Update URL without reloading the page
                    history.pushState(null, null, '#projects');
                }
            });
        });
    
        // Parse URL and filter projects on page load
        const urlParams = new URLSearchParams(window.location.search);
        const filterParam = urlParams.get("filter");
        if (filterParam) {
            filterProjects(filterParam);
        }
    
        // View More button click
        viewMoreBtn.addEventListener('click', function () {
            visibleCount += maxVisibleStep;
            updateProjects();
        });
    });
    

    // =============================================
    // Contact Form
    // =============================================

    document.getElementById("contactForm").addEventListener("submit", function(e) {
        e.preventDefault(); // Prevent default form submission
        // Get form values
        const name = document.getElementById("cname").value;
        const email = document.getElementById("cemail").value;
        const message = document.getElementById("cmessage").value;
        // Create mailto link
        const mailtoLink = `mailto:jdjatassiba@gmail.com?subject=${encodeURIComponent("Message from " + name)}&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message)}`;
        // Open default email client
        window.location.href = mailtoLink;
    });

    // =============================================
    // Back To Top Button
    // =============================================

    // Create the back to top button
    $('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
    var amountScrolled = 700;
    $(window).scroll(function() {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });

    // =============================================
    // Mobile Dropdown Handling
    // =============================================

    function isMobile() {
        return window.innerWidth <= 800; // or your breakpoint
    }

    const projectsLink = document.querySelector('.nav-link.dropdown-toggle');

    projectsLink.addEventListener('click', function (e) {
        if (isMobile()) {
            e.preventDefault(); // prevent scrolling
            // Toggle the dropdown menu manually
            const dropdownMenu = this.nextElementSibling;
            dropdownMenu.classList.toggle('show');
        }
    });

    // =============================================
    // Remove Long Focus On Buttons
    // =============================================

    $(".button, a, button").mouseup(function() {
        $(this).blur();
    });

})(jQuery);
