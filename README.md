# CajunJews.com

Static website for **Jewish Resources of Acadiana** — congregations, cemeteries, history, and a community calendar for Lafayette and surrounding south Louisiana towns.

The live site is served by **GitHub Pages from the `main` branch root** (`https://cajunjews.com`, custom domain in `CNAME`). There is no build step.

## Files

| Path | Purpose |
| --- | --- |
| `index.html` | Homepage (hero, calendar, resource cards) |
| `history.html` | Timeline of Jewish history in Acadiana and further reading |
| `404.html` | Simple not-found page |
| `styles.css` | Site styles |
| `js/config.js` | Google Calendar ID (edit this) |
| `js/calendar.js` | Month grid + optional calendar embed |
| `assets/logo.png` | Header emblem (navy fleur-de-lis, gold Star of David) |
| `assets/hero.jpg` | Decorative hero illustration — not a photo of Temple Shalom |
| `assets/ATTRIBUTION.txt` | Notes on images |
| `CNAME` | Custom domain `cajunjews.com` — do not change |

## How to edit content

- **Congregations, cemeteries, contact details:** edit the lists in `index.html`.
- **History timeline and citations:** edit `history.html`.
- **Colors, fonts, layout:** `styles.css` (`--navy`, `--gold`, `--cream` at the top).
- **Site title / header:** the brand block in each HTML file.

Commit to `main` (or merge a pull request). Pages publishes from the repository root; allow a minute or two for the CDN to refresh.

## Google Calendar embed

The homepage always shows a styled month grid (today in navy; gold dots on Saturdays).

To show **live events** from a public Google Calendar:

1. In [Google Calendar](https://calendar.google.com), open **Settings** for the calendar you want to share.
2. Under **Access permissions for events**, enable **Make available to public**.
3. Under **Integrate calendar**, copy the **Calendar ID** (often `something@group.calendar.google.com`).
4. Open `js/config.js` and set:

   ```js
   window.CajunJewsConfig = {
     googleCalendarId: "YOUR_CALENDAR_ID_HERE",
     timeZone: "America/Chicago",
   };
   ```

5. Commit and push to `main`.

Leave `googleCalendarId` as `""` to keep the decorative grid only. The embed iframe is built as:

`https://calendar.google.com/calendar/embed?src=CALENDAR_ID&ctz=America/Chicago`

## Local preview

Any static server works. From this directory:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Design notes

- Navy `#0B1F3A`, gold/mustard accents, cream page background, white cards.
- Serif (`Playfair Display`) for the site title and card headings; sans (`Source Sans 3`) for body and the hero line.
- The history page is a dated timeline following the [ISJL Encyclopedia of Southern Jewish Communities](https://www.isjl.org/louisiana-lafayette-encyclopedia.html) and [Temple Shalom](https://www.templeshalomlala.org/history), and notes where those sources disagree (notably the 1869 vs. 1881 dating of Rodeph Sholom).
