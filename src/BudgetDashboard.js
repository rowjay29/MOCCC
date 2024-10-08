import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

const FinancialDashboard = () => {
  const [activePage, setActivePage] = useState('insights');

  const financialData = {
    monthToDate: {
      netSales: 9507764,
      grossProfit: 4172835,
      grossProfitMargin: 44.0,
      netProfit: 2175975,
      netProfitMargin: 23.0,
    },
    yearToDate: {
      netSales: 19915649,
      grossProfit: 8381126,
      grossProfitMargin: 42.3,
      netProfit: 2650716,
      netProfitMargin: 13.4,
    },
  };

  const warehouseLaborCost = [
    { name: 'Total', actual: 0.3013, budget: 0.3153, variance: 0.0141 },
    { name: 'Kmart Books', actual: 0.3104, budget: 0.2828, variance: -0.0276 },
    { name: 'Target Books', actual: 0.3330, budget: 0.2879, variance: -0.0452 },
    { name: 'Big W', actual: 0.2785, budget: 0.2725, variance: -0.0059 },
    { name: 'Coles', actual: 0.0984, budget: 0.1450, variance: 0.0466 },
    { name: 'Other Domestic', actual: 0.2219, budget: 0.1822, variance: -0.0397 },
  ];

  const territoryContribution = [
    { name: 'ANZ (MAIN)', sales: 2025113, gp: 816482, contribution: 363605 },
    { name: 'ANZ (FOB)', sales: 682657, gp: 300614, contribution: 265079 },
    { name: 'International', sales: 5753575, gp: 2525317, contribution: 2537349 },
  ];

  const forwardOrderBook = [
    { name: 'Total', thisYear: 6504451, lastYear: 4499383, variance: 2005068 },
    { name: 'Target', thisYear: 1473722, lastYear: 2176156, variance: -702434 },
    { name: 'B&N', thisYear: 970013, lastYear: 256004, variance: 714009 },
    { name: 'Five Below', thisYear: 697971, lastYear: 811921, variance: -113950 },
    { name: 'Greenbrier', thisYear: 619982, lastYear: 51383, variance: 568600 },
  ];

  const turnoverByTerritory = [
    { name: 'TOTAL', actual: 9507764, budget: 8688860, variance: 818903, varPercent: 9.4 },
    { name: 'ANZ', actual: 2707769, budget: 3502166, variance: -794397, varPercent: -22.7 },
    { name: 'Nth America', actual: 5545778, budget: 4049735, variance: 1496043, varPercent: 36.9 },
    { name: 'Asia', actual: 180153, budget: 106040, variance: 74113, varPercent: 69.9 },
    { name: 'Africa', actual: 27644, budget: 87476, variance: -59832, varPercent: -68.4 },
    { name: 'Other Territories', actual: 1046419, budget: 943444, variance: 102975, varPercent: 10.9 },
  ];

  const turnoverByDelivery = [
    { name: 'TOTAL', actual: 9507764, ly: 8691373, variance: 816390, varPercent: 9.4 },
    { name: 'AU Domestic', actual: 2082017, ly: 3528042, variance: -1446025, varPercent: -41.0 },
    { name: 'FOB', actual: 6469786, ly: 5054150, variance: 1415637, varPercent: 28.0 },
    { name: 'Other Delivery', actual: 955960, ly: 109182, variance: 846778, varPercent: 775.6 },
  ];

  const turnoverByChannel = [
    { name: 'TOTAL', actual: 9507764, ly: 8691373, variance: 816390, varPercent: 9.4 },
    { name: 'DDS', actual: 1545811, ly: 3129107, variance: -1583296, varPercent: -50.6 },
    { name: 'Supermarkets', actual: 755643, ly: 1183263, variance: -427619, varPercent: -36.1 },
    { name: 'Discounters', actual: 4751362, ly: 3023486, variance: 1727877, varPercent: 57.1 },
    { name: 'Wholesalers', actual: 229925, ly: 306804, variance: -76880, varPercent: -25.1 },
    { name: 'Bookstores', actual: 363877, ly: 697528, variance: -333651, varPercent: -47.8 },
    { name: 'Department Store', actual: 856117, ly: 0, variance: 856117, varPercent: 0 },
    { name: 'Specialty', actual: 411857, ly: 204419, variance: 207439, varPercent: 101.5 },
    { name: 'E-Commerce', actual: 19564, ly: 7253, variance: 12310, varPercent: 169.7 },
    { name: 'Direct Marketers', actual: 70700, ly: 16437, variance: 54264, varPercent: 330.1 },
    { name: 'Other Channel', actual: 502907, ly: 123077, variance: 379830, varPercent: 308.6 },
  ];

  const turnoverByWorld = [
    { name: 'TOTAL', actual: 9507764, ly: 8691373, variance: 816390, varPercent: 9.4 },
    { name: 'Explore', actual: 2620261, ly: 3251035, variance: -630775, varPercent: -19.4 },
    { name: 'Imagine', actual: 3240647, ly: 1807551, variance: 1433096, varPercent: 79.3 },
    { name: 'Create', actual: 2096657, ly: 2754259, variance: -657603, varPercent: -23.9 },
    { name: 'Play', actual: 1479375, ly: 808345, variance: 671031, varPercent: 83.0 },
    { name: 'Other World', actual: 70824, ly: 70184, variance: 641, varPercent: 0.9 },
  ];

  const InsightsPage = () => (
    <Card className="p-6">
      <CardHeader className="text-2xl font-bold">Key Insights</CardHeader>
      <CardContent>
        <ul className="list-disc pl-5 space-y-2">
          <li>Overall turnover has increased by 9.4% month-to-date and 4.1% year-to-date compared to last year.</li>
          <li>North America shows strong growth with a 36.9% increase in turnover month-to-date.</li>
          <li>FOB deliveries have increased by 28.0%, while AU Domestic deliveries have decreased by 41.0%.</li>
          <li>Discounters channel has seen significant growth of 57.1% month-to-date.</li>
          <li>The 'Imagine' world category has shown remarkable growth of 79.3% month-to-date.</li>
          <li>E-Commerce and Direct Marketers channels show high growth percentages, albeit from a smaller base.</li>
        </ul>
      </CardContent>
    </Card>
  );

  const FinancialOverviewPage = () => (
    <Card className="p-6">
      <CardHeader className="text-2xl font-bold">Financial Overview</CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-xl">
            <p>Net Sales (MTD): <span className="font-bold text-2xl">{formatCurrency(financialData.monthToDate.netSales)}</span></p>
            <p>Gross Profit (MTD): <span className="font-bold text-2xl">{formatCurrency(financialData.monthToDate.grossProfit)}</span></p>
            <p>Gross Profit Margin (MTD): <span className="font-bold text-2xl">{financialData.monthToDate.grossProfitMargin}%</span></p>
            <p>Net Profit (MTD): <span className="font-bold text-2xl">{formatCurrency(financialData.monthToDate.netProfit)}</span></p>
            <p>Net Profit Margin (MTD): <span className="font-bold text-2xl">{financialData.monthToDate.netProfitMargin}%</span></p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const WarehouseLaborCostPage = () => (
    <Card className="p-6">
      <CardHeader className="text-2xl font-bold">Warehouse Labor Cost per Unit</CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Department</TableHead>
              <TableHead>Actual</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Variance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {warehouseLaborCost.map((item) => (
              <TableRow key={item.name}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{formatCurrency(item.actual)}</TableCell>
                <TableCell>{formatCurrency(item.budget)}</TableCell>
                <TableCell>{formatCurrency(item.variance)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const TerritoryContributionPage = () => (
    <Card className="p-6">
      <CardHeader className="text-2xl font-bold">Contribution by Territory</CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Territory</TableHead>
              <TableHead>Sales</TableHead>
              <TableHead>Gross Profit</TableHead>
              <TableHead>Contribution</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {territoryContribution.map((item) => (
              <TableRow key={item.name}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{formatCurrency(item.sales)}</TableCell>
                <TableCell>{formatCurrency(item.gp)}</TableCell>
                <TableCell>{formatCurrency(item.contribution)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const ForwardOrderBookPage = () => (
    <Card className="p-6">
      <CardHeader className="text-2xl font-bold">US Forward Order Book</CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>This Year</TableHead>
              <TableHead>Last Year</TableHead>
              <TableHead>Variance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {forwardOrderBook.map((item) => (
              <TableRow key={item.name}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{formatCurrency(item.thisYear)}</TableCell>
                <TableCell>{formatCurrency(item.lastYear)}</TableCell>
                <TableCell>{formatCurrency(item.variance)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const TurnoverPage = () => (
    <Card className="p-6">
      <CardHeader className="text-2xl font-bold">Turnover Analysis</CardHeader>
      <CardContent>
        <Tabs defaultValue="territory">
          <TabsList>
            <TabsTrigger value="territory">By Territory</TabsTrigger>
            <TabsTrigger value="delivery">By Delivery</TabsTrigger>
            <TabsTrigger value="channel">By Channel</TabsTrigger>
            <TabsTrigger value="world">By World</TabsTrigger>
          </TabsList>
          <TabsContent value="territory">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={turnoverByTerritory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Line type="monotone" dataKey="actual" name="Actual" stroke="#8884d8" />
                <Line type="monotone" dataKey="budget" name="Budget" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="delivery">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={turnoverByDelivery}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Line type="monotone" dataKey="actual" name="Actual" stroke="#8884d8" />
                <Line type="monotone" dataKey="ly" name="Last Year" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="channel">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={turnoverByChannel}>
                  <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Line type="monotone" dataKey="actual" name="Actual" stroke="#8884d8" />
                <Line type="monotone" dataKey="ly" name="Last Year" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="world">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={turnoverByWorld}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Line type="monotone" dataKey="actual" name="Actual" stroke="#8884d8" />
                <Line type="monotone" dataKey="ly" name="Last Year" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-3xl font-bold">Hinkler Australia Financial Dashboard</h1>
      <Tabs value={activePage} onValueChange={setActivePage}>
        <TabsList>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="overview">Financial Overview</TabsTrigger>
          <TabsTrigger value="warehouse">Warehouse Labor Cost</TabsTrigger>
          <TabsTrigger value="territory">Territory Contribution</TabsTrigger>
          <TabsTrigger value="orderbook">Forward Order Book</TabsTrigger>
          <TabsTrigger value="turnover">Turnover Analysis</TabsTrigger>
        </TabsList>
        <TabsContent value="insights"><InsightsPage /></TabsContent>
        <TabsContent value="overview"><FinancialOverviewPage /></TabsContent>
        <TabsContent value="warehouse"><WarehouseLaborCostPage /></TabsContent>
        <TabsContent value="territory"><TerritoryContributionPage /></TabsContent>
        <TabsContent value="orderbook"><ForwardOrderBookPage /></TabsContent>
        <TabsContent value="turnover"><TurnoverPage /></TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialDashboard;
