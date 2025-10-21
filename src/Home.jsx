import { Button, Card, CardBody, HStack } from "@chakra-ui/react";
import Header from "./components/ui/Header/Header";
import Hero from "./components/ui/Hero/Hero";
const Home = () => {
  return (
    <HStack>
      <div class="container">
        <Header />
        <Hero />
      </div>
    </HStack>
  );
};
export default Home;
