'use client'
import Table from "@/app/_components/Table";
import {useGetStats} from "@/hooks/api/useStats";
import {useState, useEffect} from "react";

export default function Page() {
    const { data, isFetching } = useGetStats()
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (data) {
            setOrders(data?.allOrders)
        }
    }, [isFetching]);


    return (
        <div>
            orders

            <Table
                columns={columns}
                data={[
                    ...orders,

                ]}
                isLoading={isFetching}

            />
        </div>
    )
}

const columns = [
    {
        key: 'id',
        title: 'ID',
        dataIndex: 'id',
        render: (id) => <span className="text-blue-500">{id}</span>
    },
    {
        key: 'items',
        title: 'items',
        dataIndex: 'items',
        render: (name) => <span className="text-zinc-500">{name}</span>
    },
    {
        key: 'status',
        title: 'status',
        dataIndex: 'status',
        render: (name) => <span className={`${name === 'complete' ? 'text-green-500' : 'text-amber-500'} uppercase`}>{name}</span>
    },

    {
        key: 'customer',
        title: 'customer',
        dataIndex: 'customer',
        render: (name, record) => (
            <div className="flex flex-col gap-1">
                <span className="text-zinc-500">{name}</span>
                <span className="text-zinc-500 text-xs">{record.email}</span>
            </div>
        )
    },
    {
        key: 'amount',
        title: 'total',
        dataIndex: 'amount',
        render: (amount) => <span className="text-zinc-500">{amount}</span>
    },
    {
        key: 'order_date',
        title: 'order date',
        dataIndex: 'order_date',
        render: (name) => <span className="text-zinc-500">{name}</span>
    },
]