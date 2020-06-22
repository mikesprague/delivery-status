# delivery-status

[![Known Vulnerabilities](https://snyk.io/test/github/mikesprague/delivery-status/badge.svg?targetFile=package.json)](https://snyk.io/test/github/mikesprague/clean-start?targetFile=package.json)

## Contents

- [About](#about)
- [Features](#features)
- [Build Instructions](#build-instructions)
- [Screenshots](#screenshots)
- [License](#license)

## About

Chrome extension that reloads tracking pages every 5 minutes and changes the favicon and title on tracking pages to indicate current delivery status.
Makes it possible to visually grep delivery status while using other browser tabs (see screenshots).

Currently works with US versions of FedEx, LaserShip, UPS, and USPS tracking pages.

NOTE: This extension will also send a notification upon delivery. You will be asked for permission to reveive notifications on your first visit to each
tracking site after installing/enabling this extension. It will appear as if you're being asked for permission to receive notfications from the source website
(e.g. tools.usps.com) but it is for this extension. If you choose to ignore or decline notification permission, the extension will otherwise function normally.

## Features

- Extension waits 5 seconds to begin as some of the tracking pages render after loading
- Reloads window every 5 minutes to check for tracking status updates until delivered
  - Adds overlay to bottom right with time left until window reload and current delivery status
- Updates favicon/website title to indicate delivery status (original title remains intact following delivery status) for
  - In Transit
  - Out for Delivery
  - Delivered
- Sends browser notification indicating package was delivered

## Build Instructions

- Install dependencies `npm install`
- Build extension `npm run build`
  - Creates a `/public` folder with the extension files to run unpacked
  - Creates an `/public/extension.zip` file for submitting

## License

MIT License

Copyright (c) 2020 Michael Sprague

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
