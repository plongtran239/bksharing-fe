"use client";

// import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface IDataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  searchBy?: string;
  filterBy?: string;
  filterOptions?: string[];
  getRowClassName?: (row: T) => string;
  noFilterAll?: boolean;
}

const DataTable = <T,>({
  data,
  columns,
  searchBy,
  filterBy,
  filterOptions,
  noFilterAll = false,
  getRowClassName,
}: IDataTableProps<T>) => {
  const t = useTranslations("sidebar");
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const status = params.get("status");

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState(status || "all");

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  useEffect(() => {
    if (filterBy) {
      if (status) {
        table.getColumn("status")?.setFilterValue(status);
        setFilterStatus(status);
      } else {
        table.getColumn("status")?.setFilterValue(undefined);
        setFilterStatus("all");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, filterStatus]);

  return (
    <div className="">
      {/* Heading */}
      <div className="flex-between gap-2">
        {searchBy && (
          <Input
            placeholder={`Tìm kiếm`}
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              table.getColumn(searchBy)?.setFilterValue(event.target.value);
            }}
            className="max-w-sm"
          />
        )}

        {filterBy && filterOptions && (
          <Select
            value={filterStatus || "all"}
            onValueChange={(value) => {
              if (value === "all") {
                router.replace(pathname);
              } else {
                router.replace(`${pathname}?status=${value}`);
              }
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {!noFilterAll && <SelectItem value="all">Tất cả</SelectItem>}

              <Separator className="my-1" />

              {filterOptions.map((status) => (
                <SelectItem key={status} value={status}>
                  {t(status.toLowerCase())}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {covertCamelCaseToTitleCase(column.id)}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>

      {/* Table */}
      <div className="mt-5 rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={
                    getRowClassName ? getRowClassName(row.original) : ""
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Không có dữ liệu
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Count selected & navigation */}
      <div className="mt-5 flex items-center justify-end space-x-2">
        {/* <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div> */}
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Trước
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Sau
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
