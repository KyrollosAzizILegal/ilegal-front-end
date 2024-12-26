'use client';
import { setHeader } from '@/redux/services/header';
import React from 'react'
import { useDispatch } from 'react-redux';

// type Props = {}

const billsData = [
    { client: "Client A", paid: 700, total: 1000, color: "bg-blue-500" },
    { client: "Client B", paid: 500, total: 1600, color: "bg-red-500" },
    { client: "Client A", paid: 700, total: 1000, color: "bg-blue-500" },
    { client: "Client B", paid: 500, total: 1600, color: "bg-red-500" },
    { client: "Client A", paid: 700, total: 1000, color: "bg-blue-500" },
    { client: "Client B", paid: 500, total: 1600, color: "bg-red-500" },
    { client: "Client A", paid: 700, total: 1000, color: "bg-blue-500" },
  ];

const Page = (/**props: Props */) => {
    const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(setHeader("Bills and Invoices"));
  }, [dispatch]);
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex-grow">
    <h3 className="text-lg font-bold mb-4">Bills and Invoices</h3>
    <div className="space-y-4">
      {billsData.map((bill, index) => (
        <div key={index} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="font-medium">{bill.client}</span>
            <span>
              {bill.paid}/{bill.total} egp
            </span>
          </div>
          <div className="h-4 w-full bg-gray-200 rounded-full">
            <div
              className={`${bill.color} h-full rounded-full`}
              style={{ width: `${(bill.paid / bill.total) * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default Page