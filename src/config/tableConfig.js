
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";


export const customersColumns = [
  {
    id: "name",
    label: "Customer",
    accessor: "name",
    minWidth: "min-w-[240px]",
    cell: ({ value, row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{value}</span>
        <span className="text-xs text-muted-foreground">{row.email}</span>
      </div>
    ),
  },
  {
    id: "status",
    label: "Status",
    accessor: "status",
    align: "center",
    minWidth: "min-w-[120px]",
    cell: ({ value }) => (
      <Badge variant={value === "Active" ? "default" : "secondary"}>
        {value}
      </Badge>
    ),
  },
  {
    id: "plan",
    label: "Plan",
    accessor: "plan",
    align: "center",
    minWidth: "min-w-[120px]",
    cell: ({ value }) => (
      <Badge variant={value === "Pro" ? "default" : "outline"}>{value}</Badge>
    ),
  },
  {
    id: "orders",
    label: "Orders",
    accessor: "orders",
    align: "right",
    minWidth: "min-w-[110px]",
    cell: ({ value }) => <span className="tabular-nums">{value}</span>,
  },
  {
    id: "totalSpent",
    label: "Total Spent",
    accessor: "totalSpent",
    align: "right",
    minWidth: "min-w-[140px]",
    cell: ({ value }) => (
      <span className="tabular-nums">
        {Number(value).toLocaleString(undefined, {
          style: "currency",
          currency: "USD",
        })}
      </span>
    ),
  },
  {
    id: "lastOrder",
    label: "Last Order",
    accessor: (row) => new Date(row.lastOrder).toLocaleDateString(),
    align: "right",
    minWidth: "min-w-[140px]",
  },
  {
    id: "createdAt",
    label: "Created",
    accessor: (row) => new Date(row.createdAt).toLocaleDateString(),
    align: "right",
    minWidth: "min-w-[140px]",
  },
];

export const customersFilters = [
  {
    id: "status",
    label: "Status",
    columnId: "status",
    type: "select",
    includeAllOption: true,
    options: [
      { label: "Active", value: "Active" },
      { label: "Inactive", value: "Inactive" },
    ],
  },
  {
    id: "plan",
    label: "Plan",
    columnId: "plan",
    type: "select",
    includeAllOption: true,
    options: [
      { label: "Free", value: "Free" },
      { label: "Pro", value: "Pro" },
      { label: "Business", value: "Business" },
    ],
  },
];


export const customersData = [
  {
    name: "John Carter",
    email: "john.carter@acme.com",
    status: "Active",
    plan: "Pro",
    orders: 12,
    totalSpent: 1849.5,
    lastOrder: "2025-11-28T10:20:00Z",
    createdAt: "2025-02-14T08:00:00Z",
  },
  {
    name: "Emily Johnson",
    email: "emily.johnson@acme.com",
    status: "Active",
    plan: "Business",
    orders: 28,
    totalSpent: 6230.0,
    lastOrder: "2025-12-06T15:10:00Z",
    createdAt: "2024-10-09T09:30:00Z",
  },
  {
    name: "Michael Brown",
    email: "michael.brown@acme.com",
    status: "Inactive",
    plan: "Free",
    orders: 3,
    totalSpent: 149.99,
    lastOrder: "2025-08-19T12:05:00Z",
    createdAt: "2025-06-03T11:15:00Z",
  },
  {
    name: "Sophia Davis",
    email: "sophia.davis@acme.com",
    status: "Active",
    plan: "Pro",
    orders: 9,
    totalSpent: 980.75,
    lastOrder: "2025-11-14T18:42:00Z",
    createdAt: "2025-01-22T07:45:00Z",
  },
  {
    name: "Daniel Wilson",
    email: "daniel.wilson@acme.com",
    status: "Active",
    plan: "Free",
    orders: 5,
    totalSpent: 210.0,
    lastOrder: "2025-10-03T09:12:00Z",
    createdAt: "2025-09-01T10:00:00Z",
  },
  {
    name: "Olivia Martinez",
    email: "olivia.martinez@acme.com",
    status: "Active",
    plan: "Business",
    orders: 31,
    totalSpent: 7425.25,
    lastOrder: "2025-12-02T13:40:00Z",
    createdAt: "2024-11-21T16:20:00Z",
  },
  {
    name: "James Anderson",
    email: "james.anderson@acme.com",
    status: "Inactive",
    plan: "Pro",
    orders: 7,
    totalSpent: 615.0,
    lastOrder: "2025-09-11T08:30:00Z",
    createdAt: "2025-03-19T14:00:00Z",
  },
  {
    name: "Ava Thompson",
    email: "ava.thompson@acme.com",
    status: "Active",
    plan: "Pro",
    orders: 16,
    totalSpent: 2399.99,
    lastOrder: "2025-12-08T19:05:00Z",
    createdAt: "2025-02-02T09:10:00Z",
  },
  {
    name: "William Taylor",
    email: "william.taylor@acme.com",
    status: "Active",
    plan: "Free",
    orders: 2,
    totalSpent: 79.5,
    lastOrder: "2025-11-01T11:00:00Z",
    createdAt: "2025-10-25T10:30:00Z",
  },
  {
    name: "Mia Thomas",
    email: "mia.thomas@acme.com",
    status: "Inactive",
    plan: "Business",
    orders: 14,
    totalSpent: 3150.0,
    lastOrder: "2025-07-22T17:25:00Z",
    createdAt: "2024-12-05T12:45:00Z",
  },
  {
    name: "Benjamin Moore",
    email: "benjamin.moore@acme.com",
    status: "Active",
    plan: "Business",
    orders: 22,
    totalSpent: 4980.8,
    lastOrder: "2025-12-04T09:55:00Z",
    createdAt: "2025-01-05T08:05:00Z",
  },
  {
    name: "Charlotte Jackson",
    email: "charlotte.jackson@acme.com",
    status: "Active",
    plan: "Pro",
    orders: 11,
    totalSpent: 1325.4,
    lastOrder: "2025-11-21T14:18:00Z",
    createdAt: "2025-04-12T10:10:00Z",
  },
  {
    name: "Henry White",
    email: "henry.white@acme.com",
    status: "Inactive",
    plan: "Free",
    orders: 1,
    totalSpent: 29.99,
    lastOrder: "2025-06-30T10:00:00Z",
    createdAt: "2025-06-18T09:00:00Z",
  },
  {
    name: "Amelia Harris",
    email: "amelia.harris@acme.com",
    status: "Active",
    plan: "Pro",
    orders: 18,
    totalSpent: 2875.65,
    lastOrder: "2025-12-01T20:12:00Z",
    createdAt: "2024-09-17T07:35:00Z",
  },
  {
    name: "Lucas Martin",
    email: "lucas.martin@acme.com",
    status: "Active",
    plan: "Free",
    orders: 6,
    totalSpent: 340.2,
    lastOrder: "2025-10-18T16:40:00Z",
    createdAt: "2025-08-07T11:25:00Z",
  },
];



// base row actions (you control behavior from the page)
export const customerRowActions = (row) => [
  {
    id: "details",
    label: "View",
    icon: Eye,
    onClick: () => console.log("View:", row),
  },
  {
    id: "edit",
    label: "Edit",
    icon: Pencil,
    onClick: () => console.log("Edit:", row),
  },
  {
    id: "delete",
    label: "Delete",
    icon: Trash2,
    className: "text-destructive hover:text-destructive",
    onClick: () => console.log("Delete:", row),
  },
];
