import React from "react";
import { Layout } from "antd";

const { Header: AntHeader } = Layout;

const HEADER_STYLE = {
  display: "flex",
  alignItems: "center",
  padding: "0 25px",
  backgroundColor: "#001529",
  height: 64,
};

interface Props {
  userName: string;
}

export const Header: React.FC<Props> = ({ userName }) => {
  return (
    <AntHeader style={HEADER_STYLE}>
      <div
        style={{
          width: 180,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <img
          src="/vallena_logo_3d.png"
          alt="Logo"
          style={{
            height: 40,
            width: "auto",
            filter: "invert(1) brightness(2)",
          }}
        />
      </div>

      {/* Usuario alineado a la derecha */}
      <div
        style={{
          marginLeft: "auto",
          color: "white",
          fontWeight: "bold",
        }}
      >
        {userName}
      </div>
    </AntHeader>
  );
};
