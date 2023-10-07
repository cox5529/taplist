# Taplist
[Public site](https://taplist.bscox.com)

Taplist is a website that shows what beers I have on tap. I enjoy homebrewing, but I often found myself having to explain what all the beers I have on tap are anytime I had anyone over. So, this somewhat solves that by allowing people to read up on what I have on their own.

This website is displayed as a non-interactive kiosk next to my beer taps. It also has an admin view that is locked behind authentication which is accessible by clicking on any of the beers on the homepage.

## How it Works
1. As I brew and ferment my beers, I will update their statuses in [Brewfather](https://brewfather.app/).
1. Periodically, the code in the `functions` directory will pull down the current batches from Brewfather and update Firestore with their details.
1. Once a beer has been kegged, I will mark which keg it is in on Taplist.
1. If I place the keg on top of a scale, I will also mark which scale it is on top of. I'm only able to fit two of the scales in my keezer at the moment.
1. Periodically, the kegs will send an update to a raspberry pi in my house with the current weight on top of them. I have rerouted the default domain the scales update to my raspberry pi's. This works because the scales only communicate over HTTP instead of HTTPS.
1. The code in the `api` directory will receive the signals sent by the scales and update Firestore with the current volume of the scale.

## Scales
The taplist also utilizes IoT keg scales to capture the amount of beer remaining in each keg. To capture this information, I exploited a security vulnerability in the scale firmware. The scales communicate over plain HTTP, which made a MITM attack trivial. The code that intercepts this data is in the `api` directory of this repo.


Inspiration: https://old.reddit.com/r/Homebrewing/comments/10j2geq/custom_digital_tap_list_live_pours_keg/
