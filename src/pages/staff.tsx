import useSWR from 'swr';
import { Alert, Container, Loader, Accordion  } from '@mantine/core';
import Layout from '../components/layout';

// ฟังก์ชัน fetcher สำหรับดึงข้อมูล
const fetcher = async (url: string): Promise<Order[]> => {
  const response = await fetch(url);
  if (!response.ok) {
     alert("ไม่มี order");
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
          style={{ backgroundImage: `url(https://images.pexels.com/photos/2867885/pexels-photo-2867885.jpeg?auto=compress&cs=tinysrgb&w=600)` }}
        >
          <h1 className="text-5xl mb-2">ออเดอร์</h1>
          <h2>รายการออเดอร์ทั้งหมด</h2>
        </section>
        <Container>
          <section>
            <div>
          <Accordion>
              {orders.map((order) => {
                const orderDetails = parseOrderDetails(order.details);
                return (
                  <Accordion.Item key={order.order_id} value={`order-${order.order_id}`}>
                    <Accordion.Control>รายการที่ {order.order_id}  สถานะออเดอร์ {order.status}</Accordion.Control>
                    <Accordion.Panel>
                      {Array.isArray(orderDetails) && orderDetails.map((item) => (
                        <div key={item.id}>
                          <p>ชื่ออาหาร: {item.name} x{item.amount}</p>
                          <p>รายละเอียด: {item.details}</p>
                        </div>
                      ))}
                    </Accordion.Panel>
                  </Accordion.Item>
                );
              })}
            </Accordion>
            </div>
          </section>
         
        </Container>

      </Layout>
    </>
  );
}
