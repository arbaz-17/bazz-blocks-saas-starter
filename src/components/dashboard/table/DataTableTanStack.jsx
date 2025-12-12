// src/components/data-table/DataTableTanStack.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { DataTableCard } from "./DataTableCard";
import { TableToolbar } from "./TableToolbar";
import { TablePagination } from "./TablePagination";
import { TableSelectionBar } from "./TableSelectionBar";
import { TableColumnVisibilityMenu } from "./TableColumnVisibilityMenu";
import { TableRowActions } from "./TableRowActions";
import { TableFiltersSheet } from "./TableFiltersSheet";

function getAlignClass(align) {
  if (align === "right") return "text-right";
  if (align === "center") return "text-center";
  return "text-left";
}

function SortIcon({ state }) {
  const base = "h-3.5 w-3.5";
  if (!state) return <ArrowUpDown className={cn(base, "text-muted-foreground/70")} aria-hidden="true" />;
  if (state === "asc") return <ArrowUp className={cn(base, "text-foreground")} aria-hidden="true" />;
  return <ArrowDown className={cn(base, "text-foreground")} aria-hidden="true" />;
}

/**
 * UiColumnDef shape (free/base)
 * - id, label
 * - accessor: string | (row)=>any
 * - optional cell({ row, value, rowIndex, column })
 * - optional align, minWidth, headerClassName, cellClassName
 */

export function DataTableTanStack({
  id,
  title,
  subtitle,
  eyebrow,
  totalCount,

  data,
  columns,

  loading = false,
  error = null,

  enableSearch = true,
  searchPlaceholder = "Search records...",

  // Toolbar slots
  toolbarFilters,
  primaryAction,
  secondaryActions,
  toolbarRightExtras,

  // Optional: filters sheet (column filters)
  filtersConfig,

  // Optional: row selection
  enableRowSelection = false,
  renderSelectionActions,
  onRowSelectionChange,

  // Optional: row actions
  enableRowActions = false,
  rowActions,
  actionsHeaderLabel = "Actions",
  actionsAlign = "right",

  // Optional: column visibility
  enableColumnVisibility = true,

  // Pagination
  pageSizeOptions = [10, 25, 50, 100],
  initialPageSize = 10,
  initialSorting = [],

  // Optional: row click hook (free replaces RecordDetailsDialog)
  onRowClick,

  className,
}) {
  const [sorting, setSorting] = useState(initialSorting);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: initialPageSize,
  });
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const tanstackColumns = useMemo(() => {
    return (columns || []).map((col) => {
      const accessorIsString = typeof col.accessor === "string";
      const accessorIsFn = typeof col.accessor === "function";

      return {
        id: col.id,
        accessorKey: accessorIsString ? col.accessor : undefined,
        accessorFn: accessorIsFn ? (row, index) => col.accessor(row, index) : undefined,
        header: col.label || col.id,
        cell: col.cell
          ? (ctx) =>
              col.cell({
                row: ctx.row.original,
                value: ctx.getValue(),
                rowIndex: ctx.row.index,
                column: col,
              })
          : (ctx) => ctx.getValue(),
        enableSorting: col.sortable !== false,
        enableGlobalFilter: col.enableGlobalFilter !== false,
        enableHiding: col.enableHiding !== false,
        meta: {
          ui: {
            id: col.id,
            label: col.label || col.id,
            align: col.align,
            minWidth: col.minWidth,
            headerClassName: col.headerClassName,
            cellClassName: col.cellClassName,
          },
        },
      };
    });
  }, [columns]);

  const table = useReactTable({
    data: data || [],
    columns: tanstackColumns,
    state: {
      sorting,
      globalFilter,
      pagination,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection,
    enableSortingRemoval: true,
  });

  useEffect(() => {
    if (!onRowSelectionChange) return;
    const selectedRows = table.getSelectedRowModel().rows.map((r) => r.original);
    onRowSelectionChange(selectedRows, rowSelection);
  }, [rowSelection, onRowSelectionChange, table]);

  const currentRowModel = table.getRowModel();
  const hasRows = currentRowModel.rows.length > 0;

  const resolvedTotalCount =
    typeof totalCount === "number"
      ? totalCount
      : table.getPrePaginationRowModel().rows.length;

  const isEmptyState = !loading && !error && !hasRows;

  // Column visibility menu config
  const columnMenuConfig = enableColumnVisibility
    ? table.getAllLeafColumns().map((col) => {
        const meta = col.columnDef.meta?.ui || {};
        const label =
          typeof col.columnDef.header === "string"
            ? col.columnDef.header
            : meta.label || col.id;

        return {
          id: col.id,
          label,
          visible: col.getIsVisible(),
          disableToggle: !col.getCanHide(),
          pinned: false,
        };
      })
    : [];

  const columnVisibilityMenu =
    enableColumnVisibility && columnMenuConfig.length ? (
      <TableColumnVisibilityMenu
        columns={columnMenuConfig}
        onToggleColumn={(id, visible) => {
          const column = table.getColumn(id);
          if (!column) return;
          column.toggleVisibility(visible);
        }}
        onReset={() => table.resetColumnVisibility()}
        showReset
      />
    ) : null;

  // Selection bar
  let selectionBarNode = null;
  if (enableRowSelection) {
    const selectionModel = table.getSelectedRowModel();
    const selectedCount = selectionModel.rows.length;

    if (selectedCount > 0) {
      const selectedOriginalRows = selectionModel.rows.map((r) => r.original);
      selectionBarNode = (
        <TableSelectionBar
          count={selectedCount}
          onClear={() => table.resetRowSelection()}
          actions={renderSelectionActions ? renderSelectionActions(selectedOriginalRows) : null}
        />
      );
    }
  }

  const toolbarNode = (
    <TableToolbar
      showSearch={enableSearch}
      searchValue={globalFilter}
      onSearchChange={setGlobalFilter}
      searchPlaceholder={searchPlaceholder}
      filters={toolbarFilters}
      primaryAction={primaryAction}
      secondaryActions={secondaryActions}
      rightExtras={
        <>
          {filtersConfig && filtersConfig.length > 0 && (
            <TableFiltersSheet table={table} filtersConfig={filtersConfig} />
          )}
          {columnVisibilityMenu}
          {toolbarRightExtras}
        </>
      }
    />
  );

  const tablePaginationState = table.getState().pagination;
  const pageIndex = tablePaginationState.pageIndex;
  const pageSize = tablePaginationState.pageSize;
  const totalItems = table.getPrePaginationRowModel().rows.length;

  const paginationNode = (
    <TablePagination
      page={pageIndex + 1}
      pageSize={pageSize}
      totalItems={totalItems}
      pageSizeOptions={pageSizeOptions}
      onPageChange={(nextPage) => table.setPageIndex(Math.max(nextPage - 1, 0))}
      onPageSizeChange={(nextSize) => table.setPageSize(nextSize)}
    />
  );

  const hasRowActions = Boolean(enableRowActions && rowActions);
  const actionsAlignClass =
    actionsAlign === "left" ? "text-left" : actionsAlign === "center" ? "text-center" : "text-right";

  return (
    <DataTableCard
      id={id}
      title={title}
      subtitle={subtitle}
      eyebrow={eyebrow}
      totalCount={resolvedTotalCount}
      loading={loading}
      error={error}
      isEmpty={isEmptyState}
      toolbar={toolbarNode}
      selectionBar={selectionBarNode}
      pagination={paginationNode}
      className={className}
    >
      <div className="w-full overflow-x-auto rounded-lg border border-border/60 bg-card">
        <Table className="w-full text-sm">
          <TableHeader className="sticky top-0 z-10 bg-muted/60 backdrop-blur supports-[backdrop-filter]:bg-background/80">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b border-border/70 hover:bg-transparent">
                {enableRowSelection && (
                  <TableHead className="w-[2.75rem] px-3 py-2 text-center align-middle">
                    <div data-no-row-click className="inline-flex">
                      <Checkbox
                        checked={table.getIsAllPageRowsSelected()}
                        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                        aria-label="Select all rows on page"
                        className="h-4 w-4"
                      />
                    </div>
                  </TableHead>
                )}

                {headerGroup.headers.map((header) => {
                  if (header.isPlaceholder) {
                    return <TableHead key={header.id} className="px-3 py-2" />;
                  }

                  const meta = header.column.columnDef.meta?.ui || {};
                  const alignClass = getAlignClass(meta.align);
                  const isSortable = header.column.getCanSort();
                  const sortState = header.column.getIsSorted();

                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        "px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground/85 whitespace-nowrap",
                        alignClass,
                        meta.minWidth,
                        meta.headerClassName,
                        isSortable && "cursor-pointer select-none hover:text-foreground",
                        sortState && "text-foreground",
                      )}
                      onClick={isSortable ? header.column.getToggleSortingHandler() : undefined}
                    >
                      <div
                        className={cn(
                          "flex items-center gap-1.5",
                          meta.align === "right" && "justify-end",
                          meta.align === "center" && "justify-center",
                        )}
                      >
                        <span>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </span>
                        {isSortable && <SortIcon state={sortState} />}
                      </div>
                    </TableHead>
                  );
                })}

                {hasRowActions && (
                  <TableHead className={cn("px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground/85", actionsAlignClass)}>
                    {actionsHeaderLabel}
                  </TableHead>
                )}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {currentRowModel.rows.map((row) => {
              const isSelected = row.getIsSelected();

              return (
                <TableRow
                  key={row.id}
                  data-state={isSelected ? "selected" : undefined}
                  className={cn(
                    "border-b border-border/50 last:border-b-0",
                    "hover:bg-muted/30",
                    onRowClick && "cursor-pointer",
                    isSelected && "bg-primary/5",
                  )}
                  onClick={(event) => {
                    if (!onRowClick) return;
                    const target = event.target;
                    if (
                      target instanceof HTMLElement &&
                      target.closest("button, a, input, label, [data-no-row-click]")
                    ) {
                      return;
                    }
                    onRowClick(row.original);
                  }}
                >
                  {enableRowSelection && (
                    <TableCell className="px-3 py-2 text-center align-middle">
                      <div data-no-row-click className="inline-flex">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={(value) => row.toggleSelected(!!value)}
                          aria-label="Select row"
                          className="h-4 w-4"
                        />
                      </div>
                    </TableCell>
                  )}

                  {row.getVisibleCells().map((cell) => {
                    const meta = cell.column.columnDef.meta?.ui || {};
                    const alignClass = getAlignClass(meta.align);

                    return (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          "px-3 py-2 text-xs md:text-sm align-middle",
                          alignClass,
                          meta.minWidth,
                          meta.cellClassName,
                        )}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    );
                  })}

                  {hasRowActions && (
                    <TableCell className={cn("px-3 py-2 align-middle", actionsAlignClass)}>
                      <div data-no-row-click>
                        <TableRowActions row={row.original} actions={rowActions} align={actionsAlign} />
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </DataTableCard>
  );
}
