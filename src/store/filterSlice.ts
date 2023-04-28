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
    filterName: "Eğitim Adı",
    filterKey: "EducationName",
    searchBoxOpen: true,
    allCheckBoxOpen: true,
    checkboxes: [
        { text: "Fotoğraf", value: "Fotograf", checked: false },
        { text: "Yazılım", value: "Yazilim", checked: false },
        { text: "Eğitim Test", value: "EgitimTest", checked: false },
        { text: "Eğitim Test 2", value: "EgitimTest2", checked: false },
        { text: "Eğitim Test 3", value: "EgitimTest3", checked: false },
        { text: "Eğitim Test 4", value: "EgitimTest4", checked: false },
        { text: "Eğitim Test 5", value: "EgitimTest5", checked: false },

    ]
},
{
    filterName: "Eğitim Tipi",
    filterKey: "EducationType",
    checkboxes: [
        { text: "Online", value: "Online", checked: false },
        { text: "Sınıf İçi", value: "SinifIci", checked: false },
    ]

},
{
    filterName: "Eğitim Kategorisi",
    filterKey: "EducationCategory",
    searchBoxOpen: true,
    allCheckBoxOpen: true,
    checkboxes: [
        { text: "Eğitim Kategorisi", value: "EgitimKategorisi", checked: false },
        { text: "Eğitim Kategorisi 2", value: "EgitimKategorisi2", checked: false },
        { text: "Eğitim Kategorisi 3", value: "EgitimKategorisi3", checked: false },
        { text: "Eğitim Kategorisi 4", value: "EgitimKategorisi4", checked: false },
        { text: "Eğitim Kategorisi 5", value: "EgitimKategorisi5", checked: false },

    ]

},
{
    filterName: "Eğitim Alt Kategorisi",
    filterKey: "EducationAltCategory",
    searchBoxOpen: true,
    allCheckBoxOpen: true,
    checkboxes: [
        { text: "Eğitim Alt Kategorisi", value: "EgitimAltKategorisi", checked: false },
        { text: "Eğitim Alt Kategorisi 2", value: "EgitimAltKategorisi2", checked: false },
        { text: "Eğitim Alt Kategorisi 3", value: "EgitimAltKategorisi3", checked: false },
        { text: "Eğitim Alt Kategorisi 4", value: "EgitimAltKategorisi4", checked: false },
        { text: "Eğitim Alt Kategorisi 5", value: "EgitimAltKategorisi5", checked: false },

    ]

},
{
    filterName: "Eğitim Sunum Yöntemi",
    filterKey: "EducationDeliverMethod",
    checkboxes: [
        { text: "Online", value: "Online", checked: false },
        { text: "Sınıf İçi", value: "SinifIci", checked: false },
    ]

},
{
    filterName: "Eğitim Dili",
    filterKey: "EducationLanguage",
    checkboxes: [
        { text: "Türkçe", value: "Turkce", checked: false },
        { text: "İngilizce", value: "English", checked: false },

    ]

},
{
    filterName: "Eğitim Şirketi",
    filterKey: "EducationCompany",
    searchBoxOpen: true,
    allCheckBoxOpen: true,
    checkboxes: [
        { text: "Eğitim Şirketi", value: "EgitimSirketi", checked: false },
        { text: "Eğitim Şirketi 2", value: "EgitimSirketi2", checked: false },
        { text: "Eğitim Şirketi 3", value: "EgitimSirketi3", checked: false },
        { text: "Eğitim Şirketi 4", value: "EgitimSirketi4", checked: false },
        { text: "Eğitim Şirketi 5", value: "EgitimSirketi5", checked: false },

    ]

},
{
    filterName: "Eğitim Seviyesi",
    filterKey: "EducationLevel",
    checkboxes: [
        { text: "Başlangıç", value: "Baslangic", checked: false },
        { text: "İleri", value: "Ileri", checked: false },

    ]

},
{
    filterName: "Eğitim Etiketleri",
    filterKey: "EducationTag",
    searchBoxOpen: true,
    allCheckBoxOpen: true,
    checkboxes: [
        { text: "Eğitim Etiketleri", value: "EgitimEtiketleri", checked: false },
        { text: "Eğitim Etiketleri 2", value: "EgitimEtiketleri2", checked: false },
        { text: "Eğitim Etiketleri 3", value: "EgitimEtiketleri3", checked: false },
        { text: "Eğitim Etiketleri 4", value: "EgitimEtiketleri4", checked: false },
        { text: "Eğitim Etiketleri 5", value: "EgitimEtiketleri5", checked: false },
    ]
},
{
    filterName: "Sertifika",
    filterKey: "Sertifika",
    checkboxes: [
        { text: "Var", value: "Var", checked: false },
        { text: "Yok", value: "Yok", checked: false },

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
        clearFilter: (state) => {
            state.filterList.forEach((e) => {
                e.checkboxes.forEach(c => { c.checked = false })
            })

            for (const property in state.allCheckbox) {
                state.allCheckbox[property] = false;
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
        },
    }
});

export const { updateFilterList, updateFilterListAll, clearFilter, refreshSelectedList, updateCheckedAll } = filterSlice.actions;
export default filterSlice.reducer;
