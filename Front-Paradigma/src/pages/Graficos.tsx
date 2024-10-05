"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// URL de la API
const API_URL = "https://6662962a62966e20ef091eb7.mockapi.io/api/Dashboard";

export default function Dashboard() {
  const [salesData, setSalesData] = useState([]);
  const [userGrowthData, setUserGrowthData] = useState([]);
  const [marketShareData, setMarketShareData] = useState([]);

  // Fetch de los datos de la API
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch sales data
        const salesResponse = await fetch(${API_URL}/salesData);
        const sales = await salesResponse.json();
        setSalesData(sales);

        // Fetch user growth data
        const userGrowthResponse = await fetch(${API_URL}/userGrowthData);
        const userGrowth = await userGrowthResponse.json();
        setUserGrowthData(userGrowth);

        // Fetch market share data
        const marketShareResponse = await fetch(${API_URL}/marketShareData);
        const marketShare = await marketShareResponse.json();
        setMarketShareData(marketShare);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Gráfico de ventas mensuales */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Sales</CardTitle>
            <CardDescription>Bar chart showing monthly sales data</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                sales: {
                  label: "Sales",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="sales" fill="var(--color-sales)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Gráfico de crecimiento de usuarios */}
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>Line chart showing user growth over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                users: {
                  label: "Users",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowthData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="users" stroke="var(--color-users)" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Gráfico de participación de mercado */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Product Market Share</CardTitle>
            <CardDescription>Pie chart showing market share of products</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Market Share",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={marketShareData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="var(--color-value)"
                    label
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}