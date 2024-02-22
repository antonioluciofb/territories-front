/* eslint-disable react-hooks/exhaustive-deps */
import { arraySelectorOptions } from '@Constants/optionsSelector';
import { useContextHook } from '@Context/index';
import React, { useEffect, useState } from 'react';
import ReactSelect from 'react-select';

// import { Container } from './styles';

interface Filter {
  name: string;
  field: string;
  values: string[];
}

interface SelectedField {
  field: string;
  value: string;
}

interface IFilterBar {
  filterOptions: Filter[];
  setFilters: (filters: SelectedField[]) => void;
}

// eslint-disable-next-line no-empty-pattern
const FilterBar: React.FC<IFilterBar> = ({ filterOptions, setFilters }) => {
  const { setCreateNew, selectedOption } = useContextHook();

  const [filterValues, setFilterValues] = useState<{
    [key: string]: { field: string; value: string };
  }>({});

  useEffect(() => {
    setFilters(Object.values(filterValues));
  }, [filterValues]);

  const fieldValuesFormat = (values: string[]) => {
    const selectOptions = values?.map((value) => ({
      value,
      label: value,
    }));

    const selectedOptionsSorted = selectOptions?.sort((a, b) => {
      const aIsNumber = !isNaN(Number(a?.label));
      const bIsNumber = !isNaN(Number(b?.label));

      if (aIsNumber && bIsNumber) {
        return Number(a?.label) - Number(b?.label);
      }

      return a?.label?.localeCompare(b?.label);
    });

    return selectedOptionsSorted;
  };

  const optionSelected = arraySelectorOptions.find(
    (option) => option.key === selectedOption,
  );

  const hoverColor =
    selectedOption === 'dontVisit'
      ? 'hover:bg-red-500 hover:border-red-700'
      : 'hover:bg-green-500 hover:border-green-700';

  return (
    <div className="w-full flex flex-col xl:flex-row justify-between items-center bg-white rounded-2xl shadow-md p-4 px-6    mb-4">
      <div className="w-full sm:w-2/4 md:w-fit flex justify-center items-center flex-col md:flex-row gap-4">
        <p className="text-gray-900 rounded-l-full text-lg font-bold">
          Filtros:
        </p>
        {filterOptions?.map((filter) => (
          <ReactSelect
            className="w-full md:w-44 lg:w-56"
            isClearable
            isSearchable
            options={fieldValuesFormat(filter.values)}
            placeholder={filter.name}
            onChange={(selectedOption) => {
              if (selectedOption) {
                setFilterValues((prev) => ({
                  ...prev,
                  [filter.field]: {
                    field: filter.field,
                    value: selectedOption.value,
                  },
                }));
              } else {
                setFilterValues((prev) => {
                  const newFilters = { ...prev };
                  delete newFilters[filter.field];
                  return newFilters;
                });
              }
            }}
          />
        ))}
      </div>
      {optionSelected?.hasButton && (
        <button
          className={`w-full md:w-6/12 xl:w-2/12 px-20 xl:px-0 mt-6 xl:mt-0 h-16 bg-white border-2 border-gray-800 text-gray-800 hover:text-white duration-300 font-bold text-lg rounded-full ${hoverColor} cursor-pointer`}
          onClick={() => setCreateNew(selectedOption)}
        >
          Novo{' '}
          {
            arraySelectorOptions.find((option) => option.key === selectedOption)
              ?.uniteText
          }
        </button>
      )}
    </div>
  );
};

export default FilterBar;
