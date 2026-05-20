# Project Session Notes

## Summary
- Located the extracted artifacts workspace in Downloads and identified `api-server` and `mockup-sandbox` projects.
- Pulled the mockup hero component into the MERN frontend, converted to JSX, and wired a preview loader.
- Added a generated module map for preview loading.
- Ensured the hero renders on the homepage and hides the global navbar on `/`.
- Made the hero full-bleed and matched the homepage styling to the hero’s dark/tech palette.
- Added mock product images and wired them into homepage mock products.

## Key Changes
- Hero preview system now lives in the homepage hero component.
- Homepage uses the hero’s own navbar; the global navbar is hidden on `/` only.
- Homepage sections restyled for a cohesive dark/tech look.
- Mock product cards now render real images instead of placeholders.

## Files Added
- `C:\Users\hp\Desktop\mern stack\frontend\src\.generated\mockup-components.js`
- `C:\Users\hp\Desktop\mern stack\frontend\src\components\mockups\ecommerce-hero\EcommerceHero.jsx`
- `C:\Users\hp\Desktop\mern stack\frontend\public\__mockup\images\` (hero assets)
- `C:\Users\hp\Desktop\mern stack\frontend\public\images\mock\` (homepage product images)

## Files Updated
- `C:\Users\hp\Desktop\mern stack\frontend\src\components\home\EcommerceHero.jsx`
- `C:\Users\hp\Desktop\mern stack\frontend\src\components\Navbar\layout.jsx`
- `C:\Users\hp\Desktop\mern stack\frontend\src\pages\userpages\Home.jsx`

## Preview Usage
- Homepage shows the hero by default.
- Preview route: `/preview/ecommerce-hero/EcommerceHero`

## Mock Image Sources (Unsplash)
- https://unsplash.com/photos/man-holding-wireless-headphones-Z4X3VrDego8
- https://unsplash.com/photos/black-android-smartphone-YwrdbQw0oco
- https://unsplash.com/photos/closeup-photo-of-laptop-keyboard-Uar8mh_f0kA
- https://unsplash.com/photos/black-xbox-360-console-DPOdCl4bGJU
- https://unsplash.com/photos/blue-and-black-circuit-board-19YCOjHosDk
- https://unsplash.com/photos/a-rectangular-electronic-device-CTvM5aDnDEw
- https://unsplash.com/photos/a-washing-machine-in-a-laundry-room-symELidEVhs
- https://unsplash.com/photos/a-rice-cooker-sitting-on-top-of-a-counter-UFs77dHcxQc
- https://unsplash.com/photos/a-kitchen-with-a-refrigerator-and-oven-4xVniX7_PaY
- https://unsplash.com/photos/man-irons-clothes-with-a-vintage-iron-2Mp0HdOcaOs

## Notes
- If you want different product images, replace files under `frontend\public\images\mock` and update `mockProducts` in `Home.jsx`.
- The preview loader expects components under `frontend\src\components\mockups` and uses `frontend\src\.generated\mockup-components.js`.
