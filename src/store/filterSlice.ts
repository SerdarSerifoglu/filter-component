import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface KeyObject {
    [key: string]: boolean;
}

export type CheckboxProps = {
    text: string;
    value: string;
    checked: boolean;
};

export interface FilterTagProps extends CheckboxProps {
    filterKey: string;
}

export interface FS {
    filterName: string;
    filterKey: string;
    searchBoxOpen?: boolean;
    allCheckBoxOpen?: boolean;
    checkboxes: CheckboxProps[];
}

export interface InitialStateProps {
    filterList: FS[];
    selectedList: FilterTagProps[];
    allCheckbox: KeyObject;
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
    allCheckBoxOpen: true,
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


var withAllCheckBoxOpen = filterList.filter((e: any) => e.allCheckBoxOpen);

var allCheckBoxStatus: KeyObject = {};

withAllCheckBoxOpen.forEach((e) => {
    allCheckBoxStatus[e.filterKey] = false;
});

const initialState: InitialStateProps = {
    filterList: filterList,
    selectedList: [],
    allCheckbox: allCheckBoxStatus,
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        updateFilterList: (state, action: PayloadAction<any>) => {
            let filter = state.filterList.find(e => e.filterKey == action.payload.filterKey);

            if (filter != undefined) {
                let checkbox = filter.checkboxes.find(e => e.value == action.payload.value)
                if (checkbox != undefined) {
                    checkbox.checked = !checkbox.checked;
                }

                //tümü seçilimi kontrolü
                console.log("state.allCheckbox[action.payload.filterKey]", state.allCheckbox[action.payload.filterKey])
                if (state.allCheckbox[action.payload.filterKey] != undefined && state.allCheckbox[action.payload.filterKey] === false) {
                    console.log("xxxxxxxx");
                    console.log("filter.checkboxes.lengt", filter.checkboxes.length)
                    if (filter.checkboxes.length === filter.checkboxes.filter(e => e.checked).length) {
                        state.allCheckbox[action.payload.filterKey] = true;
                    }
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
                    .map((m: any) => {
                        m.filterKey = filterKey;
                        return m;
                    });
                if (checkedList != undefined && checkedList.length > 0) {
                    result.push(...checkedList);
                }
            });

            state.selectedList = result;
        },
        updateCheckedAll: (state, action: PayloadAction<any>) => {
            if (action.payload.filterKey != undefined) {
                state.allCheckbox[action.payload.filterKey] = action.payload.value;
            }
        }
    }
});

export const { updateFilterList, updateFilterListAll, refreshSelectedList, updateCheckedAll } = filterSlice.actions;
export default filterSlice.reducer;
