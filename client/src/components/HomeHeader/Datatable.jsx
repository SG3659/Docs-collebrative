import moment from "moment";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
export const DataTable = ({ doc }) => {
  const navigate = useNavigate();
  return (
    <div className="w-[999px] flex flex-wrap justify-center gap-4 p-6 from-bg-gray-50 to-bg-gray-300 b rounded-2xl mt-2">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>NAME</TableCell>
              <TableCell align="right">DATE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doc && doc.length > 0
              ? doc.map((row, rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    onClick={() => navigate(`/document/${row._id}`)}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    className="cursor-pointer"
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">
                      {" "}
                      {moment(row.createdAt).format("MMMM Do YYYY")}
                    </TableCell>
                  </TableRow>
                ))
              : " "}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
