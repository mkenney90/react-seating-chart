import { Droppable } from "react-beautiful-dnd";
import GuestCard from "./GuestCard";

export default function GuestBank({ seatingChart }) {
    const unassignedGuests = seatingChart[0];

    return (
        <Droppable droppableId="guestBank">
            {(provided) => (
                <div
                    className="guest-bank"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >
                    {unassignedGuests.map((guest, index) => (
                        <GuestCard key={guest.id} {...guest} index={index} />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
}
