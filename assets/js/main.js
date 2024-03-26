(function () {

    // JS loaded
    let body = document.body;
    body
        .classList
        .add('js-loaded');

    let smWidth;
    screen.width < 992
        ? smWidth = true
        : smWidth = false;

    // Viewport Height
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    window.addEventListener("resize", () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    });


    // Toggle Menu
    const toggleMenu = (toggleID, toggleNav) => {
        let toggleLink = document.querySelector(toggleID),
            toggleItem = document.querySelector(toggleNav),
            headerLinks = document.querySelectorAll("#toggleNav a"),
            root = document.getElementsByTagName('html')[0];
        headerLinks.forEach(link => {
            link.onclick = (e) => {
                root
                    .classList
                    .remove('hide-scroll');
                toggleItem
                    .classList
                    .remove("active");
            }
        });
        if (toggleLink && toggleItem) {
            toggleLink.onclick = () => {
                if (toggleItem.classList.contains('active')) {
                    root
                        .classList
                        .remove('hide-scroll');
                    toggleItem
                        .classList
                        .remove("active");
                } else {
                    root
                        .classList
                        .add('hide-scroll');
                    toggleItem
                        .classList
                        .add("active");
                }
            }
        }
    }
    toggleMenu('#toggleBtn', '#toggleNav');

    // Show Tabs
    const showTabs = (tabLinkID, tabContentID) => {
        let tabLinks = document.querySelectorAll(tabLinkID),
            tabContent = document.querySelectorAll(tabContentID);

        if (tabLinks && tabContent) {
            const openTabs = el => {
                let selectedLink = el.currentTarget.classList,
                    showId = el.currentTarget.dataset.tab;

                tabLinks.forEach(el => {
                    el
                        .classList
                        .remove("active");
                });
                tabContent.forEach(el => {
                    el
                        .classList
                        .remove("active");
                });
                selectedLink.add("active");
                document
                    .querySelector("#" + showId)
                    .classList
                    .add("active");
            }
            tabLinks.forEach(el => {
                el.addEventListener("click", openTabs);
            });
        }
    }
    showTabs('[data-tab]', '.tab-content');
 
    
    // Show Collapse with Wrapper JS
    const showCollapseFunc = (collapseLinkID, collapseContentID, wrapperID) => {
        let collapseLinks = document.querySelectorAll(collapseLinkID),
            collapseContent = document.querySelectorAll(collapseContentID);

        if (collapseLinks && collapseContent && wrapperID) {
            const openCollapse = el => {
                let selectedLink = el.currentTarget,
                    showId = el.currentTarget.dataset.collapse,
                    currentCollapse = document.querySelector("#" + showId),
                    wrapperLinks = selectedLink
                        .closest(wrapperID)
                        .querySelectorAll(collapseLinkID),
                    wrapperCollpase = currentCollapse
                        .closest(wrapperID)
                        .querySelectorAll(collapseContentID);

                if (selectedLink.classList.contains('active')) {
                    selectedLink
                        .classList
                        .remove("active");
                    currentCollapse.style.height = '0px';
                    currentCollapse
                        .classList
                        .remove('active');
                } else {
                    wrapperLinks.forEach(el => {
                        el
                            .classList
                            .remove("active");
                    });

                    wrapperCollpase.forEach(el => {
                        el
                            .classList
                            .remove("active");
                        el.style.height = "0px";
                    });
                    selectedLink
                        .classList
                        .add("active");
                    currentCollapse.style.height = currentCollapse.scrollHeight + "px";
                    currentCollapse
                        .classList
                        .add('active');
                }
            }
            collapseLinks.forEach(el => {
                el.addEventListener("click", openCollapse);
            });
        }
    }
    showCollapseFunc('[data-collapse]', '.collapse', '[data-parent="collapse"]');

 

    // gsap animations
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    if (!smWidth) {
        ScrollSmoother.create({
            smooth: 0.5, // how long (in seconds) it takes to "catch up" to the native scroll position
            effects: true, // looks for data-speed and data-lag attributes on elements
        });
    }

    // Scroll To function
    const navLinks = document.querySelectorAll("[data-scroll]");
    if (navLinks.length > 0) {
        navLinks.forEach(navLink => {
            navLink.addEventListener("click", event => {
                event.preventDefault();
                const scrollToId = event.currentTarget.dataset.scroll;
                gsap.to(window, {
                    duration: 1,
                    scrollTo: `#${scrollToId}`,
                    ease: "Expo.easeInOut"
                });
            });
        });
    }

    // Line width code goes here
    // const revealImageX = document.querySelectorAll('.reveal-image-x');
    // if (revealImageX) {
    //     ScrollTrigger.batch(revealImageX, {
    //         onEnter: elements => {
    //             gsap.to(elements, {
    //                 "--height": 0,
    //                 stagger: 0.4,
    //                 ease: 'none',
    //                 delay: 0.5
    //             });
    //         },
    //         once: false
    //     });
    // }

    // Client Swiper
    const clientSwiper = document.querySelector("#clientSwiper");
    if (clientSwiper) {
        const swiper = new Swiper('#clientSwiper', {
            // Optional parameters
            slidesPerView: 2,
            spaceBetween: 12,
            grabCursor: true,
            slidesPerGroup: 2, 
            pagination: {
                el: "#clientSwiper .swiper-pagination",
            },
            breakpoints: {
                768: {
                    slidesPerView: 4,
                    spaceBetween: 12,
                    slidesPerGroup: 4, 
                },
                1025: {
                    slidesPerView: 5,
                    spaceBetween: 22.5,
                    slidesPerGroup: 5, 
                }
            },
        });
    }

     // Plan Swiper
     const planSwiper = document.querySelector("#planSwiper");
     if (planSwiper && screen.width < 768) {
         const swiper = new Swiper('#planSwiper', {
             // Optional parameters
             slidesPerView: 1,
             spaceBetween: 24,
             grabCursor: true,
             slidesPerGroup: 1, 
            //  autoHeight: true,
             pagination: {
                 el: "#planSwiper .swiper-pagination",
             }
         });
     }

     // Compare Swiper
     const compareSwiper = document.querySelector("#compareSwiper");
     if (compareSwiper && screen.width < 768) {
         const swiper = new Swiper('#compareSwiper', {
             // Optional parameters
             slidesPerView: 1,
             spaceBetween: 8,
             grabCursor: true,
             pagination: {
                 el: "#compareSwiper .swiper-pagination",
             }
         });
     }

      // Case Swiper
      const caseSwiper = document.querySelector("#caseSwiper");
      if (caseSwiper && screen.width < 768) {
          const swiper = new Swiper('#caseSwiper', {
              // Optional parameters
              slidesPerView: 1,
              spaceBetween: 24,
              grabCursor: true,
              pagination: {
                  el: "#caseSwiper .swiper-pagination",
              }
          });
      }

    startGsapAnimation();

    function startGsapAnimation() {
        // Animation Slide up
        const animationUp = document.querySelectorAll('.animate-up');
        if (animationUp) {
            // gsap.set(animationUp, { y: -100, autoAlpha: 0 });
            ScrollTrigger.batch(".animate-up", {
                onEnter: elements => {
                    gsap.to(elements, {
                        autoAlpha: 1,
                        y: 0,
                        stagger: 0.12
                    });
                },
                once: false
            });
        }

        // Animation Slide Down
        const animateDown = document.querySelectorAll('.animate-down');
        if (animateDown) {
            // gsap.set(animationUp, { y: -100, autoAlpha: 0 });
            ScrollTrigger.batch(".animate-down", {
                onEnter: elements => {
                    gsap.to(elements, {
                        autoAlpha: 1,
                        y: 0,
                        stagger: 0.12
                    });
                },
                once: false
            });
        }


        const animationFadeInOut = document.querySelectorAll('.animate-fadeInOut');
        if (animationFadeInOut) {
            gsap.registerPlugin(ScrollTrigger);
            animationFadeInOut.forEach(section => {
                let tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "center bottom",  
                        end: "bottom top",   
                        scrub: true,       
                        markers: false      
                    }
                });
                tl.fromTo(section, { autoAlpha: 0,  duration: 0.5 }, { autoAlpha: 1,  duration: 0.5 }).to(section, { autoAlpha: 0,  duration: 0.5 });
            });
        }


    }
  
    const gapAnimateCount = (count) => {
        var zero = { val: 0 },
            num = parseFloat(count.getAttribute('data-number')),
            split = (num + "").split("."),
            decimals = split.length > 1 ? split[1].length : 0;
    
      
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: count,
                start: "top bottom",  
                end: "bottom top",
                toggleActions: "restart pause resume pause",
                onEnter: () => { tl.restart(); },
                onLeaveBack: () => { tl.restart(); },
                markers: false,  
            },
            defaults: { duration: 6, ease: "Power4.out" },  
        });
    
        tl.to(zero, {
            val: num,
            onUpdate: function() {
                let updatedCount = zero.val.toFixed(decimals);
                count.innerHTML = updatedCount;
            }
        });
    }

    // counter animation
    let counts = document.querySelectorAll(".counts");
    if (counts) {
        counts.forEach(count => {
            gapAnimateCount(count);
        });
    }

    // Glue Button Animation
    const glueBtns = document.querySelectorAll('.btn-glue');
    if (glueBtns.length) {
        glueBtns.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const dx = x - rect.width / 2;
                const dy = y - rect.height / 2;

                gsap.to(button, {
                    duration: 0.4,
                    x: dx * 0.05,
                    y: dy * 0.1,
                    ease: "power2.out"
                });
            });

            button.addEventListener('mouseleave', () => {
                gsap.to(button, {
                    duration: 0.4,
                    x: 0,
                    y: 0,
                    ease: "power2.inOut"
                });
            });
        });
    }

  

})();