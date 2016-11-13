/**
 * @file
 * Resa views for the calendar.
 */
define(['jquery', "stache!templates/resa"], function($, resa) {
  
  function targetToPosition(start, end) {
    var startOffset = start.e.offset();
    var endOffset = end.e.offset();
    var height = (endOffset.top + end.e.height()) - startOffset.top;
    return {
      left : startOffset.left,
      top : startOffset.top,
      width : (endOffset.left + end.e.width()) - startOffset.left,
      height : height,
    }
  }

  function createBox(id, groupe) {
    $("body").append(resa({
      id : id,
      groupe : groupe.name,
      class : 'solid',
    }));
    $("#" + id + " .cell").css({
      'background-color' : groupe.color,
    })
  }

  function updateBox(mode, param) {
    switch (mode) {
      case 'week' :
        var position = targetToPosition(param.start, param.end);
        $("#" + param.id).css(position);
      break;
    }
  }

  return {
    targetToPosition : targetToPosition,
    createBox : createBox,
    updateBox : updateBox,
  }
});
