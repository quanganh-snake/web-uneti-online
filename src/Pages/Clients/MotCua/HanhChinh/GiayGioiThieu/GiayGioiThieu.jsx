import GiayGioiThieuView from "./GiayGioiThieuView";

function GiayGioiThieu() {
  const home = {
    path: "/motcua",
    title: "Bộ phận một cửa",
  };

  const breadcrumbs = [
    {
      path: "/motcua/hanhchinh",
      title: "Hành chính",
    },
    {
      path: "/motcua/hanhchinh/GiayGioiThieu",
      title: "Nghỉ học tạm thời",
    },
  ];

  return <GiayGioiThieuView home={home} breadcrumbs={breadcrumbs} />;
}

export default GiayGioiThieu;
