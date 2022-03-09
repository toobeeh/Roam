# TMDB: Roam

My take on a movie/series browsing website with third-party stream integration.  
All other platforms that i found were either using the same template or are just ugly and bloated.

**The big bonus on this is that it works with FireTV/AndroidTV**, which makes it incredibly more useful on streaming devices.  
~~Finally - free unbloated series just a click away on my FireTV :))~~ jk I pay subs for Netflix, Disney, Amazon, HBO, Adultswim and Sky of course

The two APIs used are the incredbly fun-to-work and full-featured TMDB.org API and the widely used video scraper embed service 2embed.ru, which is used to embed the movie/series.

## Usage
### On the PC
I host the current stable version on [my homeserver](https://roam.tobeh.host).  
### On the FireTV
In order to use it on FireTV (Browser won't work for arrow navigation!), download Amazon's Web-App-Tester and enter the URL there.  
Navigation works just comfortable with the remote.  
  
As soon as an episode / movie is selected and the player is opened, it's a bit hacky to start since it doesn't support the FireTV remote buttons.  
Keep holding the arrow-down button (a frame around the player should appear) and press the middle button.  
That's the part where without adblock an popup tries to open, just click the backbutton to abort.  
Now you can focus the play button with the arrow buttons and start/stop the stream or scroll forward/backwards.  
  
Eventualy, I'll build an package for Android some time, which may feature some optimizations on the video embed.
