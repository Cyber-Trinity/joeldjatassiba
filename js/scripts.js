/* Description: Custom JS file */


(function($) {
    "use strict"; 
	
    /* Navbar Scripts */
    // jQuery to collapse the navbar on scroll
    $(window).on('scroll load', function() {
		if ($(".navbar").offset().top > 60) {
			$(".fixed-top").addClass("top-nav-collapse");
		} else {
			$(".fixed-top").removeClass("top-nav-collapse");
		}
    });
    
	// jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function() {
		$(document).on('click', 'a.page-scroll', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 600, 'easeInOutExpo');
			event.preventDefault();
		});
    });

    // offcanvas script from Bootstrap + added element to close menu on click in small viewport
    $('[data-toggle="offcanvas"], .navbar-nav li a:not(.dropdown-toggle').on('click', function () {
        $('.offcanvas-collapse').toggleClass('open')
    })

    // hover in desktop mode
    function toggleDropdown (e) {
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
    .on('mouseenter mouseleave','.dropdown',toggleDropdown)
    .on('click', '.dropdown-menu a', toggleDropdown);


    /* Move Form Fields Label When User Types */
    // for input and textarea fields
    $("input, textarea").keyup(function(){
		if ($(this).val() != '') {
			$(this).addClass('notEmpty');
		} else {
			$(this).removeClass('notEmpty');
		}
	});
	
    // Animate service cards on scroll
    document.addEventListener("DOMContentLoaded", () => {
        const cards = document.querySelectorAll(".basic-2 .text-box");
    
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if(entry.isIntersecting){
                        entry.target.style.transform = "translateY(0)";
                        entry.target.style.opacity = "1";
                    }
                });
            },
            { threshold: 0.2 }
        );
    
        cards.forEach(card => observer.observe(card));
    });

    document.addEventListener("DOMContentLoaded", function() {
    const filterButtons = document.querySelectorAll(".filter-buttons .btn");
    const projectItems = document.querySelectorAll(".project-item");

    // Function to filter projects
    function filterProjects(category) {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        const activeButton = document.querySelector(`.filter-buttons .btn[data-filter="${category}"]`);
        if (activeButton) {
            activeButton.classList.add("active");
        }

        projectItems.forEach(item => {
            if (category === "all" || item.getAttribute("data-category") === category) {
                item.classList.remove("hidden");
            } else {
                item.classList.add("hidden");
            }
        });
    }

    // Handle button clicks
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filterValue = button.getAttribute("data-filter");
            filterProjects(filterValue);
        });
    });

    // Parse URL and filter projects on page load
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get("filter");

    if (filterParam) {
        filterProjects(filterParam);
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const filterButtons = document.querySelectorAll(".filter-buttons .btn");
    const projectItems = document.querySelectorAll(".project-item");

    // Function to filter projects
    function filterProjects(category) {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        const activeButton = document.querySelector(`.filter-buttons .btn[data-filter="${category}"]`);
        if (activeButton) {
            activeButton.classList.add("active");
        }

        projectItems.forEach(item => {
            if (category === "all" || item.getAttribute("data-category") === category) {
                item.classList.remove("hidden");
            } else {
                item.classList.add("hidden");
            }
        });
    }

    // Handle button clicks
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filterValue = button.getAttribute("data-filter");
            filterProjects(filterValue);
        });
    });

    // Parse URL and filter projects on page load
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get("filter");

    if (filterParam) {
        filterProjects(filterParam);
    }

    // Handle click events on navbar links
    document.querySelectorAll('a[href^="#projects"]').forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const href = this.getAttribute("href");
            const [hash, query] = href.split("?");
            const section = document.querySelector(hash);
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }

            // Parse the filter parameter from the link
            const params = new URLSearchParams(query);
            const filterValue = params.get("filter");
            if (filterValue) {
                history.pushState(null, null, href);
                filterProjects(filterValue);
            } else {
                history.pushState(null, null, hash);
                filterProjects("all");
            }
        });
    });
});



  
    // Project Filtering
    document.addEventListener("DOMContentLoaded", function() {
        const filterButtons = document.querySelectorAll(".filter-buttons .btn");
        const projectItems = document.querySelectorAll(".project-item");
    
        filterButtons.forEach(button => {
            button.addEventListener("click", () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove("active"));
                // Add active class to clicked button
                button.classList.add("active");
    
                const filterValue = button.getAttribute("data-filter");
    
                projectItems.forEach(item => {
                    if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
                        item.classList.remove("hidden");
                    } else {
                        item.classList.add("hidden");
                    }
                });
            });
        });
    });

    // View more button functionality
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
    
        // Category button click
        filterButtons.forEach(button => {
            button.addEventListener('click', function () {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                activeFilter = this.getAttribute('data-filter');
                visibleCount = maxVisibleStep; // Reset to first 6
                updateProjects();
            });
        });
    
        // View More button click
        viewMoreBtn.addEventListener('click', function () {
            visibleCount += maxVisibleStep;
            updateProjects();
        });
    
        // Initialize first load
        updateProjects();
    });
    
    

    // Contact Form - Open user's email client with prefilled message
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

    /* Back To Top Button */
    // create the back to top button
    $('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
    var amountScrolled = 700;
    $(window).scroll(function() {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });

    // Disable project to scroll on mobile when clicking the Projects link
    function isMobile() {
        return window.innerWidth <= 800; // or your breakpoint
      }
      
      const projectsLink = document.querySelector('.nav-link.dropdown-toggle');
      
      projectsLink.addEventListener('click', function (e) {
        if (isMobile()) {
          e.preventDefault(); // prevent scrolling
          // toggle the dropdown menu manually
          const dropdownMenu = this.nextElementSibling;
          dropdownMenu.classList.toggle('show');
        }
      });
      

	/* Removes Long Focus On Buttons */
	$(".button, a, button").mouseup(function() {
		$(this).blur();
	});

})(jQuery);