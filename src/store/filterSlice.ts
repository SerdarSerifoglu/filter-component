import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export type CheckboxProps = {
    text: string;
    value: string;
    checked: boolean;
};

export interface FS {
    filterName: string;
    filterKey: string;
    searchBoxOpen?: boolean;
    allCheckBoxOpen?: boolean;
    checkboxes: CheckboxProps[];
}

export interface InitialStateProps {
    filter: string;
    filterList: FS[];
    selectedList: any[];
}

var filterList = [{
    filterName: "Kategori",
    filterKey: "Category",
    searchBoxOpen: true,
    allCheckBoxOpen: true,
    checkboxes: [
        { text: "Test1", value: "Test1", checked: false },
        { text: "Test2", value: "Test2", checked: false },
        { text: "Test3", value: "Test3", checked: false },
    ]

},
{
    filterName: "Konu",
    filterKey: "Subject",
    checkboxes: [
        { text: "Test1", value: "Test1", checked: false },
        { text: "Test2", value: "Test2", checked: false },
        { text: "Test3", value: "Test3", checked: false },
    ]

},
{
    filterName: "Eğitim Özellikleri",
    filterKey: "EducationFeatures",
    checkboxes: [
        { text: "Test1", value: "Test1", checked: false },
        { text: "Test2", value: "Test2", checked: false },
        { text: "Test3", value: "Test3", checked: false },
        { text: "Test4", value: "Test4", checked: false },
        { text: "Test5", value: "Test5", checked: false },
        { text: "Test6", value: "Test6", checked: false },
    ]

}]

const initialState: InitialStateProps = {
    filter: "",
    filterList: filterList,
    selectedList: []
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filterTest: (state) => {
            state.filter = "TEST 123"
        },
        updateFilterList: (state, action: PayloadAction<any>) => {
            let filter = state.filterList.find(e => e.filterKey == action.payload.filterKey);

            if (filter != undefined) {
                let checkbox = filter.checkboxes.find(e => e.value == action.payload.value)
                if (checkbox != undefined) {
                    checkbox.checked = !checkbox.checked;
                }
            }
        },
        updateFilterListAll: (state, action: PayloadAction<any>) => {
            let filter = state.filterList.find(e => e.filterKey == action.payload.filterKey);

            if (filter != undefined) {
                filter.checkboxes.forEach(e => action.payload.currentStatus ? e.checked = false : e.checked = true);
            }
        },
        refreshSelectedList: (state) => {
            let result: any[] = [];
            state.filterList.forEach((e) => {
                var filterKey = e.filterKey;
                var checkedList = e.checkboxes
                    .filter((x) => x.checked)
                    .map((m) => m.value)
                    .join(",");
                result.push({ fk: filterKey, values: checkedList });
            });

            state.selectedList = result;
        }
    }
});

export const { filterTest, updateFilterList, updateFilterListAll, refreshSelectedList } = filterSlice.actions;
export default filterSlice.reducer;
