import { Draggable } from "react-beautiful-dnd";
import formatId from "./util/formatId";

export default function GuestCard(props) {

    const {name, index} = props;
    const guestId = formatId(name);

    return (
        <Draggable draggableId={guestId} index={index}>
            {provided => (
                <div className="guest-card" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <span>{name}</span>
                </div>
            )}
        </Draggable>
    )
}