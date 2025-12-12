// src/app/(dashboard)/customers/page.jsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTableTanStack } from "@/components/dashboard/table/DataTableTanStack";

import {
  customersColumns,
  customersFilters,
  customerRowActions,
} from "@/config/tableConfig";
import { customersData } from "@/config/tableConfig";

export default function CustomersPage() {
  const [data] = useState(customersData);

  return (
    <div className="space-y-6">
      <DataTableTanStack
        id="customers-table"
        eyebrow= "Data Table"
title= "Customers Table"
subtitle= "A reusable CRUD-ready table with search, filters, and pagination."

        data={data}
        columns={customersColumns}
        filtersConfig={customersFilters}
        enableSearch
        enableColumnVisibility

        enableRowActions
        rowActions={customerRowActions}

        primaryAction={
          <Button size="sm" onClick={() => console.log("Add customer")}>
            Add Customer
          </Button>
        }

        onRowClick={(row) => console.log("Row clicked:", row)}
      />
    </div>
  );
}
