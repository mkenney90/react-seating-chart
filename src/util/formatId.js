export default function formatId(guestName) {

    return (guestName.substring(0,1).concat(guestName.substring(guestName.indexOf(" ")+1))).toLowerCase();

}