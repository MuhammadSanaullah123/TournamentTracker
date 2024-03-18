import React from "react";

//mui
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
const StandingsTable = ({ standings, arenas }) => {
  function createData(no, name, points, games, ties) {
    return { no, name, points, games, ties };
  }

  const rows = [
    createData(1, "Visualizer", "3 pts.", 4, "3:3:5"),
    createData(1, "Visualizer", "3 pts.", 4, "3:3:5"),
    createData(1, "Visualizer", "3 pts.", 4, "3:3:5"),
    createData(1, "Visualizer", "3 pts.", 4, "3:3:5"),
    createData(1, "Visualizer", "3 pts.", 4, "3:3:5"),
    createData(1, "Visualizer", "3 pts.", 4, "3:3:5"),
    createData(1, "Visualizer", "3 pts.", 4, "3:3:5"),
    createData(1, "Visualizer", "3 pts.", 4, "3:3:5"),
    createData(1, "Visualizer", "3 pts.", 4, "3:3:5"),
  ];
  return (
    <div id="standingstable">
      <TableContainer component={Paper} className="tablecontainer">
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="headingCell"></TableCell>
              <TableCell className="headingCell" align="left">
                NAME
              </TableCell>
              <TableCell className="headingCell" align="right">
                PTS.
              </TableCell>
              <TableCell className="headingCell" align="right">
                GAMES
              </TableCell>
              <TableCell className="headingCell" align="right">
                TIES
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {standings?.map((standing, index) => {
              let temp1 = standing.tiebreakers[0].split(".")[0];
              let ties = [...standing.tiebreakers];
              ties[0] = temp1;
              let name = arenas
                ?.map((arena) => {
                  if (Array.isArray(arena?.playerIds)) {
                    let index = arena?.playerIds?.findIndex(
                      (playerId) => playerId === standing.playerId
                    );
                    return index !== -1 ? arena?.playerNames[index] : null;
                  }
                  return null;
                })
                .filter((value) => value !== null);
              console.log(name);
              if (name && name[0]) {
                name = name[0];
              }

              return (
                <TableRow key={index} sx={{ " td, th": { border: 0 } }}>
                  <TableCell component="th" scope="row" className="dataCell">
                    {standing.position}
                  </TableCell>
                  <TableCell align="left" className="dataCell">
                    {name}
                  </TableCell>
                  <TableCell align="right" className="dataCell">
                    {standing.points.split(".")[0]} pts.
                  </TableCell>
                  <TableCell align="right" className="dataCell">
                    {standing.gamesPlayed}
                  </TableCell>
                  <TableCell align="right" className="dataCell tiesCell">
                    {ties.join(":")}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StandingsTable;
