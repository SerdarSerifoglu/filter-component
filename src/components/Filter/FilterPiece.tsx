import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox, { checkboxClasses } from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFilterList,
  CheckboxProps,
  updateFilterListAll,
  FS,
  refreshSelectedList,
} from "../../store/filterSlice";
import { TextField, Typography } from "@mui/material";
import styled from "@emotion/styled";

//#region STYLES

const Title = styled.h2`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
`;

const CheckboxLabelStyle = styled(Typography)`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
`;

//#endregion

type FilterPartProps = {
  checkboxList: CheckboxProps[];
  title: string;
  filterKey: string;
  searchBoxOpen?: boolean;
  allCheckBoxOpen?: boolean;
};

const FilterPiece = (props: FilterPartProps) => {
  console.log("FilterPart_rendered");
  let {
    checkboxList,
    title,
    filterKey,
    searchBoxOpen = false,
    allCheckBoxOpen = false,
  } = props;
  const dispatch = useDispatch();

  const selectedList = useSelector((state: any) => state.filter.selectedList);

  React.useEffect(() => {
    testFunc();
  }, [selectedList]);

  const [searchText, setSearchText] = React.useState<string>("");
  const [checkedAll, setCheckedAll] = React.useState<boolean>(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log("value", event.target.value);
    console.log("checked", event.target.checked);
    console.log("filterKey", filterKey);
    dispatch(
      updateFilterList({ filterKey: filterKey, value: event.target.value })
    );
    dispatch(refreshSelectedList());
    console.log("selectedList", selectedList);
    // console.log("filterList", filterList);
    // testFunc();

    if (allCheckBoxOpen) {
      if (event.target.checked == false && checkedAll) {
        setCheckedAll(!checkedAll);
      }
    }
  }

  const handleChangeAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateFilterListAll({ currentStatus: checkedAll, filterKey: filterKey })
    );
    setCheckedAll(!checkedAll);
  };

  const testFunc = () => {
    console.log("selectedList_testFunc", selectedList);
  };

  if (searchBoxOpen) {
    if (searchText != "") {
      checkboxList = checkboxList.filter((e) =>
        e.text.toLowerCase().includes(searchText.toLowerCase())
      );
    }
  }

  return (
    <>
      <Title>{title}</Title>
      {searchBoxOpen ? (
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
      ) : (
        ""
      )}
      <FormGroup>
        {allCheckBoxOpen && searchText == "" ? (
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  [`&`]: {
                    color: "#A0A0A0",
                  },
                  [`&.${checkboxClasses.checked}`]: {
                    color: "#CF7B00",
                  },
                }}
                onChange={handleChangeAll}
                value={"All"}
                checked={checkedAll}
                size="small"
              />
            }
            label={<CheckboxLabelStyle>Tüm</CheckboxLabelStyle>}
          />
        ) : (
          ""
        )}
        {checkboxList.map((e) => {
          return (
            <>
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      [`&`]: {
                        color: "#A0A0A0",
                      },
                      [`&.${checkboxClasses.checked}`]: {
                        color: "#CF7B00",
                      },
                    }}
                    onChange={handleChange}
                    value={e.value}
                    checked={e.checked}
                    size="small"
                  />
                }
                label={<CheckboxLabelStyle>{e.text}</CheckboxLabelStyle>}
              />
            </>
          );
        })}
      </FormGroup>
    </>
  );
};

export default FilterPiece;
