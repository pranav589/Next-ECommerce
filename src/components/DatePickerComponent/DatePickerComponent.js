import { Box, Button } from "@mui/material";
import React, { forwardRef, useRef, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = ({
  dateRange,
  setDateRange,
  startDate,
  endDate,
  handleDateSelect = () => {},
  range = false,
  labelProp,
  isApplyButton = false,
  maxDate,
}) => {
  const refCustomInput = useRef();

  // eslint-disable-next-line react/display-name
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <Button className="example-custom-input" onClick={onClick} ref={ref}>
      {value ? value : labelProp}
    </Button>
  ));

  return (
    <Box sx={{ display: "flex" }}>
      <ReactDatePicker
        selectsRange={range}
        startDate={startDate}
        endDate={endDate}
        selected={range === false && dateRange}
        onChange={(update) => {
          setDateRange(update);
        }}
        customInput={<ExampleCustomInput ref={refCustomInput} />}
        withPortal
        maxDate={maxDate}
        dateFormat="dd/MM/yyyy"
      />
      {isApplyButton && (
        <Button
          onClick={() => {
            handleDateSelect(startDate, endDate);
          }}
          disabled={!endDate || !startDate}
        >
          Apply
        </Button>
      )}
    </Box>
  );
};

export default DatePickerComponent;
