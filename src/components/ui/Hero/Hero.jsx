import React from "react";
import styles from "./Hero.module.css";
import { Container } from "@chakra-ui/react";
import File_upload from "@/components/FileUpload";
function Hero() {
  return (
    <div>
        <Container display={"flex"} flexDirection={"column"} justifyContent={"center"} height={"90vh"} alignItems={"center"}>
            <File_upload />
        </Container>
    </div>
  );
}

export default Hero;
