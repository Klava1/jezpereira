## Audio for the background player

Drop one MP3 here named `mix.mp3` and the player on every page will pick it up.

You can change the filename — just update the `data-src` attribute on the `<aside class="player">` element in each HTML file.

The track name shown next to the player is currently set to "Lost in Musyck · Vol. 01" — edit the `<span class="player-track">` text in each HTML file to change it.

## Notes
- The player does NOT autoplay (browsers block this).
- The user clicks the triangle to start the music — by design.
- The player loops the track indefinitely.
- Volume is set to 55% on first play; can be adjusted in main.js if needed.
