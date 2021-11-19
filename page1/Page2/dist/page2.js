$(document).ready(function(){
$('.flip-box .flip-box-inner').click(function() {
    $(this).closest('.flip-box').toggleClass('hover');
      // $(this).css('transform, rotateY(180deg)');
  });
});