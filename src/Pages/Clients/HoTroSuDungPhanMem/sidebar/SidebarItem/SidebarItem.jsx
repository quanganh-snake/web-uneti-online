import { useBem } from "@/Hooks";
import PropTypes from "prop-types";

export const SidebarItem = ({ name, onClick, active }) => {
  const bem = useBem("sidebar");

  return (
    <div
      onClick={onClick}
      className={`${bem.e("item")} ${bem.is("active", active)}`}
    >
      {name}
    </div>
  );
};

SidebarItem.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func,
  active: PropTypes.bool,
};
