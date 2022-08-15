import { InputLabel } from "@mui/material";
import React from "react";
import Select from "react-select";

const customStyles = {
	control: (styles) => ({
		...styles,
		paddingTop: "5px",
		paddingBottom: "5px",
		":hover": {
			borderColor: "black",
		},
	}),
	menu: (provided) => ({ ...provided, zIndex: 99999 }),
	menuList: (styles) => ({ ...styles, maxHeight: "150px" }),
};
const FormSelectInput = ({
	title,
	required,
	options,
	labelStyles,

	styles,
	...props
}) => {
	const ref = React.createRef();
	return (
		<div style={{ paddingTop: "24px" }}>
			{title && (
				<InputLabel
					sx={
						labelStyles
							? labelStyles
							: {
									color: "black",
									marginBottom: "8px",
									fontWeight: "bold",
							  }
					}
				>
					{title}
					{required && "*"}
				</InputLabel>
			)}
			<Select
				{...props}
				ref={ref}
				styles={styles || customStyles}
				closeMenuOnSelect
				// theme={(theme) => ({
				//   ...theme,
				//   colors: {
				//     ...theme.colors,
				//     primary: "#484A9E",
				//   },
				//   borderColor: theme.primary,
				// })}
				options={options}
			/>
		</div>
	);
};

export default FormSelectInput;
