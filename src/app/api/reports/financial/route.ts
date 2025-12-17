import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '10')
    const locale = searchParams.get('locale') || 'en'

    // Mock data - in real implementation, this would come from Azure SQL via Azure Functions
    const financialData = [
      { id: 1, category: 'Revenue', amount: 45000, change: '+12%' },
      { id: 2, category: 'Expenses', amount: 28000, change: '-5%' },
      { id: 3, category: 'Profit', amount: 17000, change: '+18%' },
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

    // Localize category names based on locale
    const localizedData = financialData.map(item => {
      let category = item.category
      if (locale === 'ku') {
        const translations: Record<string, string> = {
          'Revenue': 'داھات',
          'Expenses': 'خەرجی',
          'Profit': 'قازانج',
          'Cost of Goods Sold': 'کڕینی کاڵا',
          'Operating Income': 'داهاتی کارکردن',
          'Interest Expense': 'خەرجی بەرژەودە',
          'Tax Expense': 'خەرجی باج',
          'Net Income': 'داهاتی خاو',
          'Depreciation': 'کەمکردنەوە',
          'Amortization': 'دابەشکردن',
          'Research & Development': 'لێکۆڵینەوە و پەرەپێدان',
          'Marketing Expenses': 'خەرجی بازاڕکردن'
        }
        category = translations[item.category] || item.category
      } else if (locale === 'ar') {
        const translations: Record<string, string> = {
          'Revenue': 'الإيرادات',
          'Expenses': 'المصروفات',
          'Profit': 'الربح',
          'Cost of Goods Sold': 'تكلفة البضائع المباعة',
          'Operating Income': 'الدخل التشغيلي',
          'Interest Expense': 'مصروفات الفائدة',
          'Tax Expense': 'مصروفات الضريبة',
          'Net Income': 'صافي الدخل',
          'Depreciation': 'الاستهلاك',
          'Amortization': 'الإطفاء',
          'Research & Development': 'البحث والتطوير',
          'Marketing Expenses': 'مصروفات التسويق'
        }
        category = translations[item.category] || item.category
      }
      
      return { ...item, category }
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
      }
    })
  } catch (error) {
    console.error('Error fetching financial data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch financial data' },
      { status: 500 }
    )
  }
}