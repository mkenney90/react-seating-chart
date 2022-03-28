import "./App.css";
import { useCallback, useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GuestBank from "./GuestBank";
import GuestTableContainer from "./GuestTableContainer";
import { faRotateLeft, faSave } from "@fortawesome/free-solid-svg-icons";
import formatId from "./util/formatId";
import GuestDataService from "./services/guest.services";
import toast, { Toaster } from "react-hot-toast";
import localData from "./guests";

function App() {
    const [guestData, setGuestData] = useState([]);
    const [loading, setLoading] = useState(true);
    const tables = 10;
    const zeros = Array.apply(null, Array(tables + 1)).map(function () {
        return [];
    });
    const [seatingChart, setSeatingChart] = useState(zeros);

    const getData = async () => {
        const data = await GuestDataService.getAllGuests();

        if (data.docs.length > 1) {
            const guests = data.docs.map((g) => ({
                id: g.id,
                tag: formatId(g.data().name),
                ...g.data(),
            }));
            setGuestData(guests);
        } else {
            setGuestData(localData);
        }
        setLoading(false);
    };

    const updateSeatingChart = useCallback(
        (guest, table, oldIndex, newIndex) => {
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
        },
        [guestData, seatingChart]
    );

    const handleSave = () => {
        try {
            GuestDataService.updateGuests(guestData);
            toast.success("Seating chart saved!", {
                style: { fontSize: "13pt" },
            });
        } catch (err) {
            console.error(err);
        }
    };

    const handleReset = () => {
        getData();
    };

    useEffect(() => {
        if (seatingChart[0].length) return;
        updateSeatingChart();
    });

    useEffect(() => {
        getData();
    }, []);

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
        // moving between table and bank
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
            console.log(seatingChart);
        }
    };

    return (
        <div className="App">
            {loading ? (
                <>
                    <h2 className="loading-text">Loading...</h2>
                    <div className="loading-bar" />
                </>
            ) : (
                <DragDropContext onDragEnd={onDragEnd}>
                    <GuestBank seatingChart={seatingChart} />
                    <div className="table-container">
                        {
                            <GuestTableContainer
                                totalTables={tables}
                                seatingChart={seatingChart}
                            />
                        }
                    </div>
                </DragDropContext>
            )}
            <button className="btn btn-reset" onClick={handleReset}>
                <FontAwesomeIcon icon={faRotateLeft} size={"3x"} />
            </button>
            <button className="btn btn-save" onClick={handleSave}>
                <FontAwesomeIcon icon={faSave} size={"3x"} />
            </button>

            <Toaster />
        </div>
    );
}

export default App;
