import React, { useState } from "react";
import useSWR from "swr";
import { Alert, Container, Loader, Table } from "@mantine/core";
import Layout from "../components/layout";

// ฟังก์ชัน fetcher สำหรับดึงข้อมูล
const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Staff() {
  const apiUrl = import.meta.env.VITE_API_URL + "orders"; // ดึงค่า URL จากตัวแปรสิ่งแวดล้อม
  const { data: orders, error } = useSWR(apiUrl, fetcher);


  if (error) {
    return (
      <Container>
        <Alert color="red" title="เกิดข้อผิดพลาดในการดึงข้อมูล">
          {error.message}
        </Alert>
      </Container>
    );
  }

  if (!orders) {
    console.log(orders)
    return <Loader />;
    
  }

  
  console.log(orders)


  return (
    <>
      <Layout>
        <section
          className="h-[500px] w-full text-white bg-orange-800 bg-cover bg-blend-multiply flex flex-col justify-center items-center px-4 text-center"
          style={{
            backgroundImage: `url()`,
          }}
        >
          <h1 className="text-5xl mb-2">ออเดอร์</h1>
          <h2>รายการออเดอร์ทั้งหมด</h2>
        </section>
        <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {orders.map((order) => {
          const orderDetails = JSON.parse(order.details); // แปลงสตริง JSON ให้เป็นออบเจ็กต์
          return (
            <div className="border border-solid border-neutral-200" key={order.order_id}>
           
              <h3>Order ID: {order.order_id}</h3>
              <p>Status: {order.status}</p>
              <ul>
              <div className="border border-solid border-neutral-400">
                {orderDetails.map((item) => (
                  <ul key={item.id}>
                    <p>ชื่ออาหาร: {item.name} x{ item.amount}</p>
                    
                    <p>รายละเอียด: {item.details}</p>
                  </ul>
                ))}
                </div>
              </ul>
            </div>
          
          );
        })}
        </div>
      </Container>
             
       
      </Layout>
    </>
  );
}
