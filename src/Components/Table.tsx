/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import clsx from 'clsx';
import { ArrowFatLinesDown, ArrowFatLinesUp, Spinner } from 'phosphor-react';
import { squashBlocks } from '@Utils/cards';
import { convertStringDateToCompleteDate } from '@Utils/date';
import FilterBar from './FilterBar';
import { alphabetArray } from '@Constants/cards';

interface TableColumn {
  key: string;
  label: string;
}

interface TableProps {
  data?: any[];
  columns: TableColumn[];
  actionButtons?: React.ReactNode[];
  isLoading?: boolean;
  filters?: {
    name: string;
    field: string;
  }[];
}

const Table: React.FC<TableProps> = ({
  data,
  columns,
  actionButtons,
  isLoading,
  filters,
}) => {
  const [filtersState, setFiltersState] = useState<
    {
      field: string;
      value: string;
    }[]
  >([]);

  const [sortDetails, setSortDetails] = useState<{
    sort: string;
    order: 'asc' | 'desc' | '';
  }>({
    sort: '',
    order: '',
  });

  const handleSetSort = (name: string) => {
    if (sortDetails.sort === name) {
      if (sortDetails.order === 'asc') {
        setSortDetails({
          sort: name,
          order: 'desc',
        });
        return;
      }
      setSortDetails({
        sort: '',
        order: '',
      });
      return;
    }
    setSortDetails({
      sort: name,
      order: 'asc',
    });
  };

  const inProgressOrder = ['Em progresso', 'Não iniciado', 'Finalizado'];

  const sortedData =
    sortDetails.order !== '' && data
      ? [...data].sort((a, b) => {
          const aValue =
            a[sortDetails.sort]?.props?.text || a[sortDetails.sort];
          const bValue =
            b[sortDetails.sort]?.props?.text || b[sortDetails.sort];

          if (sortDetails.sort === 'status') {
            if (
              inProgressOrder.indexOf(aValue) < inProgressOrder.indexOf(bValue)
            ) {
              return sortDetails.order === 'asc' ? -1 : 1;
            }

            if (
              inProgressOrder.indexOf(aValue) > inProgressOrder.indexOf(bValue)
            ) {
              return sortDetails.order === 'asc' ? 1 : -1;
            }

            return 0;
          }

          if (sortDetails.sort === 'name') {
            const aFirstLetter = aValue[0].toLowerCase();
            const bFirstLetter = bValue[0].toLowerCase();

            const aNameValue =
              Number(aValue.replace(/\D/g, '')) +
              alphabetArray.indexOf(aFirstLetter) * 10;
            const bNameValue =
              Number(bValue.replace(/\D/g, '')) +
              alphabetArray.indexOf(bFirstLetter) * 10;

            if (aNameValue < bNameValue) {
              return sortDetails.order === 'asc' ? -1 : 1;
            } else if (aNameValue > bNameValue) {
              return sortDetails.order === 'asc' ? 1 : -1;
            }
          }

          if (aValue < bValue) {
            return sortDetails.order === 'asc' ? -1 : 1;
          }
          if (aValue > bValue) {
            return sortDetails.order === 'asc' ? 1 : -1;
          }
          return 0;
        })
      : data;

  const filterDataRecursively = (data: any[], filters: any[]): any[] => {
    if (filters.length === 0) return data;

    const [filter, ...restFilters] = filters;

    const filteredData = data?.filter((item) => {
      const currValue = item[filter.field]?.props?.text || item[filter.field];

      if (currValue === filter.value) return true;

      return false;
    });

    return filterDataRecursively(filteredData, restFilters);
  };

  const filteredData = filterDataRecursively(sortedData || [], filtersState);

  const tableData = filteredData;

  const hasActionButtons = actionButtons && actionButtons.length > 0;

  const regexDate = new RegExp(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);

  const generetedFilters = filters
    ? filters?.flatMap((filter) => ({
        ...filter,
        values: sortedData?.reduce((acc, curr) => {
          let currValue =
            curr?.[filter?.field]?.props?.text || curr[filter.field];

          if (currValue === '---') return acc;

          // is Date
          if (regexDate.test(currValue)) {
            currValue = convertStringDateToCompleteDate(currValue);
          }

          if (acc.includes(currValue)) return acc;

          return [...acc, currValue];
        }, []),
      }))
    : [];

  return (
    <div className="w-11/12 flex flex-col items-center justify-center mb-8">
      {filters && (
        <FilterBar
          filterOptions={generetedFilters}
          setFilters={(filters) => {
            setFiltersState(filters);
          }}
        />
      )}
      <div className="w-full min-w[2000px] overflow-x-auto">
        {hasActionButtons && (
          <div className="w-full px-8 py-4 bg-white rounded-t-xl flex justify-end items-center">
            {actionButtons?.map((button) => button)}
          </div>
        )}
        <table
          className={clsx(
            'w-full min-w[2000px] text-sm text-left text-gray-500 dark:text-gray-400 rounded-b-xl overflow-hidden',
            !hasActionButtons && 'rounded-t-xl',
          )}
        >
          <thead className="w-full text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={clsx(
                    'text-lg py-2 px-6 cursor-pointer',
                    sortDetails.sort === column.key &&
                      'font-bold text-green-500',
                  )}
                  onClick={() => handleSetSort(column.key)}
                >
                  <div className="flex items-center">
                    {column.label}
                    {sortDetails.order === 'asc' ? (
                      <ArrowFatLinesUp
                        size={20}
                        weight="fill"
                        className={
                          sortDetails.sort === column.key
                            ? 'ml-2 fill-green-500'
                            : 'ml-2 fill-transparent'
                        }
                      />
                    ) : (
                      <ArrowFatLinesDown
                        size={20}
                        weight="fill"
                        className={
                          sortDetails.sort === column.key
                            ? 'ml-2 fill-green-500'
                            : 'ml-2 fill-transparent'
                        }
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="w-full">
            {isLoading && (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td
                  colSpan={columns.length}
                  className="text-lg py-8 px-6 text-center"
                >
                  <div className="flex items-center justify-center">
                    <Spinner
                      size={48}
                      className="mr-4 animate-spin text-green-600"
                      weight="bold"
                    />
                    Carregando informações...
                  </div>
                </td>
              </tr>
            )}

            {!isLoading && tableData?.length === 0 && (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td
                  colSpan={columns.length}
                  className="text-lg py-8 px-6 text-center"
                >
                  Nenhuma informação encontrada
                </td>
              </tr>
            )}

            {!isLoading &&
              tableData?.map((item, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  {columns.map((column) => (
                    <td key={column.key} className="text-lg py-4 px-6">
                      {column.key === 'createdAt'
                        ? convertStringDateToCompleteDate(item[column.key])
                        : column.key === 'pendingBlock'
                        ? squashBlocks(item[column.key])
                        : item[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
