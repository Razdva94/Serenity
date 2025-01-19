import React from 'react';
import * as Redux from 'react-redux';
import classNames from 'classnames';
import { defineButtonGroup } from '@/shared';
import {
	RootState,
	setApiSource,
	setClickedSymbol,
	setResult,
	togglePopup,
} from '@/store';
import { api } from '@/shared';

interface ICalcButtonProps {
	symbol: string;
}

interface IResult {
	error: string;
	result: string[];
}
const CalcButton: React.FC<ICalcButtonProps> = ({ symbol }) => {
	const [buttonsColor, setButtonsColor] = React.useState({
		numbersColor: false,
		symbolsColor: false,
		equalSymbolColor: false,
	});

	const expression = Redux.useSelector(
		(state: RootState) => state.pushButtonHandler.expression,
	);

	const apiSource = Redux.useSelector(
		(state: RootState) => state.apiSourceHandler,
	);

	const dispatch = Redux.useDispatch();
	const buttonClickHandler = async () => {
		switch (symbol) {
			case '=':
				{
					try {
						if (expression.length < 2) {
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
				}
				break;
			case 'math.js':
				if (apiSource.text === 'math.js') {
					dispatch(setApiSource({ text: 'custom' }));
				} else {
					dispatch(setApiSource({ text: 'math.js' }));
				}
				break;
			default:
				dispatch(setClickedSymbol(symbol));
				break;
		}
	};

	React.useEffect(() => {
		const elGroup = defineButtonGroup(symbol);
		switch (elGroup) {
			case 'number':
				setButtonsColor((prevState) => ({
					...prevState,
					numbersColor: true,
				}));
				break;
			case 'operator':
				setButtonsColor((prevState) => ({
					...prevState,
					symbolsColor: true,
				}));
				break;
			case 'equal-symbol':
				setButtonsColor((prevState) => ({
					...prevState,
					equalSymbolColor: true,
				}));
		}
	}, [symbol]);
	return (
		<button
			onClick={buttonClickHandler}
			type="button"
			className={classNames('h-[42px] w-[90px]  rounded-[100px] text-[14px]', {
				'bg-[#e5edff] hover:bg-[#d3e3fd]': buttonsColor.symbolsColor,
				'bg-[#f3f5f6] hover:bg-[#dee1e3]': buttonsColor.numbersColor,
				'bg-[#0b57d0] hover:bg-[#4285f4]': buttonsColor.equalSymbolColor,
			})}
		>
			{symbol === 'math.js' ? apiSource.text : symbol}
		</button>
	);
};

export default CalcButton;
