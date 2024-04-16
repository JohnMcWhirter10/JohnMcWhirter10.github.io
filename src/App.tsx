import React, { useState } from "react";
import { Container, Tab, Tabs } from "@mui/material";
import { MUITheme } from "@context/ThemeContext";
import TabPanel from "@components/TabPanel";
import { tabData } from "@constants/tabs";

import { socialLinks } from "@constants/socialLinks";
import MyLink, { MyLinkProps } from "@components/MyLink";

const App: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(tabData[0].label);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  return (
    <MUITheme>
      <Container sx={{ marginTop: "8%", padding: 0 }}>
        <Tabs value={selectedTab} onChange={handleTabChange}>
          {tabData.map((tab, index) => (
            <Tab key={index} label={tab.label} value={tab.label} />
          ))}
        </Tabs>
        {tabData.map((tab, index) => (
          <TabPanel key={index} value={selectedTab} index={tab.label}>
            <Container
              fixed
              sx={{
                padding: "1.5rem",
                background: "#eee",
                borderRadius: ".15em",
                boxShadow: "0 3px 15px rgba(0,0,0,0.3)",
                height: "min(70vh, 700px)",
                overflowY: "auto",
              }}
            >
              {tab.component({})}
            </Container>
          </TabPanel>
        ))}
      </Container>
      <Container fixed sx={{ marginBottom: "8%", marginTop: "2%" }}>
        {socialLinks.map((link: MyLinkProps, index: number) => (
          <MyLink
            key={index}
            name={link.name}
            link={link.link}
            icon={link.icon}
          />
        ))}
      </Container>
    </MUITheme>
  );
};

export default App;
