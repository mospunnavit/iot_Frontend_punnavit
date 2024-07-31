import { Container } from '@mantine/core';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <Container className="flex justify-between items-center">
        <div>&copy; {new Date().getFullYear()} Cafe Inw Za 007 corporation</div>
        <div className="flex space-x-4">
          <a href="#" className="text-white">Contact Us</a>
          <a href="#" className="text-white">Iot</a>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;