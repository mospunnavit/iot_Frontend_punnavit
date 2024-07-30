import Layout from "../components/layout";
import useSWR from "swr";
import { useState } from "react";
import { Menu } from "../lib/models";
import { Alert, Button, Container, TextInput, NumberInput } from "@mantine/core";
import { IconAlertTriangleFilled, IconPlus, IconShoppingCart } from "@tabler/icons-react";
import Loading from "../components/loading";
import { Link } from "react-router-dom";
import { Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from "@mantine/notifications";
import axios, { AxiosError } from "axios";
import { useNavigate} from "react-router-dom";

export default function MenuPage() {
  const { data: menus, error } = useSWR<Menu[]>("/menus");
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orders, setOrders] = useState<{ id: number; name: string; amount: number; details: string }[]>([]);

  const handleOrder = (id: number, name: string) => {
    const isAlreadyOrdered = orders.some(order => order.id === id);
    if (isAlreadyOrdered) {
      alert(`เมนู "${name}" ได้ถูกสั่งแล้ว`);
      return;
    }
    setOrders([...orders, { id, name, amount: 1, details: "" }]);
  };

  const handleInputChange = (id: number, field: "amount" | "details", value: string | number) => {
    setOrders(orders.map(order => 
      order.id === id 
        ? { ...order, [field]: value } 
        : order
    ));
  };
  
  const handleRemoveOrder = (id: number) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  const handleConfirmOrder = () => {
    if (orders.length === 0) {
      alert("ไม่มีรายการสั่งซื้อ กรุณาเพิ่มรายการก่อน");
      return;
  }else{
    console.log("Orders:", orders);
    const orderString = JSON.stringify(orders);
    makeOrder(orderString);
  }
   };
  
   const makeOrder = async (orders: string) => {
    setIsProcessing(true);
    try {
      await axios.post(`/order`, { details: orders, status: 'order' });
      notifications.show({
        title: "เพิ่มสำเร็จ",
        message: "เพิ่มแล้ว",
        color: "teal",
      });
      setOrders([]);
      navigate(`/menus/`);
    } catch (error) {
      if (error instanceof AxiosError) {
        notifications.show({
          title: "เกิดข้อผิดพลาด",
          message: error.message,
          color: "red",
        });
      } else {
        notifications.show({
          title: "เกิดข้อผิดพลาด",
          message: "กรุณาลองอีกครั้ง",
          color: "red",
        });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Layout>
        <section
          className="h-[500px] w-full text-white bg-orange-800 bg-cover bg-blend-multiply flex flex-col justify-center items-center px-4 text-center"
          style={{
            backgroundImage: `url()`,
          }}
        >
          <h1 className="text-5xl mb-2">เมนู</h1>
          <h2>รายการเมนูทั้งหมด</h2>
        </section>
        <section className="container mx-auto py-8">
          <div className="flex justify-between">
            <h1>รายการหนังสือ</h1>
            <Drawer opened={opened} onClose={close} title="Order">
              <Container>
                {orders.length > 0 ? (
                  <ul>
                    {orders.map((order) => (
                      <li key={order.id} className="flex justify-between items-center">
                        <div className="flex-1">
                          <span>{order.name}</span>
                          <NumberInput
                            value={order.amount}
                            onChange={(value) => handleInputChange(order.id, "amount", value || 0)}
                            placeholder="จำนวน"
                            min={1}
                            className="ml-2"
                          />
                          <TextInput
                            value={order.details}
                            onChange={(event) => handleInputChange(order.id, "details", event.currentTarget.value)}
                            placeholder="รายละเอียด"
                            className="ml-2"
                          />
                        </div>
                        <Button 
                          color="red" 
                          variant="outline" 
                          size="xs" 
                          onClick={() => handleRemoveOrder(order.id)}
                        >
                          ลบ
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>ไม่มีคำสั่งซื้อ</p>
                )}
                <Button onClick={handleConfirmOrder} className="mt-4" loading={isProcessing} >สั่ง</Button>
              </Container>
            </Drawer>
            <Button onClick={open} leftSection={<IconShoppingCart/>} >ดูรายการ {orders.length}</Button>
          </div>

          {!menus && !error && <Loading />}
          {error && (
            <Alert
              color="red"
              title="เกิดข้อผิดพลาดในการอ่านข้อมูล"
              icon={<IconAlertTriangleFilled />}
            >
              {error.message}
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {menus?.map((menu) => (
              <div className="border border-solid border-neutral-200" key={menu.menu_id}>
                <img
                  src={menu.menu_picture}
                  alt={menu.menu_name}
                  className="w-full object-cover aspect-[3/4]"
                  style={{ width: "150px", height: "150px", objectFit: "cover", objectPosition: "center" }}
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold line-clamp-2">{menu.menu_name}</h2>
                  <p className="text-xs text-neutral-500">ราคา {menu.menu_price} บาท</p>
                </div>

                <div className="flex justify-end px-4 pb-2">
                  <Button 
                    size="xs" 
                    variant="default" 
                    onClick={() => handleOrder(menu.menu_id, menu.menu_name)}
                  >
                    สั่ง
                  </Button>
                  <Button component={Link} to={`/menus/${menu.menu_id}`} size="xs" variant="default">
                    ดูรายละเอียด
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Layout>
    </>
  );
}
