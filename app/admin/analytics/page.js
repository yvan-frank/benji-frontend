'use client'

import React, { useState, useEffect } from 'react';
import {
    TrendingUp,
    Users,
    ShoppingBag,
    Clock,
    Star,
    MapPin,
    Phone,
    PoundSterlingIcon
} from 'lucide-react';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import {useGetAllChartData, useGetStats} from "@/hooks/api/useStats";
export default function AnalyticsPage() {
    const { isFetching, data } = useGetStats()
    const { data: chartsData, isFetching: chartsIsFetching } = useGetAllChartData()
    const [turnover, setTurnover] = useState({});
    const [totalOrder, setTotalOrder] = useState({});
    const [activeCustomer, setActiveCustomer] = useState({});
    const [averageRating, setAverageRating] = useState({});


    const [popular, setPopular] = useState([]);
    const [orderByTime, setOrderByTime] = useState([]);
    const [saleStats, setSaleStats] = useState([]);
    const [recentOrder, setRecentOrder] = useState([]);

    useEffect(() => {
        if (data) {
            setTurnover(data?.revenue)
            setTotalOrder(data?.orders)
            setActiveCustomer(data?.activeCustomers)
            setAverageRating(data?.averageRating)
            setRecentOrder(data?.recentOrders)
        }
    }, [isFetching]);

    useEffect(() => {
       if (chartsData){
           setPopular(chartsData?.popularDishes)
           setOrderByTime(chartsData?.orderByTime)
           setSaleStats(chartsData?.salesStats)
       }
    }, [chartsIsFetching]);



    return (
        <div className="">

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        title="Turnover"
                        value={turnover?.value}
                        change={turnover?.change}
                        icon={PoundSterlingIcon}
                        color="bg-green-500"
                    />
                    <StatCard
                        title="Total orders"
                        value={totalOrder?.value}
                        change={totalOrder?.change}
                        icon={ShoppingBag}
                        color="bg-blue-500"
                    />
                    <StatCard
                        title="Active users"
                        value={activeCustomer?.value}
                        change={activeCustomer?.change}
                        icon={Users}
                        color="bg-purple-500"
                    />
                    <StatCard
                        title="Average rating"
                        value={averageRating?.value}
                        change={averageRating?.change}
                        icon={Star}
                        color="bg-orange-500"
                    />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <SalesChart data={saleStats} />
                    <PopularDishesChart data={popular} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <OrdersTimeChart data={orderByTime} />
                    <RecentOrders orders={recentOrder} />
                </div>

                {/* Info Cards */}
                {/*<div className="grid grid-cols-1 md:grid-cols-3 gap-6">*/}
                {/*    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">*/}
                {/*        <div className="flex items-center gap-3 mb-4">*/}
                {/*            <MapPin className="w-6 h-6 text-blue-500" />*/}
                {/*            <h3 className="text-lg font-semibold text-gray-900">Adresse</h3>*/}
                {/*        </div>*/}
                {/*        <p className="text-gray-600">123 Rue de la Gastronomie<br />75001 Paris, France</p>*/}
                {/*    </div>*/}

                {/*    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">*/}
                {/*        <div className="flex items-center gap-3 mb-4">*/}
                {/*            <Phone className="w-6 h-6 text-green-500" />*/}
                {/*            <h3 className="text-lg font-semibold text-gray-900">Contact</h3>*/}
                {/*        </div>*/}
                {/*        <p className="text-gray-600">+33 1 23 45 67 89<br />Ouvert 7j/7</p>*/}
                {/*    </div>*/}

                {/*    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">*/}
                {/*        <div className="flex items-center gap-3 mb-4">*/}
                {/*            <Clock className="w-6 h-6 text-purple-500" />*/}
                {/*            <h3 className="text-lg font-semibold text-gray-900">Horaires</h3>*/}
                {/*        </div>*/}
                {/*        <p className="text-gray-600">11h00 - 23h00<br />Service continu</p>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </main>
        </div>
    );
}

// Composant pour les cartes de statistiques
const StatCard = ({ title, value, change, icon: Icon, color }) => {
    return (
        <div
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-600 text-sm font-medium">{title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
                    <div className="flex items-center mt-2">
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1"/>
                        <span className="text-green-500 text-sm font-medium">{change}</span>
                    </div>
                </div>
                <div className={`p-4 rounded-2xl ${color}`}>
                    <Icon className="w-8 h-8 text-white"/>
                </div>
            </div>
        </div>
    );
}

// Composant pour le graphique des ventes
const SalesChart = ({ data = [] }) => {
    // const data = [
    //     {day: 'Lun', sales: 1200},
    //     {day: 'Mar', sales: 1900},
    //     {day: 'Mer', sales: 3000},
    //     {day: 'Jeu', sales: 5000},
    //     {day: 'Ven', sales: 2000},
    //     {day: 'Sam', sales: 3000},
    //     {day: 'Dim', sales: 4500},
    // ];

    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Sales of the week</h3>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                            dataKey="day"
                            stroke="#6b7280"
                            tick={{ fontSize: 12 }}
                        />
                        <YAxis
                            stroke="#6b7280"
                            tick={{ fontSize: 12 }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#ffffff',
                                border: '1px solid #e5e7eb',
                                borderRadius: '12px',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                            }}
                            formatter={(value) => [`${value}£`, 'Sales']}
                        />
                        <Line
                            type="monotone"
                            dataKey="sales"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                            activeDot={{ r: 8, fill: '#1d4ed8' }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

// Composant pour le graphique des plats populaires
const PopularDishesChart = ({ data = [] }) => {
    // const data = [
    //     {name: 'Pizza Margherita', value: 35, color: '#ff6384'},
    //     {name: 'Burger Classique', value: 25, color: '#36a2eb'},
    //     {name: 'Salade César', value: 20, color: '#ffce56'},
    //     {name: 'Pasta Carbonara', value: 15, color: '#4bc0c0'},
    //     {name: 'Sushi Mix', value: 5, color: '#9966ff'},
    // ];

    const CustomTooltip = ({active, payload}) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                    <p className="font-medium">{payload[0].name}</p>
                    <p className="text-blue-600">{`${payload[0].value}%`}</p>
                </div>
            );
        }
        return null;
    };
    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Most popular dishes</h3>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            labelLine={false}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

// Composant pour le graphique des commandes par heure
const OrdersTimeChart = ({ data = []}) => {

    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Orders by time</h3>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                            dataKey="time"
                            stroke="#6b7280"
                            tick={{ fontSize: 12 }}
                        />
                        <YAxis
                            stroke="#6b7280"
                            tick={{ fontSize: 12 }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#ffffff',
                                border: '1px solid #e5e7eb',
                                borderRadius: '12px',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                            }}
                            formatter={(value) => [value, 'Orders']}
                        />
                        <Bar
                            dataKey="orders"
                            fill="#22c55e"
                            radius={[8, 8, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
// Composant pour les commandes récentes
const RecentOrders = ({ orders = [] }) => {
    // const orders = [
    //     { id: '#1234', customer: 'Marie Dubois', items: 'Pizza Margherita x2', amount: '€28.50', status: 'En cours', time: '14:30' },
    //     { id: '#1235', customer: 'Jean Martin', items: 'Burger + Frites', amount: '€15.90', status: 'Livré', time: '14:15' },
    //     { id: '#1236', customer: 'Sophie Leroy', items: 'Salade César', amount: '€12.00', status: 'Préparation', time: '14:00' },
    //     { id: '#1237', customer: 'Paul Moreau', items: 'Pasta Carbonara', amount: '€16.50', status: 'En cours', time: '13:45' },
    // ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'complete': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'cancelled': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Recent orders</h3>
            <div className="space-y-4">
                {orders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className="flex-1">
                            <div className="flex items-center gap-3">
                                <span className="font-semibold text-gray-900">{order.id}</span>
                                <span className="text-gray-600">{order.customer}</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">{order.items}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="font-bold text-gray-900">{order.amount}</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                {order.status}
                            </span>
                            <span className="text-sm text-gray-500">{order.time}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};