import GuestTable from "./GuestTable";
import HeadTable from "./HeadTable";

export default function GuestTableContainer({ totalTables, seatingChart }) {
    const tableSplit = [9, 0];
    const leftSideTables = [];
    const rightSideTables = [];

    for (let i = 1; i <= totalTables; i++) {
        if (i < tableSplit[0] + 1) {
            leftSideTables.push(
                <GuestTable
                    key={`table-${i}`}
                    tableNumber={i}
                    seatingChart={seatingChart}
                />
            );
        } else {
            rightSideTables.push(
                <GuestTable
                    key={`table-${i}`}
                    tableNumber={i}
                    seatingChart={seatingChart}
                />
            );
        }
    }

    return (
        <>
            <div className="container-column">
                <div className="table-container-left">{leftSideTables}</div>
                <div className="table-container-head">
                    <HeadTable tableNumber={10} seatingChart={seatingChart} />
                </div>
            </div>
            <div className="dance-floor">Dance Floor</div>
        </>
    );
}
