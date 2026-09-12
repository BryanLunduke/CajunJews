/**
 * CajunJews.com site configuration
 *
 * Google Calendar embed
 * ---------------------
 * 1. Open Google Calendar → Settings for the calendar you want to share.
 * 2. Under "Access permissions for events", check "Make available to public".
 * 3. Under "Integrate calendar", copy the Calendar ID
 *    (often something like abc123@group.calendar.google.com).
 * 4. Paste that ID as googleCalendarId below.
 * 5. Commit and push; GitHub Pages will pick up the change from the main branch root.
 *
 * Leave googleCalendarId as an empty string to keep only the decorative month grid.
 * A public Google Calendar ID is required for the iframe embed to load events.
 */
window.CajunJewsConfig = {
  googleCalendarId: "",
  timeZone: "America/Chicago",
};
