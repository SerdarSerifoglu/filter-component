import FilterPiece from "./FilterPiece";
import { useDispatch, useSelector } from "react-redux";
import { FS, clearFilter, refreshSelectedList } from "../../store/filterSlice";
import styled from "@emotion/styled";
import { useEffect } from "react";

const FilterWrapper = styled.div`
  width: 268px;
  padding: 16px;
`;

const Filter = () => {
  const filterList = useSelector((state: any) => state.filter.filterList);
  const selectedList = useSelector((state: any) => state.filter.selectedList);
  const dispatch = useDispatch();

  useEffect(() => {
    //Filtre'te göre istek buradan atılacak
    //filtrede herhangi bir checkbox'a tıklandığında burası tetiklenir diye düşündüm.
    console.log("clickedCheckbox");
  }, [selectedList]);

  return (
    <>
      <FilterWrapper>
        <button
          onClick={() => {
            dispatch(clearFilter());
            dispatch(refreshSelectedList());
          }}
        >
          Filtreyi Temizle
        </button>
        {filterList.map((e: any) => {
          return (
            <FilterPiece
              filterKey={e.filterKey}
              title={e.filterName}
              checkboxList={e.checkboxes}
              searchBoxOpen={e.searchBoxOpen}
              allCheckBoxOpen={e.allCheckBoxOpen}
            ></FilterPiece>
          );
        })}
      </FilterWrapper>
    </>
  );
};

export default Filter;
