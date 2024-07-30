import useSWR from 'swr';
import { Alert, Container, Loader } from '@mantine/core';
import Layout from '../components/layout';

// ฟังก์ชัน fetcher สำหรับดึงข้อมูล
const fetcher = async (url: string): Promise<Order[]> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`An error occurred: ${response.statusText}`);
  }
  return response.json();
};

interface Item {
  id: number;
  name: string;
  amount: number;
  details: string;
}

interface Order {
  order_id: number;
  status: string;
  details: string; // เป็น JSON string ที่ต้องแปลง
}

const parseOrderDetails = (details: string): Item[] => {
  try {
    const parsed = JSON.parse(details);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to parse order details:', error);
    return [];
  }
};

export default function Staff() {
  const apiUrl = import.meta.env.VITE_API_URL + '/orders';
  const { data: orders, error } = useSWR<Order[]>(apiUrl, fetcher);

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
    return <Loader />;
  }

  return (
    <>
      <Layout>
        <section
          className="h-[500px] w-full text-white bg-orange-800 bg-cover bg-blend-multiply flex flex-col justify-center items-center px-4 text-center"
          style={{ backgroundImage: `url()` }}
        >
          <h1 className="text-5xl mb-2">ออเดอร์</h1>
          <h2>รายการออเดอร์ทั้งหมด</h2>
        </section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {orders.map((order) => {
              const orderDetails = parseOrderDetails(order.details);
              return (
                <div className="border border-solid border-neutral-200 p-4" key={order.order_id}>
                  <h3>Order ID: {order.order_id}</h3>
                  <p>Status: {order.status}</p>
                  <div className="border border-solid border-neutral-400 p-2">
                    <ul>
                      {Array.isArray(orderDetails) && orderDetails.map((item) => (
                        <li key={item.id} className="mb-2">
                          <p>ชื่ออาหาร: {item.name} x{item.amount}</p>
                          <p>รายละเอียด: {item.details}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Layout>
    </>
  );
}
