"use client";

import React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import ConvertImage from '../pages/ConvertImage';
import Footer from '../pages/Footer';
import Header from '../pages/Header';
require('dotenv').config();

export default function Home() {

  return (
    <main>
      <Header/>
        <ConvertImage />
      <Footer />
    </main>
  );
}