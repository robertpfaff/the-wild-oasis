import { createSlice, createSelector } from '@reduxjs/toolkit';
import { cabinsData } from '../../data/cabinsData';

const initialState = {
  cabins: cabinsData,
  selectedCabin: null,
  filters: {
    minPrice: 0,
    maxPrice: 1000,
    minCapacity: 1,
  },
};

const cabinsSlice = createSlice({
  name: 'cabins',
  initialState,
  reducers: {
    selectCabin: (state, action) => {
      state.selectedCabin = state.cabins.find(cabin => cabin.id === action.payload);
    },
    clearSelectedCabin: (state) => {
      state.selectedCabin = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const { selectCabin, clearSelectedCabin, setFilters } = cabinsSlice.actions;

export const selectAllCabins = (state) => state.cabins.cabins;
export const selectCabinById = (state, cabinId) => 
  state.cabins.cabins.find(cabin => cabin.id === cabinId);

const selectCabinsData = (state) => state.cabins.cabins;
const selectFilters = (state) => state.cabins.filters;

export const selectFilteredCabins = createSelector(
  [selectCabinsData, selectFilters],
  (cabins, filters) => cabins.filter(cabin => 
    cabin.price >= filters.minPrice &&
    cabin.price <= filters.maxPrice &&
    cabin.maxCapacity >= filters.minCapacity
  )
);

export const selectCurrentCabin = (state) => state.cabins.selectedCabin;

export default cabinsSlice.reducer;
