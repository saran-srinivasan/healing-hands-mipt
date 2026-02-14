import React from "react";
import Dizziness from "@/public/images/Dizziness.png";
import Image from "next/image";

export const DizzinessIcon = () => {
    return <Image src={Dizziness} height={50} width={50} alt="Dizziness" />;
};
