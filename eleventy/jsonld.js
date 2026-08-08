const parcels = require("../src/_data/parcels.json");
const site = require("../src/_data/site.json");

function parcelListing(parcel) {
  const canonical = `${site.siteUrl}/dzialka-budowlana-249-${parcel.number}.html`;
  const listing = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": `${parcel.title} – Zamość, ${site.address.street}`,
    "description": parcel.seo.metaDescription,
    "url": canonical,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": site.address.locality,
      "streetAddress": site.address.street,
      "addressCountry": site.address.country,
      "postalCode": site.address.postalCode
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": site.geo.latitude,
      "longitude": site.geo.longitude
    },
    "floorSize": {
      "@type": "QuantitativeValue",
      "value": String(parcel.area),
      "unitCode": "MTK"
    },
    "seller": {
      "@type": "Person",
      "name": site.seller.name,
      "telephone": site.seller.telephone
    }
  };
  if (parcel.mainImage) {
    listing.image = site.siteUrl + parcel.mainImage.src;
  }
  return JSON.stringify(listing, null, 4);
}

function buildIndexListing() {
  const images = parcels.filter((p) => p.mainImage).map((p) => site.siteUrl + p.mainImage.src);
  const areas = parcels.map((p) => p.area);
  const floorSizeRange = `${Math.min(...areas)}-${Math.max(...areas)}`;
  const listing = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": `Działka budowlana Zamość – ${site.address.street}`,
    "description": "Działka budowlana w Zamościu przy ul. Majdan. Dostępne działki budowlane, objęte MPZP, przeznaczenie pod zabudowę jednorodzinną.",
    "url": `${site.siteUrl}/`,
    "image": images,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": site.address.locality,
      "streetAddress": site.address.street,
      "addressCountry": site.address.country,
      "postalCode": site.address.postalCode
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": site.geo.latitude,
      "longitude": site.geo.longitude
    },
    "numberOfRooms": "0",
    "floorSize": {
      "@type": "QuantitativeValue",
      "value": floorSizeRange,
      "unitCode": "MTK"
    },
    "seller": {
      "@type": "Person",
      "name": site.seller.name,
      "telephone": site.seller.telephone
    },
    "keywords": "działka budowlana, Zamość, Majdan, działka pod budowę, nieruchomości Zamość"
  };
  return JSON.stringify(listing, null, 4);
}

function buildFaqPage() {
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": site.faq.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  };
  return JSON.stringify(faq, null, 4);
}

module.exports = {
  parcelListing,
  indexListing: buildIndexListing(),
  faqPage: buildFaqPage()
};
