(function () {
  "use strict";

  var WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var WEEKDAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  function buildMonthGrid(container, now) {
    var year = now.getFullYear();
    var month = now.getMonth();
    var todayDate = now.getDate();
    var first = new Date(year, month, 1);
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var startWeekday = first.getDay();

    var table = document.createElement("table");
    table.className = "cal-grid";
    table.setAttribute("role", "grid");
    table.setAttribute("aria-labelledby", "calendar-heading");

    var caption = document.createElement("caption");
    caption.className = "visually-hidden";
    caption.textContent = MONTHS[month] + " " + year + " community calendar";
    table.appendChild(caption);

    var thead = document.createElement("thead");
    var headRow = document.createElement("tr");
    WEEKDAYS_SHORT.forEach(function (name, i) {
      var th = document.createElement("th");
      th.scope = "col";
      th.setAttribute("aria-label", WEEKDAYS[i]);
      th.innerHTML =
        '<span class="cal-day-full">' + name + "</span>" +
        '<span class="cal-day-short">' + name.charAt(0) + "</span>";
      headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);

    var tbody = document.createElement("tbody");
    var totalCells = Math.ceil((startWeekday + daysInMonth) / 7) * 7;

    for (var i = 0; i < totalCells; i++) {
      if (i % 7 === 0) {
        var row = document.createElement("tr");
        tbody.appendChild(row);
      }
      var cell = document.createElement("td");
      var cellDay = i - startWeekday + 1;

      if (cellDay >= 1 && cellDay <= daysInMonth) {
        var isToday = cellDay === todayDate;
        var weekday = i % 7;
        cell.className = "cal-day";
        if (isToday) cell.classList.add("is-today");
        if (weekday === 6) cell.classList.add("is-shabbat");

        var num = document.createElement("span");
        num.className = "cal-num";
        num.textContent = String(cellDay);
        cell.appendChild(num);

        if (weekday === 6) {
          var dots = document.createElement("span");
          dots.className = "cal-dots";
          dots.setAttribute("aria-hidden", "true");
          dots.innerHTML = "<i></i><i></i><i></i>";
          cell.appendChild(dots);
          cell.title = "Shabbat";
        }

        cell.setAttribute(
          "aria-label",
          WEEKDAYS[weekday] + ", " + MONTHS[month] + " " + cellDay +
            (isToday ? ", today" : "") +
            (weekday === 6 ? ", Shabbat" : "")
        );
      } else {
        cell.className = "cal-empty";
        cell.setAttribute("aria-hidden", "true");
      }

      tbody.lastChild.appendChild(cell);
    }

    table.appendChild(tbody);
    container.replaceChildren(table);

    var label = document.getElementById("calendar-month-label");
    if (label) label.textContent = MONTHS[month] + " " + year;
  }

  function calendarEmbedUrl(calendarId, timeZone) {
    var src = encodeURIComponent(calendarId);
    var tz = encodeURIComponent(timeZone || "America/Chicago");
    return (
      "https://calendar.google.com/calendar/embed?src=" + src +
      "&ctz=" + tz +
      "&showTitle=0&showPrint=0&showTabs=1&showCalendars=0&showTz=0&wkst=1"
    );
  }

  function setupEmbed() {
    var config = window.CajunJewsConfig || {};
    var calendarId = (config.googleCalendarId || "").trim();
    var wrap = document.getElementById("calendar-embed");
    var frame = document.getElementById("calendar-iframe");
    var note = document.getElementById("calendar-placeholder-note");
    if (!wrap || !frame) return;

    if (!calendarId || calendarId === "PLACEHOLDER_CALENDAR_ID") {
      wrap.hidden = true;
      frame.removeAttribute("src");
      if (note) note.hidden = false;
      return;
    }

    frame.src = calendarEmbedUrl(calendarId, config.timeZone);
    frame.title = "Community events from Google Calendar";
    wrap.hidden = false;
    if (note) note.hidden = true;
  }

  function init() {
    var grid = document.getElementById("calendar-grid");
    if (grid) buildMonthGrid(grid, new Date());
    setupEmbed();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
