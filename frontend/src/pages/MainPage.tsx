import { Calculator } from '@/widgets';
import { Popup } from '@/shared';

function MainPage() {
	return (
		<div className="flex justify-center items-center h-screen">
			<Calculator />
			<Popup />
		</div>
	);
}
export default MainPage;
