export const imagePath = 'https://raw.githubusercontent.com/mikesprague/delivery-status/master/src/images/';

export const selectors = {
  fedex: {
    deliveryStatus: '.snapshotController_addr_label.dest',
    overlay: '#container',
  },
  lasership: {
    deliveryStatus: '.event-banner-on',
    overlay: '#header',
  },
  ups: {
    deliveryStatus: '#stApp_txtPackageStatus',
    overlay: '.iw_viewport-wrapper',
  },
  usps: {
    deliveryStatus: 'div.delivery_status > h2',
    overlay: '#tracking_page_wrapper',
  },
};

export const favicons = {
  delivered: `${imagePath}delivered.png`,
  inTransit: `${imagePath}in-transit.png`,
  outForDelivery: `${imagePath}out-for-delivery.png`,
  main: `${imagePath}delivery-status-icon.png`,
};

export const statusStrings = {
  delivered: ['delivered'],
  inTransit: ['in transit', 'on its way', 'accepted', 'in-transit'],
  outForDelivery: ['out for delivery'],
};

export const titlePrefix = {
  delivered: 'DELIVERED',
  inTransit: 'In Transit',
  outForDelivery: 'Out For Delivery',
};

export const statusClass = {
  delivered: 'delivered',
  inTransit: 'in-transit',
  outForDelivery: 'out-for-delivery',
};

export const reloadInterval = 300000; // 5 minutes ((1000 * 60) * 5)
