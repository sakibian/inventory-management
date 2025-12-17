import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '10')
    const locale = searchParams.get('locale') || 'en'

    // Mock data - in real implementation, this would come from Azure SQL via Azure Functions
    // Limited to 30 records as per requirements (Stored Procedures data limited to max 30 records)
    const lowStockData = [
      { id: 1, name: 'Critical Item X', current: 5, minimum: 20 },
      { id: 2, name: 'Critical Item Y', current: 8, minimum: 15 },
      { id: 3, name: 'Critical Item Z', current: 3, minimum: 10 },
      { id: 4, name: 'Essential Component A', current: 12, minimum: 25 },
      { id: 5, name: 'Essential Component B', current: 7, minimum: 18 },
      { id: 6, name: 'Key Material C', current: 4, minimum: 12 },
      { id: 7, name: 'Key Material D', current: 9, minimum: 22 },
      { id: 8, name: 'Vital Supply E', current: 6, minimum: 16 },
      { id: 9, name: 'Vital Supply F', current: 2, minimum: 14 },
      { id: 10, name: 'Important Part G', current: 11, minimum: 20 },
      { id: 11, name: 'Important Part H', current: 8, minimum: 19 },
      { id: 12, name: 'Necessary Item I', current: 5, minimum: 15 },
      { id: 13, name: 'Necessary Item J', current: 13, minimum: 24 },
      { id: 14, name: 'Required Component K', current: 7, minimum: 17 },
      { id: 15, name: 'Required Component L', current: 4, minimum: 13 },
    ]

    // Localize data based on locale
    const localizedData = lowStockData.map(item => {
      let name = item.name
      if (locale === 'ku') {
        const translations: Record<string, string> = {
          'Critical Item X': 'ئایتمی گرنگ X',
          'Critical Item Y': 'ئایتمی گرنگ Y',
          'Critical Item Z': 'ئایتمی گرنگ Z',
          'Essential Component A': 'پێکھاتەی پێویستی A',
          'Essential Component B': 'پێکھاتەی پێویستی B',
          'Key Material C': 'مادەی سەرەکی C',
          'Key Material D': 'مادەی سەرەکی D',
          'Vital Supply E': 'دابینەکی ڕەخسەن E',
          'Vital Supply F': 'دابینەکی ڕەخسەن F',
          'Important Part G': 'بەشی گرنگ G',
          'Important Part H': 'بەشی گرنگ H',
          'Necessary Item I': 'ئایتمی پێویست I',
          'Necessary Item J': 'ئایتمی پێویست J',
          'Required Component K': 'پێکھاتەی داواکراو K',
          'Required Component L': 'پێکھاتەی داواکراو L'
        }
        name = translations[item.name] || item.name
      } else if (locale === 'ar') {
        const translations: Record<string, string> = {
          'Critical Item X': 'عنصر حاسم X',
          'Critical Item Y': 'عنصر حاسم Y',
          'Critical Item Z': 'عنصر حاسم Z',
          'Essential Component A': 'مكون أساسي A',
          'Essential Component B': 'مكون أساسي B',
          'Key Material C': 'مادة رئيسية C',
          'Key Material D': 'مادة رئيسية D',
          'Vital Supply E': 'توريد حيوي E',
          'Vital Supply F': 'توريد حيوي F',
          'Important Part G': 'جزء مهم G',
          'Important Part H': 'جزء مهم H',
          'Necessary Item I': 'عنصر ضروري I',
          'Necessary Item J': 'عنصر ضروري J',
          'Required Component K': 'مكون مطلوب K',
          'Required Component L': 'مكون مطلوب L'
        }
        name = translations[item.name] || item.name
      }
      
      return { ...item, name }
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
    console.error('Error fetching low stock data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch low stock data' },
      { status: 500 }
    )
  }
}