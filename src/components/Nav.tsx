import React from "react";
import { Button } from "./ui/Button";
import { useRouter } from "next/navigation";

const Nav = () => {
  const router = useRouter();
  return (
    <div className="h-fit bg-transparent p-6 text-gray-800 ">
      <h1 className="text-4xl font-bold mb-4 text-center">🌍 Carbon Cycle Explorer</h1>
      <div className="flex justify-center gap-4 mb-6">
        <Button onClick={() => router.push("/?section=intro")}>Intro</Button>
        <Button onClick={() => router.push("/?section=systems")}>Earth Systems</Button>
        <Button onClick={() => router.push("/?section=energy")}>Energy Flow</Button>
        <Button onClick={() => router.push("/?section=quiz")}>Quiz</Button>
        <Button onClick={() => router.push("/CarbonCycle")}>3D Graph</Button>
      </div>
    </div>
  );
};

export default Nav;
