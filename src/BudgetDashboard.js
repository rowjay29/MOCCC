import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

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
    { item: "Junior Subscription Fees", budget: 17150, actual: 17061 },
    { item: "Veterans Subscription Fees", budget: 3080, actual: 2500 },
    { item: "Women's Subscription Fees", budget: 0, actual: 708 },
    { item: "All Abilities Subscription Fees", budget: 600, actual: 500 },
  ]},
  { category: "Functions, Bar & Food", items: [
    { item: "Social Functions", budget: 20000, actual: 13389 },
    { item: "Bar - Food/Drinks", budget: 13000, actual: 13050 },
    { item: "50 Year Anniversary", budget: 0, actual: 17175 },
  ]},
  { category: "Sponsors, Grants & Memberships", items: [
    { item: "Sponsorship", budget: 15000, actual: 8500 },
    { item: "Grants / Donations", budget: 6500, actual: 7500 },
    { item: "Centurions Memberships", budget: 500, actual: 500 },
  ]},
  { category: "Other", items: [
    { item: "Afternoon Tea", budget: 2000, actual: 1899 },
    { item: "Interest", budget: 600, actual: 477 },
    { item: "Bank / Paypal Fees", budget: 0, actual: 0 },
    { item: "Uniforms", budget: 0, actual: 194 },
    { item: "Miscellaneous", budget: 0, actual: 141 },
  ]},
];

const detailedExpenseData = [
  { category: "Functions, Bar & Food", items: [
    { item: "Social Functions", budget: 11975, actual: 5945 },
    { item: "Bar - Food/Drinks", budget: 8000, actual: 6188 },
    { item: "Bar - Operational", budget: 1000, actual: 0 },
    { item: "Liquor Licence", budget: 325, actual: 325 },
    { item: "50 Year Anniversary Dinner", budget: 0, actual: 16740 },
  ]},
  { category: "Equipment, & Uniforms & Training", items: [
    { item: "Cricket Balls", budget: 8000, actual: 8340 },
    { item: "Uniforms", budget: 5000, actual: 0 },
    { item: "Match Day Uniforms", budget: 2000, actual: 8431 },
    { item: "Junior Uniforms", budget: 5500, actual: 0 },
    { item: "Cricket Equipment (Club Wide - Excl. Balls)", budget: 500, actual: 308 },
    { item: "Operational Equipment Expenses", budget: 500, actual: 0 },
    { item: "Training Expenses", budget: 3000, actual: 1440 },
    { item: "Scoreboard Installation", budget: 0, actual: 3336 },
    { item: "Bowling Machine", budget: 0, actual: 1630 },
  ]},
  { category: "Coach, Captain & Player Payments", items: [
    { item: "Senior Coach", budget: 9000, actual: 4000 },
    { item: "Player Payments", budget: 6500, actual: 10654 },
    { item: "Captain", budget: 2000, actual: 1500 },
  ]},
  { category: "Game day & Affiliation Fees", items: [
    { item: "Umpires - (Regular Season)", budget: 6500, actual: 6288 },
    { item: "Umpires - (Finals)", budget: 1000, actual: 610 },
    { item: "Affiliation Fees - Juniors", budget: 2200, actual: 1859 },
    { item: "Affiliation Fees - Senior Mens", budget: 1100, actual: 1175 },
    { item: "Affiliation Fees - Veterans", budget: 550, actual: 242 },
    { item: "Affiliation Fees - Senior Womens", budget: 550, actual: 120 },
    { item: "T20 Competition Entry", budget: 550, actual: 338 },
    { item: "Afternoon Tea", budget: 3600, actual: 2384 },
    { item: "Foxbox", budget: 0, actual: 0 },
    { item: "External Ground Hire", budget: 2000, actual: 5177 },
  ]},
  { category: "Reward and Recognition", items: [
    { item: "Trophies", budget: 5000, actual: 60 },
  ]},
  { category: "College and Sponsors", items: [
    { item: "Mazenod College Payment", budget: 2600, actual: 2600 },
    { item: "Sponsorship", budget: 0, actual: 0 },
  ]},
  { category: "Other", items: [
    { item: "Renovation to Clubrooms", budget: 2000, actual: 0 },
    { item: "Miscellaneous", budget: 1000, actual: 1019 },
    { item: "IT Charges", budget: 500, actual: 798 },
    { item: "Social Media", budget: 200, actual: 0 },
    { item: "Donations", budget: 0, actual: 500 },
    { item: "Fines", budget: 300, actual: 88 },
    { item: "Insurances", budget: 0, actual: 0 },
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
              <span className="text-left">{category.category}</span>
              <span className="text-right">{formatCurrency(category.items.reduce((sum, item) => sum + item.budget, 0))}</span>
            </div>
          ))}
          <div className="flex justify-between py-1 font-bold border-t mt-2">
            <span className="text-left">Total Revenue</span>
            <span className="text-right">{formatCurrency(totalRevenue)}</span>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Expenses</h3>
          {expenseData.map((category, index) => (
            <div key={index} className="flex justify-between py-1">
              <span className="text-left">{category.category}</span>
              <span className="text-right">{formatCurrency(category.items.reduce((sum, item) => sum + item.budget, 0))}</span>
            </div>
          ))}
          <div className="flex justify-between py-1 font-bold border-t mt-2">
            <span className="text-left">Total Expenses</span>
            <span className="text-right">{formatCurrency(totalExpenses)}</span>
          </div>
          <div className="flex justify-between py-1 font-bold">
          </div>
        </div>
        <div className="flex justify-between py-2 text-xl font-bold border-t border-b">
          <span className="text-left">Net Profit</span>
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
  const totalRevenueActual = revenueData.reduce((sum, category) => 
    sum + category.items.reduce((catSum, item) => catSum + item.actual, 0), 0);
  const totalExpensesActual = expenseData.reduce((sum, category) => 
    sum + category.items.reduce((catSum, item) => catSum + item.actual, 0), 0);
  const netProfit = totalRevenue - totalExpenses;
  const netProfitActual = totalRevenueActual - totalExpensesActual;

  const renderCategory = (category, isRevenue) => {
    const categoryTotal = category.items.reduce((sum, item) => sum + item.budget, 0);
    const categoryTotalActual = category.items.reduce((sum, item) => sum + item.actual, 0);
    return (
      <div key={category.category} className="mb-6">
        <h3 className="text-xl font-semibold mb-2 text-left">{category.category}</h3>
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
                  <td className="text-left p-2">{item.item}</td>
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
              <td className="text-left p-2">Subtotal</td>
              <td className="text-right p-2">{formatCurrency(categoryTotal)}</td>
              <td className="text-right p-2">{formatCurrency(categoryTotalActual)}</td>
              <td className="text-right p-2">
                {formatCurrency(calculateVariance(categoryTotal, categoryTotalActual))}
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
      
      <h3 className="text-2xl font-semibold mb-4 text-left">Revenue</h3>
      {revenueData.map(category => renderCategory(category, true))}
      
      <div className="font-bold text-xl mb-6">
        <span className="text-left">Total Revenue: </span>
        <span className="text-right">{formatCurrency(totalRevenue)}</span>
      </div>
      <div className="font-bold text-xl mb-6">
        <span className="text-left">Total Revenue (Actual): </span>
        <span className="text-right">{formatCurrency(totalRevenueActual)}</span>
      </div>
      <div className="font-bold text-xl mb-6">
        <span className="text-left">Total Revenue (Variance): </span>
        <span className="text-right">{formatCurrency(calculateVariance(totalRevenue, totalRevenueActual))}</span>
      </div>

      <h3 className="text-2xl font-semibold mb-4 text-left">Expenses</h3>
      {expenseData.map(category => renderCategory(category, false))}
      
      <div className="font-bold text-xl mb-6">
        <span className="text-left">Total Expenses: </span>
        <span className="text-right">{formatCurrency(totalExpenses)}</span>
      </div>
      <div className="font-bold text-xl mb-6">
        <span className="text-left">Total Expenses (Actual 2023/24): </span>
        <span className="text-right">{formatCurrency(totalExpensesActual)}</span>
      </div>
      <div className="font-bold text-xl mb-6">
        <span className="text-left">Total Expenses (Variance): </span>
        <span className="text-right">{formatCurrency(calculateVariance(totalExpenses, totalExpensesActual))}</span>
      </div>

      <div className="text-2xl font-bold py-2 border-t border-b">
        <span className="text-left">Net Profit: </span>
        <span className={netProfit >= 0 ? 'text-green-600' : 'text-red-600'}>
          {formatCurrency(netProfit)}
        </span>
      </div>
      <div className="text-xl font-bold py-2 border-t border-b">
        <span className="text-left">Net Profit (Actual Last Year): </span>
        <span className={netProfitActual >= 0 ? 'text-green-600' : 'text-red-600'}>
          {formatCurrency(netProfitActual)}
        </span>
      </div>
      <div className="text-2xl font-bold py-2 border-t border-b">
        <span className={calculateVariance(netProfit, netProfitActual) >= 0 ? 'text-green-600' : 'text-red-600'}>
          {formatCurrency(calculateVariance(netProfit, netProfitActual))}
        </span>
      </div>
    </div>
  );
};

const GraphsTab = ({ revenueData, expenseData }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];

  const revenueCategories = revenueData.map(category => ({
    name: category.category,
    value: category.items.reduce((sum, item) => sum + item.actual, 0)
  }));

  const expenseCategories = expenseData.map(category => ({
    name: category.category,
    value: category.items.reduce((sum, item) => sum + item.actual, 0)
  }));

  const topRevenueCategories = revenueCategories.slice(0, 3);
  const topExpenseCategories = expenseCategories.slice(0, 3);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Graphs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">Revenue Proportions</h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={revenueCategories}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => {
                  if (name === "Subscriptions" || name === "Sponsors, Grants & Memberships") {
                    return `${name}: ${(percent * 100).toFixed(0)}%`;
                  }
                  return null;
                }}
              >
                {revenueCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Expense Proportions</h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={expenseCategories}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => {
                  if (name === "Functions, Bar & Food" || name === "Equipment, & Uniforms & Training") {
                    return `${name}: ${(percent * 100).toFixed(0)}%`;
                  }
                  return null;
                }}
              >
                {expenseCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Expenses vs Revenue Comparison</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={revenueData.concat(expenseData)}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="budget" fill="#8884d8" name="Budget 2024/25" />
            <Bar dataKey="actual" fill="#82ca9d" name="Actual 2023/24" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const SponsorsTab = () => {
  const sponsors = [
    { name: "Bowery Capital", amount: 5000 },
    { name: "Acrylic", amount: 3000 },
    { name: "Mulgrave Country Club", amount: 2000 },
    { name: "Alby's Lawnmowing Service", amount: 1000 },
    { name: "Bulk Transport (Tye Marchetti", amount: 1000 },
    { name: "Weatherware Protection (Dirk David)", amount: 1000 },
    { name: "Matt Morley", amount: 1000 },
    { name: "Bendigo Bank", amount: 500 },
    { name: "Simon Grady", amount: 500 },
  ];

  const grantees = [
    { name: "Council", amount: 2500 },
    { name: "MOCA", amount: 4000 },
    { name: "Other", amount: 0 },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Sponsors</h2>
      <table className="w-full mb-8">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-2">Sponsor Entity</th>
            <th className="text-right p-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {sponsors.map((sponsor, index) => (
            <tr key={index} className="border-b">
              <td className="text-left p-2">{sponsor.name}</td>
              <td className="text-right p-2">{formatCurrency(sponsor.amount)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="font-bold">
            <td className="text-left p-2">Total</td>
            <td className="text-right p-2">{formatCurrency(sponsors.reduce((sum, sponsor) => sum + sponsor.amount, 0))}</td>
          </tr>
        </tfoot>
      </table>
      <h2 className="text-2xl font-bold mb-4">Grantees</h2>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-2">Grantee</th>
            <th className="text-right p-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {grantees.map((grantee, index) => (
            <tr key={index} className="border-b">
              <td className="text-left p-2">{grantee.name}</td>
              <td className="text-right p-2">{formatCurrency(grantee.amount)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="font-bold">
            <td className="text-left p-2">Total</td>
            <td className="text-right p-2">{formatCurrency(grantees.reduce((sum, grantee) => sum + grantee.amount, 0))}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

const SubscriptionsTab = () => {
  const [subscriptions, setSubscriptions] = useState([
    { feeType: "Senior", price: 440, payees: 20 },
    { feeType: "Senior Concession", price: 340, payees: 15 },
    { feeType: "Junior (Playing Seniors)", price: 120, payees: 6 },
    { feeType: "Junior", price: 240, payees: 70 },
    { feeType: "Blast/Super 7s", price: 50, payees: 7 },
    { feeType: "Vets", price: 280, payees: 11 },
    { feeType: "Women's", price: 100, payees: 0 },
    { feeType: "All Abilities", price: 100, payees: 6 },
  ]);

  const handlePriceChange = (index, newPrice) => {
    const updatedSubscriptions = [...subscriptions];
    updatedSubscriptions[index].price = newPrice;
    setSubscriptions(updatedSubscriptions);
  };

  const handlePayeesChange = (index, newPayees) => {
    const updatedSubscriptions = [...subscriptions];
    updatedSubscriptions[index].payees = newPayees;
    setSubscriptions(updatedSubscriptions);
  };

  const totalRevenue = subscriptions.reduce((sum, sub) => sum + sub.price * sub.payees, 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Subscriptions</h2>
      <table className="w-full mb-8">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-2">Fee Type</th>
            <th className="text-right p-2">Price</th>
            <th className="text-right p-2"># of Payees</th>
            <th className="text-right p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((sub, index) => (
            <tr key={index} className="border-b">
            <td className="text-left p-2">{sub.feeType}</td>
            <td className="text-right p-2">
              <input
                type="number"
                value={sub.price}
                onChange={(e) => handlePriceChange(index, parseFloat(e.target.value))}
                className="w-full text-right"
              />
            </td>
            <td className="text-right p-2">
              <input
                type="number"
                value={sub.payees}
                onChange={(e) => handlePayeesChange(index, parseInt(e.target.value))}
                className="w-full text-right"
              />
            </td>
            <td className="text-right p-2">{formatCurrency(sub.price * sub.payees)}</td>
          </tr>
        ))}
        </tbody>
        <tfoot>
          <tr className="font-bold">
            <td className="text-left p-2">Grand Total:</td>
            <td></td>
            <td className="text-right p-2">{subscriptions.reduce((sum, sub) => sum + sub.payees, 0)}</td>
            <td className="text-right p-2">{formatCurrency(totalRevenue)}</td>
          </tr>
        </tfoot>
      </table>
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
          <button
            className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 ${
              activeTab === 'graphs'
                ? 'bg-white shadow text-blue-700'
                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
            }`}
            onClick={() => setActiveTab('graphs')}
          >
            Graphs
          </button>
          <button
            className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 ${
              activeTab === 'sponsors'
                ? 'bg-white shadow text-blue-700'
                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
            }`}
            onClick={() => setActiveTab('sponsors')}
          >
            Sponsors
          </button>
          <button
            className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 ${
              activeTab === 'subscriptions'
                ? 'bg-white shadow text-blue-700'
                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
            }`}
            onClick={() => setActiveTab('subscriptions')}
          >
            Subscriptions
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
      {activeTab === 'graphs' && (
        <GraphsTab revenueData={detailedRevenueData} expenseData={detailedExpenseData} />
      )}
      {activeTab === 'sponsors' && (
        <SponsorsTab />
      )}
      {activeTab === 'subscriptions' && (
        <SubscriptionsTab />
      )}
    </div>
  );
};

export default BudgetDashboard;