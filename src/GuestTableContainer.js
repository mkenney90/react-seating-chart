import GuestTable from "./GuestTable";

export default function GuestTableContainer({ totalTables, seatingChart }) {
    const tableSplit = [5, 4];
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
            <div className="table-container-left">{leftSideTables}</div>
            <div className="dance-floor"></div>
            <div className="table-container-right">{rightSideTables}</div>
        </>
    );
}
