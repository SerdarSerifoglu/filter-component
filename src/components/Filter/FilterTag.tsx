import {
  FilterTagProps,
  refreshSelectedList,
  updateFilterList,
} from "../../store/filterSlice";
import { useDispatch } from "react-redux";
import styled from "@emotion/styled";

//#region STYLE

const FilterTagWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  gap: 7px;
  height: 32px;
  color: white;

  background: rgba(160, 160, 160, 0.7);
  border-radius: 4px;

  & > span:hover {
    cursor: pointer;
  }
`;

//#endregion

const FilterTag = (props: FilterTagProps) => {
  const { text, value, filterKey } = props;

  const dispatch = useDispatch();

  function clickEvent() {
    dispatch(
      updateFilterList({
        filterKey: filterKey,
        value: value,
      })
    );
    dispatch(refreshSelectedList());
  }
  return (
    <>
      <FilterTagWrapper>
        <span onClick={clickEvent}>X</span>
        {text}
      </FilterTagWrapper>
    </>
  );
};

export default FilterTag;
