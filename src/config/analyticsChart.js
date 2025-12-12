// src/config/analyticsCharts.js

// AREA: Revenue vs Expenses vs Profit (12 months)
export const revenueTrendConfig = {
  revenue: { label: "Revenue", color: "var(--chart-1)" },
  expenses: { label: "Expenses", color: "var(--chart-2)" },
  profit: { label: "Profit", color: "var(--chart-3)" },
};

export const revenueTrendData = [
  { month: "January", revenue: 10400, expenses: 6800, profit: 3600 },
  { month: "February", revenue: 11250, expenses: 7050, profit: 4200 },
  { month: "March", revenue: 12600, expenses: 7600, profit: 5000 },
  { month: "April", revenue: 11900, expenses: 7400, profit: 4500 },
  { month: "May", revenue: 13850, expenses: 8100, profit: 5750 },
  { month: "June", revenue: 14520, expenses: 8350, profit: 6170 },
  { month: "July", revenue: 15210, expenses: 8900, profit: 6310 },
  { month: "August", revenue: 14980, expenses: 8720, profit: 6260 },
  { month: "September", revenue: 16110, expenses: 9150, profit: 6960 },
  { month: "October", revenue: 17040, expenses: 9600, profit: 7440 },
  { month: "November", revenue: 18220, expenses: 10350, profit: 7870 },
  { month: "December", revenue: 19580, expenses: 11200, profit: 8380 },
];

// BAR: Signups by channel (12 months)
export const signupsByChannelConfig = {
  organic: { label: "Organic", color: "var(--chart-1)" },
  ads: { label: "Paid Ads", color: "var(--chart-4)" },
  referrals: { label: "Referrals", color: "var(--chart-2)" },
};

export const signupsByChannelData = [
  { month: "January", organic: 420, ads: 180, referrals: 110 },
  { month: "February", organic: 460, ads: 210, referrals: 125 },
  { month: "March", organic: 520, ads: 260, referrals: 140 },
  { month: "April", organic: 505, ads: 240, referrals: 138 },
  { month: "May", organic: 610, ads: 310, referrals: 165 },
  { month: "June", organic: 640, ads: 330, referrals: 172 },
  { month: "July", organic: 670, ads: 360, referrals: 185 },
  { month: "August", organic: 655, ads: 345, referrals: 180 },
  { month: "September", organic: 710, ads: 390, referrals: 210 },
  { month: "October", organic: 760, ads: 420, referrals: 225 },
  { month: "November", organic: 820, ads: 470, referrals: 260 },
  { month: "December", organic: 900, ads: 520, referrals: 300 },
];

// RADIAL (stacked gauge style): Plan mix (single row)
export const planMixConfig = {
  starter: { label: "Starter", color: "var(--chart-2)" },
  pro: { label: "Pro", color: "var(--chart-1)" },
  premium: { label: "Premium", color: "var(--chart-4)" },
};

export const planMixData = [
  { starter: 420, pro: 260, premium: 110 },
];
