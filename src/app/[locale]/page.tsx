'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { useRouter, usePathname } from 'next/navigation'
import { CalendarIcon, TrendingUp, Package, AlertTriangle, FileText, Search, BarChart3, PieChart, Activity, DollarSign, ShoppingCart, Warehouse, Zap } from 'lucide-react'
import { Pagination } from '@/components/ui/pagination-component'
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart as RechartsPieChart, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Pie } from 'recharts'

export default function InventoryManagementSystem() {
  const t = useTranslations()
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [reportType, setReportType] = useState('weekly')
  const [searchChar, setSearchChar] = useState('')
  
  // Pagination states
  const [stockPage, setStockPage] = useState(1)
  const [stockPageSize, setStockPageSize] = useState(10)
  const [financialPage, setFinancialPage] = useState(1)
  const [financialPageSize, setFinancialPageSize] = useState(10)

  const handleLanguageChange = (newLocale: string) => {
    const currentPath = pathname.split('/').slice(2).join('/')
    router.push(`/${newLocale}/${currentPath}`)
  }

  // Mock data for demonstration - larger datasets for pagination
  const financialData = [
    { id: 1, category: t('reports.financial.revenue'), amount: 45000, change: '+12%' },
    { id: 2, category: t('reports.financial.expenses'), amount: 28000, change: '-5%' },
    { id: 3, category: t('reports.financial.profit'), amount: 17000, change: '+18%' },
    { id: 4, category: 'Cost of Goods Sold', amount: 15000, change: '-3%' },
    { id: 5, category: 'Operating Income', amount: 12000, change: '+15%' },
    { id: 6, category: 'Interest Expense', amount: 800, change: '+2%' },
    { id: 7, category: 'Tax Expense', amount: 3500, change: '+8%' },
    { id: 8, category: 'Net Income', amount: 7700, change: '+22%' },
    { id: 9, category: 'Depreciation', amount: 1200, change: '+5%' },
    { id: 10, category: 'Amortization', amount: 600, change: '+3%' },
    { id: 11, category: 'Research & Development', amount: 2500, change: '+10%' },
    { id: 12, category: 'Marketing Expenses', amount: 3200, change: '-7%' },
  ]

  const salesData = [
    { id: 1, product: 'Product A', sales: 120, profit: 2400 },
    { id: 2, product: 'Product B', sales: 85, profit: 1700 },
    { id: 3, product: 'Product C', sales: 65, profit: 1300 },
  ]

  // Generate larger stock data for pagination demonstration
  const stockData = Array.from({ length: 150 }, (_, i) => ({
    id: i + 1,
    name: `Item ${String.fromCharCode(65 + (i % 26))}${Math.floor(i / 26) + 1}`,
    quantity: Math.floor(Math.random() * 500) + 10,
    location: `Warehouse ${String.fromCharCode(65 + (i % 3))}`
  }))

  const lowStockData = [
    { id: 1, name: 'Critical Item X', current: 5, minimum: 20 },
    { id: 2, name: 'Critical Item Y', current: 8, minimum: 15 },
    { id: 3, name: 'Critical Item Z', current: 3, minimum: 10 },
  ]

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('')

  // Filter and paginate data
  const filteredStockData = stockData.filter(item => 
    !searchChar || item.name.startsWith(searchChar)
  )
  
  const paginatedStockData = filteredStockData.slice(
    (stockPage - 1) * stockPageSize,
    stockPage * stockPageSize
  )
  
  const paginatedFinancialData = financialData.slice(
    (financialPage - 1) * financialPageSize,
    financialPage * financialPageSize
  )

  // Analytics data for charts
  const salesTrendData = [
    { month: 'Jan', sales: 12000, profit: 2400 },
    { month: 'Feb', sales: 15000, profit: 3200 },
    { month: 'Mar', sales: 18000, profit: 4100 },
    { month: 'Apr', sales: 22000, profit: 5200 },
    { month: 'May', sales: 25000, profit: 5800 },
    { month: 'Jun', sales: 28000, profit: 6500 },
  ]

  const inventoryData = [
    { name: 'Electronics', value: 35, count: 150 },
    { name: 'Clothing', value: 25, count: 120 },
    { name: 'Books', value: 20, count: 80 },
    { name: 'Home Goods', value: 20, count: 90 },
  ]

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Modern Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-2xl p-8 border border-primary/20">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-xl">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-foreground">{t('title')}</h1>
                <p className="text-muted-foreground text-lg">{t('subtitle')}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Activity className="h-4 w-4" />
              <span>Real-time inventory analytics dashboard</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Select value={locale} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-32 bg-background/50 backdrop-blur-sm border-primary/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">🇺🇸 English</SelectItem>
                <SelectItem value="ku">🇮🇶 Kurdish</SelectItem>
                <SelectItem value="ar">🇸🇦 Arabic</SelectItem>
              </SelectContent>
            </Select>
            <Badge variant="outline" className="bg-background/50 backdrop-blur-sm border-primary/20 px-3 py-1">
              <Zap className="h-3 w-3 mr-1" />
              {locale.toUpperCase()}
            </Badge>
          </div>
        </div>

        {/* Enhanced KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 border-blue-200/50 dark:border-blue-800/50 hover:shadow-xl transition-all duration-300 group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-bl-full"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">{t('dashboard.financial')}</CardTitle>
              <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">$17,000</div>
              <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" />
                +18% {t('common.fromLastMonth')}
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 border-green-200/50 dark:border-green-800/50 hover:shadow-xl transition-all duration-300 group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-bl-full"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">{t('dashboard.sales')}</CardTitle>
              <div className="p-2 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition-colors">
                <ShoppingCart className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-900 dark:text-green-100">270</div>
              <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" />
                {t('dashboard.totalSales')}
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 border-purple-200/50 dark:border-purple-800/50 hover:shadow-xl transition-all duration-300 group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-bl-full"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">{t('dashboard.stock')}</CardTitle>
              <div className="p-2 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                <Warehouse className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">473</div>
              <p className="text-xs text-purple-600 dark:text-purple-400 flex items-center gap-1 mt-1">
                <Package className="h-3 w-3" />
                {t('dashboard.itemsInStock')}
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20 border-red-200/50 dark:border-red-800/50 hover:shadow-xl transition-all duration-300 group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/10 rounded-bl-full"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-700 dark:text-red-300">{t('dashboard.lowstock')}</CardTitle>
              <div className="p-2 bg-red-500/10 rounded-lg group-hover:bg-red-500/20 transition-colors">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-900 dark:text-red-100">16</div>
              <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1 mt-1">
                <AlertTriangle className="h-3 w-3" />
                {t('dashboard.needRestocking')}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Sales Trend Chart */}
          <Card className="xl:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Sales Performance Trend
              </CardTitle>
              <CardDescription>Monthly sales and profit analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesTrendData}>
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="sales"
                      stroke="#3b82f6"
                      fillOpacity={1}
                      fill="url(#colorSales)"
                      name="Sales ($)"
                    />
                    <Area
                      type="monotone"
                      dataKey="profit"
                      stroke="#10b981"
                      fillOpacity={1}
                      fill="url(#colorProfit)"
                      name="Profit ($)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Inventory Distribution Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Inventory Distribution
              </CardTitle>
              <CardDescription>Product categories breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={inventoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {inventoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {inventoryData.map((item, index) => (
                  <div key={item.name} className="flex items-center gap-2 text-sm">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="text-muted-foreground">{item.count} items</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics Tabs */}
        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-muted/50 p-1">
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="financial" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              {t('reports.financial.title')}
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex items-center gap-2">
              <Warehouse className="h-4 w-4" />
              {t('reports.stock.title')}
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Alerts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Breakdown</CardTitle>
                  <CardDescription>Monthly revenue by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={salesTrendData}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-500/10 rounded-lg">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Sales Growth</p>
                        <p className="text-sm text-muted-foreground">vs last month</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">+18.5%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/10 rounded-lg">
                        <Package className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Stock Turnover</p>
                        <p className="text-sm text-muted-foreground">Average rate</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">4.2x</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-500/10 rounded-lg">
                        <Activity className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium">Efficiency Score</p>
                        <p className="text-sm text-muted-foreground">Overall rating</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-purple-600">94%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="financial" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  {t('reports.financial.title')}
                </CardTitle>
                <CardDescription>{t('reports.financial.subtitle')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {financialData.slice(0, 6).map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors">
                      <div>
                        <h3 className="font-semibold">{item.category}</h3>
                        <p className="text-sm text-muted-foreground">{t('reports.financial.currentPeriod')}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold">${item.amount.toLocaleString()}</p>
                        <p className={`text-sm font-medium ${item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {item.change}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Warehouse className="h-5 w-5" />
                  {t('reports.stock.title')}
                </CardTitle>
                <CardDescription>{t('reports.stock.subtitle')}</CardDescription>
                <div className="flex items-center gap-2 mt-4">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{t('reports.stock.searchByFirstChar')}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {alphabet.slice(0, 12).map((char) => (
                    <Button
                      key={char}
                      variant={searchChar === char ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setSearchChar(char === searchChar ? '' : char)
                        setStockPage(1)
                      }}
                      className="h-8 w-8 p-0"
                    >
                      {char}
                    </Button>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {paginatedStockData.slice(0, 8).map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold">{item.quantity}</p>
                        <p className="text-sm text-blue-600">{t('reports.stock.inStock')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Critical Alerts
                </CardTitle>
                <CardDescription>Items requiring immediate attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lowStockData.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-500/10 rounded-lg">
                          <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-red-900 dark:text-red-100">{item.name}</h3>
                          <p className="text-sm text-red-600 dark:text-red-400">{t('reports.lowstock.minimumRequired')} {item.minimum}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-red-900 dark:text-red-100">{item.current}</p>
                        <p className="text-sm text-red-600 dark:text-red-400">{t('reports.lowstock.currentStock')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
