import Filter from "./Filter";
import { useDispatch, useSelector } from "react-redux";
import { FS } from "../../store/filterSlice";
const FilterWrapper = () => {
  const filterList = useSelector((state: any) => state.filter.filterList);

  function findCheckedCheckboxes(list: FS[]) {
    let result: any[] = [];
    list.forEach((e) => {
      var filterKey = e.filterKey;
      var checkedList = e.checkboxes
        .filter((x) => x.checked)
        .map((m) => m.value)
        .join(",");
      result.push({ fk: filterKey, values: checkedList });
    });

    return result;
  }

  return (
    <>
      <button
        onClick={() => {
          console.log(findCheckedCheckboxes(filterList));
        }}
      >
        SERDAR
      </button>
      {filterList.map((e: any) => {
        return (
          <Filter
            filterKey={e.filterKey}
            title={e.filterName}
            checkboxList={e.checkboxes}
            searchBoxOpen={e.searchBoxOpen}
            allCheckBoxOpen={e.allCheckBoxOpen}
          ></Filter>
        );
      })}
    </>
  );
};

export default FilterWrapper;
