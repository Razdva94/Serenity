import { RootState, togglePopup } from '@/store';
import * as Redux from 'react-redux';
import { AppDispatch } from '../../store/index';

const Popup = () => {
	const isOpen = Redux.useSelector(
		(state: RootState) => state.togglePopupHandler.isOpen,
	);
	const dispatch = Redux.useDispatch<AppDispatch>();
	if (!isOpen) return null;

	const handleClickOutside = (e: React.MouseEvent<HTMLElement>) => {
		const target = e.target as HTMLElement;
		if (target.classList.contains('popup')) {
			dispatch(togglePopup());
		}
	};

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 popup"
			onClick={handleClickOutside}
		>
			<div className="bg-[#f3d1ca] rounded-lg p-6 shadow-xl">
				<h2 className="text-2xl font-bold text-center mb-4">
					Ошибка на сервере
				</h2>
				<p className="mb-4">Введены неверные данные</p>
				<button
					type="button"
					className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
					onClick={() => dispatch(togglePopup())}
				>
					Закрыть
				</button>
			</div>
		</div>
	);
};

export default Popup;
