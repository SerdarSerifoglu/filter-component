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
import { Typography } from "@mui/material";
import styled from "@emotion/styled";
import SearchBox from "./SearchBox";

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

type FilterPartProps = {
  checkboxList: CheckboxProps[];
  title: string;
  filterKey: string;
  searchBoxOpen?: boolean;
  allCheckBoxOpen?: boolean;
};

const FilterPiece = (props: FilterPartProps) => {
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

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(
      updateFilterList({ filterKey: filterKey, value: event.target.value })
    );
    dispatch(refreshSelectedList());

    if (allCheckBoxOpen) {
      if (event.target.checked == false && allCheckboxStatus) {
        dispatch(
          updateCheckedAll({
            filterKey: filterKey,
            value: !allCheckboxStatus,
          })
        );
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
    dispatch(
      updateCheckedAll({
        filterKey: filterKey,
        value: !allCheckboxStatus,
      })
    );
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
        <SearchBox
          value={searchInputValue}
          onChangeEvent={(e: any) => {
            dispatch(updateSearchInputs({ filterKey, value: e.target.value }));
          }}
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
