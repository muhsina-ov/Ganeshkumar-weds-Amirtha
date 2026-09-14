// ─────────────────────────────────────────────────────────────
// EDIT THIS FILE ONLY when cloning this template for a client.
// ─────────────────────────────────────────────────────────────

import couple1Photo from "@/assets/couple-ganeshkumar-amirtha.jpg";
import couple2Photo from "@/assets/couple-rishikesan-karthika.jpg";

export const invite = {
  bride: "Amirtha Varsini & Karthika Devi",
  groom: "Ganeshkumar & Rishikesan",
  couples: {
    couple1: {
      photo: couple1Photo,
      groom: {
        name: "Ganeshkumar",
        degree: "B.Sc. (Computer Science), M.B.A. (IBM)",
        alias: "",
        parents: "Son of Thiru Sivakumar & Neelavathi",
        clan: "CHINNAKONDA",
      },
      bride: {
        name: "Amirtha Varsini",
        degree: "B.P.T. (Physiotherapy)",
        alias: "",
        parents: "Daughter of Thiru Rameshbabu & Shanthe",
        clan: "SELUKKA",
      },
    },
    couple2: {
      photo: couple2Photo,
      groom: {
        name: "Rishikesan",
        degree: "D.C.S.E., B.E.",
        alias: "",
        parents: "Son of Thiru Rameshbabu & Shanthe",
        clan: "SELUKKA",
      },
      bride: {
        name: "Karthika Devi",
        degree: "B.Com.",
        alias: "",
        parents: "Daughter of Thiru Sivakumar & Neelavathi",
        clan: "CHINNAKONDA",
      },
    },
  },
  /** Shown big in the hero */
  dateLabel: "17.09.26",
  /** Local start / end of the main function (ISO, no timezone) */
  start: "2026-09-17T18:00:00",
  end: "2026-09-17T19:00:00",
  /** IANA timezone of the venue */
  timeZoneOffset: "+05:30",
  dayLine: "Thursday, 17th September 2026",
  timeLine: "6:00 PM to 7:00 PM",
  eventTitle: "Engagement of Ganeshkumar & Amirtha Varsini, Rishikesan & Karthika Devi",
  invitationNote:
    "Together with our families, we request the honour of your presence at the Engagement Ceremony. We warmly invite you to celebrate our engagement and bless us as we begin this wonderful journey together. Your presence and blessings will make this occasion truly unforgettable.",
  venue: {
    name: "V S Chellam Saraswathy Maaligai",
    address: "V S Chellam Saraswathy Maaligai",
    /** Used for the Google Maps deep link */
    query: "V S Chellam Saraswathy Maaligai",
    lat: 9.92520, // default placeholder lat
    lng: 78.11977, // default placeholder lng (Madurai)
  },
  closing: "See you there",
} as const;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  invite.venue.query,
)}`;

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  invite.venue.query,
)}`;
