import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const Card = ({ children, className }) => (
  <div className={`bg-white rounded-lg shadow-md ${className}`}>{children}</div>
);

const CardHeader = ({ children, className }) => (
  <div className={`p-4 font-semibold text-lg ${className}`}>{children}</div>
);

const CardContent = ({ children, className }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const formatCurrency = (amount) => `$${Number(amount).toLocaleString()}`;
const calculateVariance = (budget, actual) => budget - actual;

const detailedRevenueData = [
  { category: "Subscriptions", items: [
    { item: "Senior Mens Subscription Fees", budget: 14620, actual: 13599 },
  ]},
];

const detailedExpenseData = [
  { category: "Functions, Bar & Food", items: [
    { item: "Social Functions", budget: 11975, actual: 5945 },
  ]},
];

const CategoryCard = ({ title, budget, actual, isRevenue }) => {
  const variance = calculateVariance(budget, actual);
  const percentageChange = ((budget - actual) / actual) * 100;

  return (
    <Card>
      <CardHeader>{title}</CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">Budget 2024/25</p>
            <p className="text-xl font-bold">{formatCurrency(budget)}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Actual 2023/24</p>
            <p className="text-xl font-bold">{formatCurrency(actual)}</p>
          </div>
        </div>
        <p className={`text-sm font-medium mt-2 ${
          isRevenue
            ? variance > 0 ? "text-green-600" : "text-red-600"
            : variance < 0 ? "text-red-600" : "text-green-600"
        }`}>
          {variance > 0 ? "+" : ""}{formatCurrency(variance)} ({percentageChange.toFixed(2)}%)
        </p>
      </CardContent>
    </Card>
  );
};

const CashBalanceSummaryCard = ({ openingBalance, netMovement }) => {
  const closingBalance = openingBalance + netMovement;

  return (
    <Card>
      <CardHeader>Cash Balance Summary</CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium">Opening Cash Balance as at 01/04/2024</p>
            <p className="text-xl font-bold">{formatCurrency(openingBalance)}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Net Movement</p>
            <p className={`text-xl font-bold ${netMovement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(netMovement)}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">Closing Cash Balance as at 31/03/2025</p>
            <p className="text-xl font-bold">{formatCurrency(closingBalance)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ProfitLossSummary = ({ revenueData, expenseData }) => {
  const totalRevenue = revenueData.reduce((sum, category) => 
    sum + category.items.reduce((catSum, item) => catSum + item.budget, 0), 0);
  const totalExpenses = expenseData.reduce((sum, category) => 
    sum + category.items.reduce((catSum, item) => catSum + item.budget, 0), 0);
  const netProfit = totalRevenue - totalExpenses;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Profit & Loss Summary</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Revenue</h3>
          {revenueData.map((category, index) => (
            <div key={index} className="flex justify-between py-1">
              <span>{category.category}</span>
              <span>{formatCurrency(category.items.reduce((sum, item) => sum + item.budget, 0))}</span>
            </div>
          ))}
          <div className="flex justify-between py-1 font-bold border-t mt-2">
            <span>Total Revenue</span>
            <span>{formatCurrency(totalRevenue)}</span>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Expenses</h3>
          {expenseData.map((category, index) => (
            <div key={index} className="flex justify-between py-1">
              <span>{category.category}</span>
              <span>{formatCurrency(category.items.reduce((sum, item) => sum + item.budget, 0))}</span>
            </div>
          ))}
          <div className="flex justify-between py-1 font-bold border-t mt-2">
            <span>Total Expenses</span>
            <span>{formatCurrency(totalExpenses)}</span>
          </div>
        </div>
        <div className="flex justify-between py-2 text-xl font-bold border-t border-b">
          <span>Net Profit</span>
          <span className={netProfit >= 0 ? 'text-green-600' : 'text-red-600'}>
            {formatCurrency(netProfit)}
          </span>
        </div>
      </div>
    </div>
  );
};

const DetailedBreakdown = ({ revenueData, expenseData }) => {
  const totalRevenue = revenueData.reduce((sum, category) => 
    sum + category.items.reduce((catSum, item) => catSum + item.budget, 0), 0);
  const totalExpenses = expenseData.reduce((sum, category) => 
    sum + category.items.reduce((catSum, item) => catSum + item.budget, 0), 0);
  const netProfit = totalRevenue - totalExpenses;

  const renderCategory = (category, isRevenue) => {
    const categoryTotal = category.items.reduce((sum, item) => sum + item.budget, 0);
    return (
      <div key={category.category} className="mb-6">
        <h3 className="text-xl font-semibold mb-2">{category.category}</h3>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-2">Item</th>
              <th className="text-right p-2">Budget 2024/25</th>
              <th className="text-right p-2">Actual 2023/24</th>
              <th className="text-right p-2">Variance</th>
            </tr>
          </thead>
          <tbody>
            {category.items.map((item, index) => {
              const variance = calculateVariance(item.budget, item.actual);
              return (
                <tr key={index} className="border-b">
                  <td className="p-2">{item.item}</td>
                  <td className="text-right p-2">{formatCurrency(item.budget)}</td>
                  <td className="text-right p-2">{formatCurrency(item.actual)}</td>
                  <td className={`text-right p-2 ${
                    isRevenue
                      ? variance > 0 ? "text-green-600" : "text-red-600"
                      : variance < 0 ? "text-red-600" : "text-green-600"
                  }`}>
                    {formatCurrency(variance)}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="font-bold">
              <td className="p-2">Subtotal</td>
              <td className="text-right p-2">{formatCurrency(categoryTotal)}</td>
              <td className="text-right p-2">
                {formatCurrency(category.items.reduce((sum, item) => sum + item.actual, 0))}
              </td>
              <td className="text-right p-2">
                {formatCurrency(calculateVariance(categoryTotal, 
                  category.items.reduce((sum, item) => sum + item.actual, 0)))}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Detailed Breakdown</h2>
      
      <h3 className="text-2xl font-semibold mb-4">Revenue</h3>
      {revenueData.map(category => renderCategory(category, true))}
      
      <div className="font-bold text-xl mb-6">
        <span>Total Revenue: </span>
        <span>{formatCurrency(totalRevenue)}</span>
      </div>

      <h3 className="text-2xl font-semibold mb-4">Expenses</h3>
      {expenseData.map(category => renderCategory(category, false))}
      
      <div className="font-bold text-xl mb-6">
        <span>Total Expenses: </span>
        <span>{formatCurrency(totalExpenses)}</span>
      </div>

      <div className="text-2xl font-bold py-2 border-t border-b">
        <span>Net Profit: </span>
        <span className={netProfit >= 0 ? 'text-green-600' : 'text-red-600'}>
          {formatCurrency(netProfit)}
        </span>
      </div>
    </div>
  );
};

const BudgetDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const totalRevenueBudget = detailedRevenueData.reduce((sum, category) => 
    sum + category.items.reduce((catSum, item) => catSum + item.budget, 0), 0);
  const totalExpenseBudget = detailedExpenseData.reduce((sum, category) => 
    sum + category.items.reduce((catSum, item) => catSum + item.budget, 0), 0);
  const totalRevenueActual = detailedRevenueData.reduce((sum, category) => 
    sum + category.items.reduce((catSum, item) => catSum + item.actual, 0), 0);
  const totalExpenseActual = detailedExpenseData.reduce((sum, category) => 
    sum + category.items.reduce((catSum, item) => catSum + item.actual, 0), 0);
  const profitLossBudget = totalRevenueBudget - totalExpenseBudget;
  const profitLossActual = totalRevenueActual - totalExpenseActual;

  const openingBalance = 52067;
  const netMovement = profitLossBudget;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">
        Mazenod Cricket Club Budget Dashboard
      </h1>
      <div className="mb-6">
        <div className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          <button
            className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 ${
              activeTab === 'overview'
                ? 'bg-white shadow text-blue-700'
                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 ${
              activeTab === 'pl-summary'
                ? 'bg-white shadow text-blue-700'
                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
            }`}
            onClick={() => setActiveTab('pl-summary')}
          >
            P&L Summary
          </button>
          <button
            className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 ${
              activeTab === 'detailed-breakdown'
                ? 'bg-white shadow text-blue-700'
                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
            }`}
            onClick={() => setActiveTab('detailed-breakdown')}
          >
            Detailed Breakdown
          </button>
        </div>
      </div>
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <CategoryCard title="Revenue" budget={totalRevenueBudget} actual={totalRevenueActual} isRevenue={true} />
          <CategoryCard title="Expenses" budget={totalExpenseBudget} actual={totalExpenseActual} isRevenue={false} />
          <CategoryCard title="Profit/Loss" budget={profitLossBudget} actual={profitLossActual} isRevenue={true} />
          <CashBalanceSummaryCard openingBalance={openingBalance} netMovement={netMovement} />
        </div>
      )}
      {activeTab === 'pl-summary' && (
        <ProfitLossSummary revenueData={detailedRevenueData} expenseData={detailedExpenseData} />
      )}
      {activeTab === 'detailed-breakdown' && (
        <DetailedBreakdown revenueData={detailedRevenueData} expenseData={detailedExpenseData} />
      )}
    </div>
  );
};

export default BudgetDashboard;