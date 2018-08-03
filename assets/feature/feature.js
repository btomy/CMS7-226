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
    var $pageLinkUrl = (window).location.href;
    var $mobileNav = $('.sidebar__menu--heading_mobile');
    var $viewportHeight = $(window).innerHeight();
    var $sidebarToggleButton = $('.sidebar__menu-toggle');

    var stickyNav = {
        detach: function (element) {
            element.removeClass('sticky scroll');
        },
        stick: function (element) {
            element.addClass('sticky scroll');
        }
    }

    function highlightNavItem(hash, selectedElement) { //hightliting h2 within a list in the nav
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

    function setElementOuterWidth(elem) { //setting element width, so this takes the css width, converts it to pixels and apply it to sidenav. As for position fixed you need pixel values
        $(elem).width($($stickySideNav).width());
    }

    function accordionWithChild() {
        $($stickySideNavList).has('ul').each(function () {
            $(this).addClass('children');
        });
    }

    function handleToggle(thisObj) { //opening and closing of the accordion
        // thisObj = .sidebar__menu-toggle-wrapper
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

    function getVisible() { //calculating how much is visible when scrolling and apply the value as a max height to the sidenav.
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

    function stickySidebarTrigger() { // this is triggered all the time for scroll and resize.

        getVisible();
        if ($(this).scrollTop() >= $('.main-content').offset().top && $(window).width() > 750) { // sticky nav gets applied if the .main-content is near the viewport
            setElementOuterWidth($stickySideNav);
            stickyNav.stick($stickySideNav);
        } else if ($(this).scrollTop() < $('.main-content').offset().top) { //detach the nav when its back to the top of page
            stickyNav.detach($stickySideNav);
        }

        var distance = $('#footer').offset().top - 40;
        if ($(window).scrollTop() >= distance) {
            document.getElementById("sidebar").style.maxHeight = 0;
        }

        if ($(window).width() < 1020) {
            document.getElementById("sidebar").style.width = null;
            var sideBarwidth = document.getElementById('sidebar').offsetWidth;

            if($($stickySideNav).has('sticky')){
                console.log("hello worls");
            }

            console.log(sideBarwidth);
            if ($(window).width() < 750) {
                stickyNav.detach($stickySideNav);
                document.getElementById("sidebar").style.maxHeight = null;
            }
        }
    }

    function centerElement (container, target, testing) {
        var $container = $(container);
        var $target    = $(target);

        var containerHeight   = $container.height();
        var targetOuterHeight = $target.outerHeight(true);
        var targetIndex       = $target.index();
        var items             = $('.sidebar__menu--list').find('> li');
        var headingHeight     = $('.sidebar__menu h2:nth-child(2)').outerHeight(true);
        var scrollValue       = 0;

        for (var i = 0; i < targetIndex; i++) {
          scrollValue += $(items[i]).outerHeight(true);
        }

        $container.scrollTop(
          Math.max(0, scrollValue - ((containerHeight - targetOuterHeight) - (headingHeight * 2)) / 2)
        );
    }

    function initialise() {

        accordionWithChild();

        // event handler
        $($sidebarToggleButton).on('click', function () {
            handleToggle($(this).parent());
        })

        $($mobileNav).on('click', function (e) {
            $('.sidebar__menu h2:nth-child(2)').toggle();
            $('.sidebar__menu--heading_mobile').toggleClass("expanded");
            $('.sidebar__menu--list').toggle();
        });

        $(window).on('scroll resize', stickySidebarTrigger);

        $(window).on('load', function () {
            setElementOuterWidth($stickySideNav);
            highlightNavItem(window.location.href.split('#')[1]);

            if ($(window).width() > 750) {
              centerElement('.sidebar__menu', '.active');
            }
        });

        $($sideNavPageLinks).on('click', function (event) {
            highlightNavItem($(this).attr('href').split('#')[1], $(this));
        });

    }

    return {
        render: initialise
    }

})();

if ($('#sidebar.sidebar__menu').length > 0) {
    advisernetSidenav.render();
}