export const imagePath = 'https://raw.githubusercontent.com/mikesprague/delivery-status/master/src/images/';

// selectors used to determine delivery status/where in html to add overlay
export const selectors = {
  fedex: {
    deliveryStatus: 'div.shipment-delivery-status',
    overlay: '.app',
    trackingNumber: 'span.shipmentIdentifier',
  },
  lasership: {
    deliveryStatus: 'div.col.text-end > h5',
    overlay: '.container',
    trackingNumber: '.section > div > div:nth-child(1) > div.col-md-5 > p:nth-child(3) > b',
  },
  ups: {
    deliveryStatus: 'th.ups-progress_milestone_current_cell + td',
    overlay: '.iw_viewport-wrapper',
    trackingNumber: '#stApp_trackingNumber',
  },
  usps: {
    deliveryStatus: 'div.tb-step.current-step p.tb-status',
    overlay: '#tracking_page_wrapper',
    trackingNumber: 'div.tracking-wrapper > span',
  },
};

export const favicons = {
  delivered: `${imagePath}delivered.png`,
  inTransit: `${imagePath}in-transit.png`,
  outForDelivery: `${imagePath}out-for-delivery.png`,
  main: `${imagePath}delivery-status-icon.png`,
};

// list of strings to look for that indicate current status
export const statusStrings = {
  delivered: [ 'delivered' ],
  inTransit: [
    'in transit',
    'on the way',
    'on its way',
    'accepted',
    'in-transit',
    'currently awaiting package',
    'moving through network',
    'label created',
    'departed',
    'arrived at',
    'in possession',
  ],
  outForDelivery: [ 'out for delivery', 'on fedex vehicle for delivery' ],
};

// text will appear in title and on overlay
export const titlePrefix = {
  delivered: 'DELIVERED',
  inTransit: 'In Transit',
  outForDelivery: 'Out For Delivery',
};

// class name used to change text color in overlay
export const statusClass = {
  delivered: 'delivered',
  inTransit: 'in-transit',
  outForDelivery: 'out-for-delivery',
};

// how often to reload the window
export const reloadInterval = 300000; // 5 minutes ((1000 * 60) * 5)
