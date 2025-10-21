/**
 * Static mapping of attraction image paths to require() module IDs
 * This is necessary because Metro bundler requires static require() calls
 */

export const ATTRACTION_IMAGES: Record<string, any> = {
  'hagiasophia.jpg': require('@/assets/images/attractions/hagiasophia.jpg'),
  'bluemosque.jpg': require('@/assets/images/attractions/bluemosque.jpg'),
  'topkapipalace.jpg': require('@/assets/images/attractions/topkapipalace.jpg'),
  'grandbazaar.jpg': require('@/assets/images/attractions/grandbazaar.jpg'),
  'galatatower.jpg': require('@/assets/images/attractions/galatatower.jpg'),
  'istiklalavenue.jpg': require('@/assets/images/attractions/istiklalavenue.jpg'),
  'peramuseum.jpg': require('@/assets/images/attractions/peramuseum.jpg'),
  'dolmabahcemuseum.jpg': require('@/assets/images/attractions/dolmabahcemuseum.jpg'),
  'kadikoymarket.jpg': require('@/assets/images/attractions/kadikoymarket.jpg'),
  'modacoast.jpg': require('@/assets/images/attractions/modacoast.jpg'),
  'maidenstower.jpg': require('@/assets/images/attractions/maidenstower.jpg'),
  'camlicahill.jpg': require('@/assets/images/attractions/camlicahill.jpg'),
  'basilicacistern.jpg': require('@/assets/images/attractions/basilicacistern.jpg'),
  'spicebazaar.jpg': require('@/assets/images/attractions/spicebazaar.jpg'),
  'galatabridge.jpg': require('@/assets/images/attractions/galatabridge.jpg'),
  'newmosque.jpg': require('@/assets/images/attractions/newmosque.jpg'),
  'rumelifortress.jpg': require('@/assets/images/attractions/rumelifortress.jpg'),
  'bebekcoast.jpg': require('@/assets/images/attractions/bebekcoast.jpg'),
  'ortakoymosque.jpg': require('@/assets/images/attractions/ortakoymosque.jpg'),
  'historictram.jpg': require('@/assets/images/attractions/historictram.jpg'),
  'taksimsquare.jpg': require('@/assets/images/attractions/taksimsquare.jpg'),
  'princesislands.jpg': require('@/assets/images/attractions/princesislands.jpg'),
  'fenergreekorthodox.jpg': require('@/assets/images/attractions/fenergreekorthodox.jpg'),
  'balathouses.jpg': require('@/assets/images/attractions/balathouses.jpg'),
};

/**
 * Gets the require() module ID for an attraction image
 * @param imagePath - The image path from JSON (e.g., "../assets/images/attractions/hagiasophia.jpg")
 * @returns The require() module ID (number)
 */
export function getAttractionImage(imagePath: string): number {
  // Extract filename from path
  const filename = imagePath.split('/').pop() || '';

  // Temporary workaround: Use fallback for problematic large images
  // These images are too large and cause crashes in Expo Go
  // const problematicImages = ['balathouses.jpg', 'rumelifortress.jpg'];
  // if (problematicImages.includes(filename)) {
  //   console.warn(`Using fallback for large image: ${filename}`);
  //   // Use a smaller, similar image as fallback
  //   return ATTRACTION_IMAGES['hagiasophia.jpg'];
  // }

  // Look up in mapping
  const image = ATTRACTION_IMAGES[filename];

  if (!image) {
    console.warn(`Image not found in mapping: ${filename}, using fallback`);
    return ATTRACTION_IMAGES['hagiasophia.jpg'];
  }

  return image;
}
