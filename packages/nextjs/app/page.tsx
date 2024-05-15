"use client";

import { useState } from "react";
import GreetingsTable from "./subgraph/_components/GreetingsTable";
import type { NextPage } from "next";
import { apolloClient } from "~~/components/ScaffoldEthAppWithProviders";
import { InputBase } from "~~/components/scaffold-eth";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const [newGreetings, setNewGreetings] = useState("");

  const { writeContractAsync } = useScaffoldWriteContract("YourContract");

  const handleSetGreetings = async () => {
    try {
      await writeContractAsync({
        functionName: "setGreeting",
        args: [newGreetings],
      });
      await apolloClient.refetchQueries({
        include: "all",
      });
    } catch (e) {
      console.error("Error setting greetings", e);
    }
  };

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Set Greetings</h2>
            <InputBase placeholder="Hello world !" onChange={setNewGreetings} value={newGreetings} />
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={handleSetGreetings}>
                Set
              </button>
            </div>
          </div>
        </div>
        <GreetingsTable />
      </div>
    </>
  );
};

export default Home;
