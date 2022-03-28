import { Droppable } from "react-beautiful-dnd";
import GuestCard from "./GuestCard";

export default function HeadTable({ tableNumber, seatingChart }) {
    const tableGuests = seatingChart[tableNumber];

    return (
        <Droppable droppableId={`table-${tableNumber}`}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                    <div className="guest-table rectangle">
                        <div className="table-guest-container">
                            {tableGuests.map((guest, index) => (
                                <GuestCard
                                    key={guest.id}
                                    {...guest}
                                    index={index}
                                />
                            ))}
                        </div>
                        <span>HEAD</span>
                    </div>
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
}
