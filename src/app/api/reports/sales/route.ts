import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '10')
    const locale = searchParams.get('locale') || 'en'
    const date = searchParams.get('date')
    const type = searchParams.get('type') || 'weekly'

    // Mock data - in real implementation, this would come from Azure SQL via Azure Functions
    const salesData = [
      { id: 1, product: 'Product A', sales: 120, profit: 2400 },
      { id: 2, product: 'Product B', sales: 85, profit: 1700 },
      { id: 3, product: 'Product C', sales: 65, profit: 1300 },
      { id: 4, product: 'Product D', sales: 45, profit: 900 },
      { id: 5, product: 'Product E', sales: 78, profit: 1560 },
      { id: 6, product: 'Product F', sales: 92, profit: 1840 },
      { id: 7, product: 'Product G', sales: 34, profit: 680 },
      { id: 8, product: 'Product H', sales: 56, profit: 1120 },
    ]

    // Filter data based on report type (mock implementation)
    let filteredData = salesData
    if (type === 'weekly') {
      // Simulate weekly data
      filteredData = salesData.slice(0, 3)
    } else if (type === 'monthly') {
      // Simulate monthly data
      filteredData = salesData.slice(0, 5)
    } else if (type === 'yearly') {
      // Simulate yearly data
      filteredData = salesData
    }

    // Localize product names based on locale
    const localizedData = filteredData.map(item => {
      let product = item.product
      if (locale === 'ku') {
        const translations: Record<string, string> = {
          'Product A': 'کاڵای A',
          'Product B': 'کاڵای B',
          'Product C': 'کاڵای C',
          'Product D': 'کاڵای D',
          'Product E': 'کاڵای E',
          'Product F': 'کاڵای F',
          'Product G': 'کاڵای G',
          'Product H': 'کاڵای H'
        }
        product = translations[item.product] || item.product
      } else if (locale === 'ar') {
        const translations: Record<string, string> = {
          'Product A': 'المنتج أ',
          'Product B': 'المنتج ب',
          'Product C': 'المنتج ج',
          'Product D': 'المنتج د',
          'Product E': 'المنتج هـ',
          'Product F': 'المنتج و',
          'Product G': 'المنتج ز',
          'Product H': 'المنتج ح'
        }
        product = translations[item.product] || item.product
      }
      
      return { ...item, product }
    })

    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedData = localizedData.slice(startIndex, endIndex)

    return NextResponse.json({
      data: paginatedData,
      pagination: {
        currentPage: page,
        pageSize: pageSize,
        totalItems: localizedData.length,
        totalPages: Math.ceil(localizedData.length / pageSize)
      },
      filters: {
        date: date,
        type: type
      }
    })
  } catch (error) {
    console.error('Error fetching sales data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sales data' },
      { status: 500 }
    )
  }
}