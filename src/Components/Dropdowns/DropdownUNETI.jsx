import React from "react";
import PropTypes from "prop-types";

function DropdownUNETI(props) {
	const { textLabel, id, optionDefault, options } = props;
	return (
		<div className="w-100 flex flex-col mb-4 md:flex-row justify-start md:justify-between">
			<label htmlFor={id} className="md:w-[30%] mb-2 md:mb-0">
				{textLabel}
			</label>
			<select id={id} className="md:w-[70%] border px-2 py-1 rounded-lg outline-sky-800">
				<option>{optionDefault}</option>
				{options.map((option, index) => (
					<option value={option.value} key={index}>
						{option.title}
					</option>
				))}
			</select>
		</div>
	);
}

DropdownUNETI.propTypes = {
	textLabel: PropTypes.string,
	id: PropTypes.string,
	optionDefault: PropTypes.string,
	options: PropTypes.array.isRequired,
};

export default DropdownUNETI;
