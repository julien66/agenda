/**
 * @file
 * helper function for the calendar
 */
function returnTimes() {
  // Every 15 minutes from 00:00 to 24:00
  var times = [];
  var i = 6;
  var j = 0;
  for (i = 6; i <= 22; i++) {
    for (j = 0; j <= 45; j += 15) {
      times.push({
        hours : formatHours(i, j),
        start : j == 0 ? true : false,
        middle : j == 30 ? true : false,
        normal : (j !== 30 && j !== 0) ? true : false,
      });
    }
  }
  return times; 
}

function formatHours(i, j) {
  var H = n(i);
  var m = n(j);
  return H + ":" + m;
}


function n(n){
  return n > 9 ? "" + n: "0" + n;
}
