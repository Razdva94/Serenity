import { CalcButton } from '@/shared';
import { KEYBOARD_DATA } from '@/entities';

const Keyboard = () => {
	return (
		<div className="grid grid-cols-4 gap-1">
			{KEYBOARD_DATA.map((button: string, i: number) => {
				return <CalcButton key={i} symbol={button} />;
			})}
		</div>
	);
};

export default Keyboard;
