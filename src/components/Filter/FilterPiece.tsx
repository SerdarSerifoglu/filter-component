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
  updateCheckedAll,
  updateSearchInputs,
} from "../../store/filterSlice";
import { InputAdornment, TextField, Typography } from "@mui/material";
import styled from "@emotion/styled";

//#region STYLES

const Title = styled.h2`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  margin-bottom: 8px;
  margin-top: 8px;
`;

const CheckboxLabelStyle = styled(Typography)`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
`;

const SearchField = styled(TextField)`
  margin-bottom: 8px;
`;

const FormGroupStyle = styled(FormGroup)`
  max-height: 192px;
  overflow-y: auto;
  display: flex;
  flex-wrap: nowrap;
`;

const FormControlLabelStyle = styled(FormControlLabel)`
  padding: 1px;
`;
//#endregion

interface HeaderIconsProps {
  color: string;
  className?: string;

  onClick?: () => void;
}
const SearchIcon = (props: HeaderIconsProps) => (
  <svg
    className={props.className}
    onClick={props.onClick}
    width="16"
    height="17"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13 6.5C13 7.93437 12.5344 9.25937 11.75 10.3344L15.7062 14.2937C16.0969 14.6844 16.0969 15.3188 15.7062 15.7094C15.3156 16.1 14.6812 16.1 14.2906 15.7094L10.3344 11.75C9.25937 12.5375 7.93437 13 6.5 13C2.90937 13 0 10.0906 0 6.5C0 2.90937 2.90937 0 6.5 0C10.0906 0 13 2.90937 13 6.5ZM6.5 11C8.98437 11 11 8.98437 11 6.5C11 4.01562 8.98437 2 6.5 2C4.01562 2 2 4.01562 2 6.5C2 8.98437 4.01562 11 6.5 11Z"
      fill={props.color}
    />
  </svg>
);

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
  const allCheckboxStatus = useSelector(
    (state: any) => state.filter.allCheckbox[filterKey]
  );
  const searchInputValue = useSelector(
    (state: any) => state.filter.searchInput[filterKey]
  );

  React.useEffect(() => {
    testFunc();
  }, [selectedList]);

  // const [searchText, setSearchText] = React.useState<string>("");
  // const [checkedAll, setCheckedAll] = React.useState<boolean>(false);

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
      if (event.target.checked == false && allCheckboxStatus) {
        dispatch(
          updateCheckedAll({
            filterKey: filterKey,
            value: !allCheckboxStatus,
          })
        );
        // setCheckedAll(!checkedAll);
      }
    }
  }

  const handleChangeAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateFilterListAll({
        currentStatus: allCheckboxStatus,
        filterKey: filterKey,
      })
    );
    dispatch(refreshSelectedList());
    // setCheckedAll(!checkedAll);
    dispatch(
      updateCheckedAll({
        filterKey: filterKey,
        value: !allCheckboxStatus,
      })
    );
  };

  const testFunc = () => {
    console.log("selectedList_testFunc", selectedList);
  };

  if (searchBoxOpen) {
    if (searchInputValue != "") {
      checkboxList = checkboxList.filter((e) =>
        e.text.toLowerCase().includes(searchInputValue.toLowerCase())
      );
    }
  }

  return (
    <>
      <Title>{title}</Title>
      {searchBoxOpen ? (
        <SearchField
          id="asd"
          value={searchInputValue}
          onChange={(e) => {
            dispatch(updateSearchInputs({ filterKey, value: e.target.value }));
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="#CF7B00" />
              </InputAdornment>
            ),
          }}
          size="small"
        />
      ) : (
        ""
      )}
      <FormGroupStyle>
        {allCheckBoxOpen && searchInputValue == "" ? (
          <FormControlLabelStyle
            control={
              <Checkbox
                sx={{
                  [`&`]: {
                    color: "#A0A0A0",
                    padding: "4px 8px",
                  },
                  [`&.${checkboxClasses.checked}`]: {
                    color: "#CF7B00",
                  },
                }}
                onChange={handleChangeAll}
                value={"All"}
                checked={allCheckboxStatus}
                size="small"
              />
            }
            label={<CheckboxLabelStyle>Tümü</CheckboxLabelStyle>}
          />
        ) : (
          ""
        )}
        {checkboxList.map((e) => {
          return (
            <>
              <FormControlLabelStyle
                control={
                  <Checkbox
                    sx={{
                      [`&`]: {
                        color: "#A0A0A0",
                        padding: "4px 8px",
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
      </FormGroupStyle>
    </>
  );
};

export default FilterPiece;
