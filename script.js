/*
 * CUSTOMIZE THIS OBJECT before publishing.
 * Use ISO date/time for the countdown, e.g. "2027-02-14T06:30:00+05:30".
 * RSVP link can be a WhatsApp link: https://wa.me/91XXXXXXXXXX?text=...
 */
const INVITATION = {
  weddingDateTime: "", // Example: "2027-02-14T06:30:00+05:30"
  weddingDateLabel: "Date to be announced",
  weddingTime: "Time to be announced",
  weddingVenue: "Venue name",
  weddingAddress: "Venue address, city",
  weddingMapUrl: "https://maps.google.com",
  receptionDateLabel: "Date to be announced",
  receptionTime: "Time to be announced",
  receptionVenue: "Reception venue",
  receptionAddress: "Venue address, city",
  receptionMapUrl: "https://maps.google.com",
  rsvpUrl: "https://wa.me/?text=Hello%20Kevin%20and%20Pooja%2C%20I%20would%20like%20to%20respond%20to%20your%20wedding%20invitation."
};

const setText = (id, value) => {
  const el = document.getElementById(id);
  if (el && value) el.textContent = value;
};
setText("weddingDate", INVITATION.weddingDateLabel);
setText("weddingTime", INVITATION.weddingTime);
setText("venueName", INVITATION.weddingVenue);
setText("venueAddress", INVITATION.weddingAddress);
setText("receptionDate", INVITATION.receptionDateLabel);
setText("receptionTime", INVITATION.receptionTime);
setText("receptionVenue", INVITATION.receptionVenue);
setText("receptionAddress", INVITATION.receptionAddress);
setText("heroDate", INVITATION.weddingDateLabel.toUpperCase());
document.getElementById("mapLink").href = INVITATION.weddingMapUrl;
document.getElementById("receptionMapLink").href = INVITATION.receptionMapUrl;
document.getElementById("rsvpLink").href = INVITATION.rsvpUrl;

document.getElementById("openInvite").addEventListener("click", () => {
  document.getElementById("details").scrollIntoView({ behavior: "smooth" });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

window.addEventListener("scroll", () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  document.getElementById("progress").style.width = `${progress}%`;
});

function updateCountdown() {
  if (!INVITATION.weddingDateTime) {
    setText("countdownNote", "Add the wedding date and time in script.js to activate the countdown.");
    return;
  }
  const target = new Date(INVITATION.weddingDateTime).getTime();
  const now = Date.now();
  const remaining = target - now;
  if (Number.isNaN(target)) {
    setText("countdownNote", "Please enter a valid wedding date in script.js.");
    return;
  }
  if (remaining <= 0) {
    ["days", "hours", "minutes", "seconds"].forEach(id => setText(id, "00"));
    setText("countdownNote", "Today marks the beginning of forever. Let the celebrations begin!");
    return;
  }
  const day = Math.floor(remaining / 86400000);
  const hour = Math.floor((remaining % 86400000) / 3600000);
  const minute = Math.floor((remaining % 3600000) / 60000);
  const second = Math.floor((remaining % 60000) / 1000);
  setText("days", String(day).padStart(2, "0"));
  setText("hours", String(hour).padStart(2, "0"));
  setText("minutes", String(minute).padStart(2, "0"));
  setText("seconds", String(second).padStart(2, "0"));
  setText("countdownNote", "The best is yet to come.");
}
updateCountdown();
setInterval(updateCountdown, 1000);
