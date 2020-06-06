export const appConfig = {
  favicons: {
    delivered: 'https://raw.githubusercontent.com/mikesprague/delivery-status/master/src/images/delivered.png',
    inTransit: 'https://raw.githubusercontent.com/mikesprague/delivery-status/master/src/images/in-transit.png',
    outForDelivery: 'https://raw.githubusercontent.com/mikesprague/delivery-status/master/src/images/out-for-delivery.png',
  },
  statusStrings: {
    delivered: ['delivered'],
    inTransit: ['in transit', 'on its way', 'in-transit'],
    outForDelivery: ['out for delivery'],
  },
  titlePrefix: {
    delivered: 'DELIVERED ',
    inTransit: 'In Transit',
    outForDelivery: 'Out For Delivery',
  },
  reloadInterval: 300000, // 5 minutes ((1000 * 60) * 5)
  selectors: {
    fedEx: '.snapshotController_addr_label.dest',
    ups: 'stApp_txtPackageStatus',
    usps: 'div.delivery_status > h2',
  },
};

export function handleError(error) {
  console.error(error);
}

export function reloadWindow() {
  window.location.reload(true);
};

export function currentService() {
  const domains = ['fedex.com', 'ups.com', 'usps.com'];
  let returnVal = null;
  domains.forEach(domain => {
    if (window.location.hostname.includes(domain)) {
      [ returnVal, ] = domain.split('.');
    }
  });
  return returnVal;
}
