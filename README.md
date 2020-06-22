# delivery-status

Chrome extension that reloads tracking pages every 5 minutes and changes the favicon to indicate "delivered" status.

Currently works with US versions of FedEx, LaserShip, UPS, and USPS tracking pages.

[![Known Vulnerabilities](https://snyk.io/test/github/mikesprague/delivery-status/badge.svg?targetFile=package.json)](https://snyk.io/test/github/mikesprague/clean-start?targetFile=package.json)

## Build Instructions

- Install dependencies `npm install`
- Build extension `npm run build`
  - Creates a `./public` folder with the extension files to run unpacked
  - Creates an `./public/extension.zip` file for submitting
