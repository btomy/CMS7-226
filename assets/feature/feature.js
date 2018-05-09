/**
* TITLE:
* @component: Advisernet Side Nav ( Sticky nav)
*
* AUTHOR:
* Citizens Advice: Front-end
*
* DESCRIPTION:
* Advisernet Sidenav with all related page links and H2
*
* README:
*
*
* API:
*
*
*/

'use strict';

var advisernetSidenav = (function () {

    var $stickySideNav = $('#sidebar');
    var $footerContent = $('#footer');
    var $stickySideNavList = $('.sidebar__menu--sub-heading');
    var $toggleButtonWrapper = $('.sidebar__menu-toggle-wrapper');
    var $accordionSubmenu = $('.sidebar__sub--menu');
    var $sideNavPageLinks = $('.sidebar__menu--sub-heading.expanded .sidebar__sub--menu li a');
    var $activeClass = 'active';
    var $pageLinkUrl = (window).location.href;
    var $bottomOfContent = $(window).scrollTop() + $(window).height() > $(document).height() - $('#footer').height();
    var $viewportHeight = $(window).innerHeight();

    var stickyNav = {
        detach(element) {
            element.removeClass('sticky scroll');
        },
        stick(element){
            element.addClass('sticky scroll');
        }
    }

    function setElementOuterWidth (elem) {
        $(elem).width($($stickySideNav).width());
    }

    function accordionWithChild() {
        $($stickySideNavList).has('ul').each(function() {
            $(this).addClass('children');
        });
    }

    function handleToggle (thisObj) {
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

    function stickySidebarTrigger() {
        var $el = $('.main-content'),
            scrollTop = $(this).scrollTop(),
            scrollBot = scrollTop + $(this).height(),
            elTop = $el.offset().top,
            elBottom = elTop + $el.outerHeight(),
            visibleTop = elTop < scrollTop ? scrollTop : elTop,
            visibleBottom = elBottom > scrollBot ? scrollBot : elBottom;
            var containerHeightVisible = visibleBottom - visibleTop;


        if( $(this).scrollTop() >= $('.main-content').offset().top ){
            stickyNav.stick($stickySideNav);
            console.log('Sticky');
        }else if( $(this).scrollTop() < $('.main-content').offset().top ){
            console.log("back to top");
            stickyNav.detach($stickySideNav);
        } 

        if($(window).scrollTop() + $(window).height() > $(document).height() - $('#footer').height()){
            console.log("near bottom" );
            $($stickySideNav).css({maxHeight:containerHeightVisible})
        }
       

        // if( $(window).width() < 750 ) {
        //     stickyNav.detach($stickySideNav);
        // }else{
        //     stickyNav.stick($stickySideNav);
        // }
    }

    function initialise() {

        setElementOuterWidth($stickySideNav);
        accordionWithChild();
        

        $($toggleButtonWrapper).on('click', function(e){
            handleToggle($(this));
        });

        $($sideNavPageLinks).each(function(){
            var ThisHref = ($(this).attr('href').split('#'))[1];
    
            if ($pageLinkUrl.indexOf(ThisHref) > -1) {
                $(this).parent().addClass($activeClass);
            }
        });

        $(window).on('scroll resize' ,stickySidebarTrigger);
        
    }

    return{
        render: initialise
    }

})();

advisernetSidenav.render(); 
