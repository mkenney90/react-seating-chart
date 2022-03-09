import "./App.css";
import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GuestBank from "./GuestBank";
import GuestTable from "./GuestTable";
import { faRotateLeft, faSave } from "@fortawesome/free-solid-svg-icons";
import formatId from "./util/formatId";
import GuestDataService from "./services/guest.services";

function App() {
    const [guestData, setGuestData] = useState([]);
    const tables = 8;
    const zeros = Array.apply(null, Array(tables + 1)).map(function () {
        return [];
    });
    const [seatingChart, setSeatingChart] = useState(zeros);

    const tableArray = [];

    const getData = async () => {
        const data = await GuestDataService.getAllGuests();

        if (data.docs.length > 0) {
            const guests = data.docs.map((g) => ({
                id: g.id,
                tag: formatId(g.data().name),
                ...g.data(),
            }));
            setGuestData(guests);
        } else {
            fetch("guests.json")
                .then((res) => res.json())
                .then(function (res) {
                    res.forEach((guest) => (guest.tag = formatId(guest.name)));
                    setGuestData(res);
                });
        }
    };

    const updateSeatingChart = (guest, table, oldIndex, newIndex) => {
        if (!guestData.length) return;

        const newData = Array.from(seatingChart);

        if (guest) {
            const moved = newData[table].find((g) => g.tag === guest);
            newData[table].splice(oldIndex, 1);
            newData[table].splice(newIndex, 0, moved);
        } else {
            newData[0] = guestData.filter(function (guest) {
                return guest.table === 0 || guest.table == null;
            });
            for (let i = 1; i <= tables; i++) {
                newData[i] = guestData.filter((guest) => guest.table === i);
            }
        }
        setSeatingChart(newData);
    };

    const handleSave = () => {
        try {
            GuestDataService.updateGuests(guestData);
        } catch (err) {
            console.error(err);
        }
    };

    const handleReset = () => {
        getData();
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        updateSeatingChart();
    }, [guestData]);

    for (let i = 1; i <= tables; i++) {
        tableArray.push(
            <GuestTable
                key={`table-${i}`}
                tableNumber={i}
                seatingChart={seatingChart}
            />
        );
    }

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        )
            return;

        const newTable =
            destination.droppableId === "guestBank"
                ? 0
                : parseInt(destination.droppableId.replace(/[^0-9]/g, ""));

        const updatedData = Array.from(guestData);
        // different source + destination
        if (destination.droppableId !== source.droppableId) {
            const sourceClone = Array.from(source);
            const destClone = Array.from(destination);
            const [moved] = sourceClone.splice(source.droppableId.index, 1);
            destClone.splice(destination.droppableId.index, 0, moved);
            const targetGuest = updatedData.find((g) => g.tag === draggableId);
            if (targetGuest) targetGuest.table = newTable;

            setGuestData(updatedData);
        } else {
            const [moved] = updatedData.splice(source.index, 1);
            updatedData.splice(destination.index, 0, moved);

            updateSeatingChart(
                draggableId,
                newTable,
                source.index,
                destination.index
            );
        }
    };

    return (
        <div className="App">
            <DragDropContext onDragEnd={onDragEnd}>
                <GuestBank seatingChart={seatingChart} />
                <div className="table-container">{tableArray}</div>
            </DragDropContext>
            <button className="btn btn-reset" onClick={handleReset}>
                <FontAwesomeIcon icon={faRotateLeft} size={"3x"} />
            </button>
            <button className="btn btn-save" onClick={handleSave}>
                <FontAwesomeIcon icon={faSave} size={"3x"} />
            </button>
        </div>
    );
}

export default App;
