import {
  Box,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import shortid from "shortid";

function TableComponent({
  tableHeadings = [],
  tableHeadingsStyle = {},
  tableBodyData = [],
  title = "",
  imageContainerStyle = {},
  isImage = false,
  imageStyle = {},
  tableBodyStyle = {},
  isProfile = false,
  handleTableCellClick,
  type = "",
  align = "left",
  headerButtonClick = () => {},
  loadingState = false,
}) {
  const truncate = (input, length) =>
    input?.length > length ? `${input.substring(0, length)}...` : input;
  return (
    <TableContainer>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ fontSize: "22px", marginBottom: "10px" }}>
          {title}
        </Typography>
        {type === "products" && (
          <Button
            sx={{
              width: "fit-content",
              mt: 2,
              mb: 2,
              background: "#539165",
              "&:hover": { background: "#539165" },
              borderRadius: "30px",
              height: "40px",
              color: "#fff",
              padding: "0px 15px",
            }}
            onClick={() => headerButtonClick()}
          >
            Create Product
          </Button>
        )}
      </Box>

      {loadingState ? (
        <CircularProgress
          sx={{
            color: "#539165",
            mt: 3,
            mb: 2,
            marginLeft: "50%",
          }}
          size={25}
        />
      ) : (
        <Table
          sx={{ minWidth: isProfile ? 630 : 650 }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              {tableHeadings?.map((heading, i) => (
                <TableCell
                  align={align}
                  sx={tableHeadingsStyle}
                  key={shortid.generate()}
                >
                  {heading}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {tableBodyData?.map((item) => (
              <TableRow
                // key={item?.title}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                key={shortid.generate()}
              >
                <TableCell
                  sx={isImage ? imageContainerStyle : tableBodyStyle}
                  scope="row"
                  align={align}
                >
                  {isImage ? (
                    <Box
                      sx={{
                        width: "75px",
                        height: "75px",
                        position: "relative",
                      }}
                    >
                      <Image
                        fill
                        src={item?.firstCol}
                        alt={item?.title}
                        style={imageStyle}
                      />
                    </Box>
                  ) : (
                    item?.firstCol
                  )}
                </TableCell>

                <TableCell align={align} sx={tableBodyStyle}>
                  {item?.secondCol}
                </TableCell>

                <TableCell align={align} sx={tableBodyStyle}>
                  {item?.thirdCol}
                </TableCell>

                <TableCell align={align} sx={tableBodyStyle}>
                  {item?.fourthCol}
                </TableCell>
                <TableCell align={align} sx={tableBodyStyle}>
                  {item?.fifthCol}
                </TableCell>
                <TableCell align={align} sx={tableBodyStyle}>
                  {item?.sixthCol}
                </TableCell>

                <TableCell
                  align={align}
                  sx={tableBodyStyle}
                  onClick={() =>
                    type === "orders" && handleTableCellClick(item?.firstCol)
                  }
                >
                  {item?.sevnthCol}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
}

export default TableComponent;
