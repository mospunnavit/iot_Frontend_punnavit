import Layout from "../components/layout";
import coffeeImage from "../assets/images/coffee-1.jpg";

export default function HomePage() {
  return (
    <Layout>
      <section
        className="h-[500px] w-full text-white bg-orange-800 bg-cover bg-blend-multiply flex flex-col justify-center items-center px-4 text-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/694740/pexels-photo-694740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
        }}
      >
        <h1 className="text-5xl mb-2">ยินดีต้อนรับสู่ Cafe InwZa</h1>
        <h2>ร้านกาแฟสำหรับคนเท่ เท่ห์ By Punnavit</h2>
      </section>

      <section className="container mx-auto py-8">
        <h1>เกี่ยวกับเรา</h1>

        <div className="grid grid-cols-3 gap-4">
          <p className="text-left col-span-2">
          Cafe InwZa เป็นร้านกาแฟที่มีหนังสืออยู่นิดหน่อยให้คุณได้อ่าน
            และเรียนรู้เรื่องใหม่ๆ ที่เกี่ยวกับเนื้อหาทุกอย่างที่จะหามาให้อ่านได้โดยทางเราได้คัดกรองมา
            โดยจาก ปัณณวิชญ์ ปานช้าง 
          </p>

          <div>
            <img src="https://images.pexels.com/photos/6957994/pexels-photo-6957994.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Panwit Tuwanut" className="h-full w-full object-cover" />
          </div>
        </div>
        <p className="text-right mt-8">
          ปัจจุบันค่าเฟ่ และห้องสมุดของเรา อยู่ในช่วงการดูแลของ ....
          {/* TODO: ชื่อของตนเอง, รหัสประจำตัวนักศึกษา และแนะนำคาเฟ่นี้ต่ออีกสักหน่อย + ใส่รูปของตนเอง (ไม่จำเป็นหากไม่สะดวกใจใส่รูป) */}
          ซึ่งมีบริการ... ขาย เครื่องดื่ม และ หนังสื่อ ที่มีหน้า staff ที่ import จากวาโนคุนิมาจากญี่ปุ่นซึ่งถ้าคนทำร้านเสียหายนั้นหมายความว่าคุณอาจจะได้รับความเสียหายเหมือนกัน
        </p>
      </section>

      <section className="w-full flex justify-center">
        <img src={coffeeImage} alt="Coffee" className="w-full" />
      </section>
    
    </Layout>
    
  );
}
