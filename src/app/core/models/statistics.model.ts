export interface StatisticsVM {
  incomeExpense: {
    [key: string]: number
  }
  invoiceStatus: {
    [key: string]: number
  }
  quoteStatus: {
    [key: string]: number
  }
  monthlySummary: {
    [key: string]: {
      [key: string]: number
    }
  }
}

