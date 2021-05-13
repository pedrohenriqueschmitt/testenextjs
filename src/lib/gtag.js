import ReactPixel from 'react-facebook-pixel';

export const GA_TRACKING_ID = process.env.GA_TRACKING_ID
export const pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID

//ReactPixel.init(pixelId, {}, { debug: true, autoConfig: false });

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  ReactPixel.init(pixelId, {}, { debug: true, autoConfig: false });
  ReactPixel.pageView();
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  //ReactPixel.event(event, data);
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}