'use client';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Home from './Home';

export default function page() {
	return (
		<>
			{/* Sidebar component remains static above all elements on the page */}
			<main className='flex overflow-hidden h-screen w-screen'>
				{/* <Sidebar /> */}
				<Sidebar />
				{/* Main Dashboard display area */}
				<div className='flex flex-col  gap-4 md:gap-0 w-full h-full overflow-y-auto oveflow-x-hidden'>
					{/* Navbar COMPONENT goes here */}

					<Navbar />

					{/* When routing begins we would use the <Outlet/> functionality to render different pages */}

					<Home />
				</div>
			</main>
		</>
	);
}
