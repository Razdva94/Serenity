import * as Redux from 'react-redux';
import { setPushedSymbol, RootState, setResult, togglePopup } from '@/store';
import { api } from '@/shared';
import React from 'react';

interface IResult {
	error: string;
	result: string[];
}
const Display = () => {
	const inputRef = React.useRef<HTMLInputElement>(null);
	const showSymbol = Redux.useSelector(
		(state: RootState) => state.pushButtonHandler.expression,
	);
	const dispatch = Redux.useDispatch();
	const expression = Redux.useSelector(
		(state: RootState) => state.pushButtonHandler.expression,
	);

	const apiSource = Redux.useSelector(
		(state: RootState) => state.apiSourceHandler,
	);

	const handleClick = () => {
		if (inputRef.current) {
			inputRef.current.selectionStart = inputRef.current.selectionEnd = 10;
		}
	};
	const handleChangeValue = async (e: React.ChangeEvent<HTMLInputElement>) => {
		switch (e.target.value[e.target.value.length - 1]) {
			case '=':
				try {
					if (e.target.value.length < 2) {
						return;
					}
					const result: IResult = await api.getResult(
						expression,
						apiSource.text,
					);
					dispatch(setResult(result.result[0]));
				} catch (error) {
					dispatch(togglePopup());
				}
				break;
			default:
				dispatch(setPushedSymbol(e.target.value));
				break;
		}
	};

	return (
		<form className="text-[30px] mb-[10px] p-[5px] border border-solid border-[#dadce0] rounded-[16px]">
			<input
				onClick={handleClick}
				ref={inputRef}
				title="expression"
				placeholder=""
				onChange={handleChangeValue}
				value={showSymbol}
				className="w-full  h-full 
         caret-transparent focus:bg-inherit focus:text-inherit focus:outline-none text-right"
				type="text"
			></input>
		</form>
	);
};

export default Display;
