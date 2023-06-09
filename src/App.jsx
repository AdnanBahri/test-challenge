import React, { useEffect } from "react";
import Client from "./api/client";
import { RETRIEVE_CLIENTS, RETRIEVE_PRODUCTS } from "./utils/endpoints";
import Navbar from "./components/navbar";
import Layout from "./hoc/Layout";
import { Route, Routes } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import ClientScreen from "./pages/ClientScreen";

const App = () => {
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const resp = await Client.get(RETRIEVE_CLIENTS);
        const data = await resp?.data;
        console.log("Clients", data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchProducts = async () => {
      try {
        const resp = await Client.get(RETRIEVE_PRODUCTS);
        const data = await resp?.data;
        console.log("products", data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchClients();
    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-100 w-full min-h-screen">
      <Layout>
        <Routes>
          <Route path="/" index element={<HomeScreen />} />
          <Route path="/clients" element={<ClientScreen />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
