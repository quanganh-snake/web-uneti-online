import React from "react";
import { useLocation } from "react-router-dom";
import { homeMotCua } from "@/Services/Static/dataStatic.js";
import Breadcrumb from "@/Components/Breadcumb/Breadcrumb";
import FeatureItemMotCua from "@/Components/FeatureItemMotCua/FeatureItemMotCua";

function HomeHanhChinh() {
  const iconDaoTao = homeMotCua[3].ico;
  const featureHanhChinh = homeMotCua[3].childrens;

  const location = useLocation();
  const { pathname } = location;

  const breadcrumbs = [
    {
      title: "Hành chính",
      path: pathname,
    },
  ];

  const home = {
    path: "/motcua",
    title: "Bộ phận một cửa",
  };

  return (
    <div className="">
      <div className="flex flex-col gap-4 p-5 rounded-md shadow-xl bg-white">
        <Breadcrumb home={home} breadcrumbs={breadcrumbs} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featureHanhChinh.map((featureItem, index) => {
            return featureItem.visiable ? (
              <div key={index} className="feature-box">
                <FeatureItemMotCua
                  iconKhaoThi={iconDaoTao}
                  featureItem={featureItem}
                />
              </div>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
}

export default HomeHanhChinh;
