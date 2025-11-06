export const platformAnalytics = {
  overview: {
    totalRevenue: 2876540,
    revenueGrowth: 18.5,
    totalOrders: 5847,
    ordersGrowth: 12.3,
    totalUsers: 2453,
    usersGrowth: 24.7,
    activeSellers: 156,
    sellersGrowth: 8.9
  },
  
  monthlyRevenue: [
    { month: 'Jan', revenue: 432000 },
    { month: 'Feb', revenue: 567000 },
    { month: 'Mar', revenue: 698000 },
    { month: 'Apr', revenue: 876540 },
    { month: 'May', revenue: 303000 }  // Current month partial
  ],
  
  categoryPerformance: [
    { category: 'Electronics', sales: 1234567, orders: 1823, growth: 22.5 },
    { category: 'Fashion', sales: 987654, orders: 2145, growth: 15.8 },
    { category: 'Home & Living', sales: 456789, orders: 876, growth: -3.2 },
    { category: 'Books', sales: 234567, orders: 1456, growth: 31.4 },
    { category: 'Sports', sales: 198765, orders: 547, growth: 8.7 }
  ],
  
  topSellers: [
    { 
      id: 'seller002',
      name: 'Fashion Fusion', 
      revenue: 678910, 
      orders: 1247, 
      rating: 4.6,
      growth: 18.3
    },
    { 
      id: 'seller001',
      name: 'TechVista Electronics', 
      revenue: 456789, 
      orders: 892, 
      rating: 4.8,
      growth: 24.5
    },
    { 
      id: 'seller005',
      name: 'BookWorm Central', 
      revenue: 345678, 
      orders: 1567, 
      rating: 4.9,
      growth: 32.1
    },
    { 
      id: 'seller003',
      name: 'StepStyle Footwear', 
      revenue: 234567, 
      orders: 534, 
      rating: 4.7,
      growth: 11.2
    },
    { 
      id: 'seller006',
      name: 'Gadget Galaxy', 
      revenue: 567890, 
      orders: 923, 
      rating: 4.5,
      growth: 15.8
    }
  ],
  
  userMetrics: {
    totalCustomers: 2453,
    newCustomersThisMonth: 287,
    activeCustomers: 1876,
    averageOrderValue: 2347,
    repeatCustomerRate: 42.5
  },
  
  productMetrics: {
    totalProducts: 4567,
    activeListings: 3892,
    pendingApproval: 45,
    outOfStock: 234,
    lowStock: 456
  },
  
  orderMetrics: {
    processing: 156,
    shipped: 234,
    delivered: 4987,
    returned: 178,
    cancelled: 292,
    returnRate: 3.04,
    cancellationRate: 5.00
  }
};
