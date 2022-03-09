export default function formatId(guestName) {
    return guestName.replace(/\s/g, "").toLowerCase();
}
