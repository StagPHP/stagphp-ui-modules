var stagRippleRedirect;

function link_redirect(ele){
  var href = ele.attr('href');

  // Checking condition that button has href attribute
  if(href) {
    clearTimeout(stagRippleRedirect);

    // Doc Link
    if(href && null != href.match(/^(\#)/g)) {
      var hash = ele.prop("hash");
      var target = $(hash);

      console.log('Hash Link Found');
    
      stagRippleRedirect = setTimeout(function(){
        // Scroll Page
        $('html, body').stop().animate({
          'scrollTop': target.offset().top - 50
        }, 500, 'swing', function() {
          if(history.pushState) history.pushState(null, null, target);
          else window.location.hash = target;
        });
      }, 500);
    }
    
    // External Link
    else if(ele[0].hasAttribute('target') && '_blank' == ele.attr('target')){
      console.log('External Link Found With _blank attribute');

      stagRippleRedirect = setTimeout(function() {
        window.open(href, '_blank');
      }, 600);
    }
    
    // Internal Link
    else {
      if(ele.hasClass('barba-link')){
        console.log('Barba Internal Link Found');

        barba.go(href);
      } else {
        console.log('Simple Internal Link Found');

        stagRippleRedirect = setTimeout(function() {
          window.location.href = href;
        }, 500);
      }
    }
  }
}

function ripple_effect() {
  $('.wuui-ripple').on('click', function(event){
    event.preventDefault();
    event.stopPropagation();

    // Ripple Element
    var ele = $(this);

    // Max Length
    var maxLength = Math.max(ele.outerWidth(), ele.outerHeight()).toFixed(2);

    // Click position of X and Y
    var clickPosX = event.pageX - ele.offset().left;
    var clickPosY = event.pageY - ele.offset().top;

    // Calculate time
    var rippleTime = ((maxLength / 100) - (maxLength / 400)).toFixed(2);

    if (ele.children(".wuui-mat-ink").length > 0)
    ele.children(".wuui-mat-ink").remove();
    
    ele.append("<span class='wuui-mat-ink'><span></span></span>");
    var ink = ele.children(".wuui-mat-ink");

    ink.removeClass("animate").children("span").css({
      'height':                     (maxLength * 2) + 'px',
      'width':                      (maxLength * 2) + 'px',
      'top':                        (clickPosY - maxLength) + 'px',
      'left':                       (clickPosX - maxLength) + 'px',
      '-webkit-animation-duration': rippleTime + 's',
      'animation-duration':         rippleTime + 's',
    })
    
    ink.addClass("animate").children("span").one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function (){
      ink.remove();
    });

    link_redirect(ele);
  });
}