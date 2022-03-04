import { Droppable } from "react-beautiful-dnd";
import GuestCard from "./GuestCard";

export default function GuestTable({ tableNumber, seatingChart }) {

    const tableGuests = seatingChart[tableNumber];

    return (
        <Droppable droppableId={`table-${tableNumber}`}>
            {provided => (
                <div 
                    ref={provided.innerRef} 
                    {...provided.droppableProps}
                >
                    <div className="guest-table circleBase circle1">
                        <div className="table-guest-container">
                        {tableGuests.map((guest, index) => (
                            <GuestCard key={guest.id} {...guest} index={index} />
                        ))}
                        </div>
                        <span>{tableNumber}</span>
                    </div>
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}