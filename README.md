# Taplist
Public site: https://taplist.bscox.com

This is a website that shows what beers I have on tap. I enjoy homebrewing, but I often found myself having to explain what all the beers I have on tap are anytime I had anyone over. So, this somewhat solves that by allowing people to read up on what I have on their own.

This website is displayed as a non-interactive kiosk next to my beer taps. It also has an admin view that is locked behind authentication which is accessible by clicking on any of the beers on the homepage.

## Scales
The taplist also utilizes IoT keg scales to capture the amount of beer remaining in each keg. To capture this information, I exploited a security vulnerability in the scale firmware. The scales communicate over plain HTTP, which made a MITM attack trivial. The code that intercepts this data is in the `api` directory of this repo.


Inspiration: https://old.reddit.com/r/Homebrewing/comments/10j2geq/custom_digital_tap_list_live_pours_keg/
