import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFilterList,
  CheckboxProps,
  updateFilterListAll,
  FS,
  refreshSelectedList,
} from "../../store/filterSlice";
import { TextField } from "@mui/material";

type FilterProps = {
  checkboxList: CheckboxProps[];
  title: string;
  filterKey: string;
  searchBoxOpen?: boolean;
  allCheckBoxOpen?: boolean;
};

const Filter = (props: FilterProps) => {
  console.log("Filter_rendered");
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
      <h1>{title}</h1>
      <FormGroup>
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
        {allCheckBoxOpen && searchText == "" ? (
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleChangeAll}
                value={"All"}
                checked={checkedAll}
              />
            }
            label={"Tümü"}
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
                    onChange={handleChange}
                    value={e.value}
                    checked={e.checked}
                  />
                }
                label={e.text}
              />
            </>
          );
        })}
      </FormGroup>
    </>
  );
};

export default Filter;
