$(document).ready(function(){
	$("#projectsLink").addClass("chosen");

	$('#bottomText span').prepend("© " + (new Date).getFullYear());
	
	// Content loading function
	function loadContent(page) {
		const mainArea = $('#mainArea');
		const loader = $('#contentLoader');
		const contentContainer = $('#contentContainer');
		
		// Show loading state
		loader.addClass('loading').text('Loading...');
		mainArea.addClass('loading-content');
		
		// Fetch and load the content
		fetch(page + '.html')
			.then(response => {
				if (!response.ok) throw new Error('Page not found');
				return response.text();
			})
			.then(html => {
				const parser = new DOMParser();
				const doc = parser.parseFromString(html, 'text/html');
				const bodyHtml = doc.body ? doc.body.innerHTML : html;
				const scriptSrcs = Array.from(doc.querySelectorAll('script[src]'))
					.map(script => script.getAttribute('src'))
					.filter(src => src && !src.includes('jquery') && !src.includes('bootstrap') && !src.includes('script.js'));

				// Hide loader and show content with fade effect
				loader.removeClass('loading');
				contentContainer.html(bodyHtml);
				mainArea.removeClass('loading-content');

				// Load page-specific scripts (if any)
				$('script[data-dynamic-page]').remove();
				scriptSrcs.forEach(src => {
					const script = document.createElement('script');
					script.src = src;
					script.setAttribute('data-dynamic-page', 'true');
					document.body.appendChild(script);
				});
				
				// Scroll to top instantly
				mainArea.scrollTop(0);
			})
			.catch(error => {
				console.error('Error loading content:', error);
				loader.removeClass('loading').html('<div class="error-message">Failed to load content</div>');
				contentContainer.empty();
			});
	}
	
	// Handle hash changes (browser back/forward)
	function handleHashChange() {
		let hash = window.location.hash.substring(1); // Remove #
		if (!hash) hash = 'projects'; // Default page
		
		// Update active link
		$("#projectsLink").removeClass("chosen");
		$("a").removeClass("chosen");
		
		const linkId = hash + 'Link';
		if ($('#' + linkId).length) {
			$('#' + linkId).addClass("chosen");
		} else if ($('#' + hash).length) {
			$('#' + hash).addClass("chosen");
		} else {
			$("#projectsLink").addClass("chosen");
		}
		
		// Load the content
		loadContent(hash);
	}
	
	// Handle navigation clicks
    $("a[href^='#']").click(function(e){
		e.preventDefault();
		const hash = $(this).attr('href').substring(1);
		
		// Update URL hash (triggers hashchange event)
		window.location.hash = hash;
		
		// Handle special case for myName link
		if ($(this).attr("id") == "myNameLink"){
			$(this).removeClass("chosen");
			$("#projectsLink").addClass("chosen");
		} else {
			$("#projectsLink").removeClass("chosen");
			$("a").removeClass("chosen");
			$(this).addClass("chosen");
		}
		
		// Close mobile menu on link click (if on mobile)
		if (window.innerWidth < 768) {
			$("#bar").removeClass("mobile-nav-open");
			$("#mobileOverlay").removeClass("active");
			$("body").css("overflow", "");
		}
    });

	// Handle internal links inside loaded content
	$('#contentContainer').on('click', 'a[href$=".html"]', function(e){
		const href = $(this).attr('href');
		if (!href || href.startsWith('http') || href.startsWith('//')) return;
		e.preventDefault();
		const page = href.replace('.html', '');
		window.location.hash = page;
	});
	
	// Listen for hash changes (back/forward buttons)
	$(window).on('hashchange', handleHashChange);
	
	// Load initial content
	handleHashChange();

	// Mobile menu toggle
	$("#menuToggle").click(function(){
		$("#bar").toggleClass("mobile-nav-open");
		$("#mobileOverlay").toggleClass("active");
		
		// Prevent body scroll when menu is open
		if ($("#bar").hasClass("mobile-nav-open")) {
			$("body").css("overflow", "hidden");
		} else {
			$("body").css("overflow", "");
		}
	});

	// Close menu when clicking outside on mobile (overlay)
	$("#mobileOverlay").click(function() {
		$("#bar").removeClass("mobile-nav-open");
		$("#mobileOverlay").removeClass("active");
		$("body").css("overflow", "");
	});

	// Close menu when clicking outside on mobile
	$(document).click(function(event) {
		if (window.innerWidth < 768) {
			if (!$(event.target).closest('#bar, #menuToggle').length) {
				$("#bar").removeClass("mobile-nav-open");
				$("#mobileOverlay").removeClass("active");
				$("body").css("overflow", "");
			}
		}
	});

});
