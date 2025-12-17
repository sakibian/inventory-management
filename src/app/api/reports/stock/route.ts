import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '10')
    const locale = searchParams.get('locale') || 'en'
    const searchChar = searchParams.get('searchChar') || ''

    // Generate larger stock data for pagination demonstration
    const stockData = Array.from({ length: 150 }, (_, i) => ({
      id: i + 1,
      name: `Item ${String.fromCharCode(65 + (i % 26))}${Math.floor(i / 26) + 1}`,
      quantity: Math.floor(Math.random() * 500) + 10,
      location: `Warehouse ${String.fromCharCode(65 + (i % 3))}`
    }))

    // Filter data based on search character
    const filteredData = stockData.filter(item => 
      !searchChar || item.name.startsWith(searchChar)
    )

    // Localize data based on locale
    const localizedData = filteredData.map(item => {
      let name = item.name
      let location = item.location
      
      if (locale === 'ku') {
        const nameTranslations: Record<string, string> = {
          'Item': 'ئایتم',
          'Warehouse A': 'بەشگەی A',
          'Warehouse B': 'بەشگەی B',
          'Warehouse C': 'بەشگەی C'
        }
        name = name.replace(/Item ([A-Z]\d*)/, (match, p1) => `ئایتم ${p1}`)
        location = nameTranslations[item.location] || item.location
      } else if (locale === 'ar') {
        const nameTranslations: Record<string, string> = {
          'Item': 'عنصر',
          'Warehouse A': 'المستودع أ',
          'Warehouse B': 'المستودع ب',
          'Warehouse C': 'المستودع ج'
        }
        name = name.replace(/Item ([A-Z]\d*)/, (match, p1) => `عنصر ${p1}`)
        location = nameTranslations[item.location] || item.location
      }
      
      return { ...item, name, location }
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
        searchChar: searchChar
      }
    })
  } catch (error) {
    console.error('Error fetching stock data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stock data' },
      { status: 500 }
    )
  }
}