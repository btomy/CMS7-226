// /**
// * TITLE:
// * @component: Advisernet Side Nav ( Sticky nav)
// *
// * AUTHOR:
// * Citizens Advice: Front-end
// *
// * DESCRIPTION:
// * Advisernet Sidenav with all related page links and H2
// *
// * README:
// *
// *
// * API:
// *
// *
// */

// 'use strict';

var advisernetSidenav = (function () {

    var $stickySideNav = $('#sidebar');
    var $footerContent = $('#footer');
    var $stickySideNavList = $('.sidebar__menu--sub-heading');
    var $toggleButtonWrapper = $('.sidebar__menu-toggle-wrapper');
    var $accordionSubmenu = $('.sidebar__sub--menu');
    var $sideNavPageLinks = $('.sidebar__menu--sub-heading.expanded .sidebar__sub--menu li a');
    var $activeClass = 'active';
    var $pageLinkUrl = (window).location.href;
    var $viewportHeight = $(window).innerHeight();

    var stickyNav = {
        detach: function (element) {
            element.removeClass('sticky scroll');
        },
        stick: function (element) {
            element.addClass('sticky scroll');
        }
    }

    function highlightNavItem(hash, selectedElement) {
        if ($pageLinkUrl.split('#')[1] === hash) {
            $($sideNavPageLinks).each(function () {
                $(this).parent().removeClass('active');
                var anchorUrl = $(this).attr('href').split('#')[1];

                if ($pageLinkUrl.indexOf(anchorUrl) > 1) {
                    $(this).parent().addClass('active');
                }
            });
        } else {
            $($sideNavPageLinks).each(function () {
                $(this).parent().removeClass('active');
            });

            $(selectedElement).parent().addClass('active');
        }
    }

    function setElementOuterWidth(elem) {
        $(elem).width($($stickySideNav).width());
    }

    function accordionWithChild() {
        $($stickySideNavList).has('ul').each(function () {
            $(this).addClass('children');
        });
    }

    function handleToggle(thisObj) {
        if (thisObj.parents($stickySideNavList).has('ul')) {
            thisObj.parents($stickySideNavList).toggleClass("expanded")
            thisObj.parents($stickySideNavList).children($accordionSubmenu).toggleClass("collapsed");

            if (thisObj.parents($stickySideNavList).hasClass('expanded')) {
                thisObj.parents().attr("aria-expanded", "true");
            } else {
                thisObj.parents().attr("aria-expanded", "false");
            }
        }
    }

    function getVisible() {
        var $el = $('.main-content'),
            scrollTop = $(this).scrollTop(),
            scrollBot = scrollTop + $(this).height(),
            elTop = $el.offset().top,
            elBottom = elTop + $el.outerHeight(),
            visibleTop = elTop < scrollTop ? scrollTop : elTop,
            visibleBottom = elBottom > scrollBot ? scrollBot : elBottom;

        var containerHeightVisible = visibleBottom - visibleTop;
        $($stickySideNav).css({ maxHeight: containerHeightVisible })
        //console.log("Visible bottom : ", containerHeightVisible);
    }

    function stickySidebarTrigger() {

        getVisible();
        if ($(this).scrollTop() >= $('.main-content').offset().top - 20 && $(window).width() > 750 ) { //
            setElementOuterWidth($stickySideNav);
            stickyNav.stick($stickySideNav);
            //console.log('Sticky');
        } else if ($(this).scrollTop() < $('.main-content').offset().top) {
            //console.log("back to top");
            stickyNav.detach($stickySideNav);
        }

        var distance = $('#footer').offset().top;

        $(window).scroll(function() {
            if ( $(window).scrollTop() >= distance ) {
                console.log("footer at top");
            }
        });

        if( $(window).width() < 1020 ) {
            document.getElementById("sidebar").style.width = null;
            console.log("reset style");
            if($(window).width() < 750) {
                console.log("reset style 750");                
                stickyNav.detach($stickySideNav);
                document.getElementById("sidebar").style.maxHeight = null;
            }
        } 
    }

    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    var myEfficientFn = debounce(function() {
        // All the taxing stuff you do
    }, 250);

    function initialise() {

        accordionWithChild();
        
        $($toggleButtonWrapper).on('click', function (e) {
            handleToggle($(this));
        });
        
        $(window).on('scroll resize', stickySidebarTrigger);
        
        $(window).on('load', function () {
            setElementOuterWidth($stickySideNav);
            highlightNavItem(window.location.href.split('#')[1])
        });

        $($sideNavPageLinks).on('click', function (event) {
            highlightNavItem($(this).attr('href').split('#')[1], $(this));
        });

    }

    return {
        render: initialise
    }

})();

advisernetSidenav.render();