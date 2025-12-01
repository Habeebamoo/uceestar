export interface User {
  _id: string,
  name: string,
  email: string
}

export interface AdminDashboard {
  totalUsers: number,
  totalProducts: number,
  totalOrders: number,
  totalIncome: number
}