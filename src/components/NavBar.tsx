import Link from "next/link";

const Navbar: React.FC = () => {
	return (
		<>
			<nav className="flex flex-col justify-center items-center p-1 shadow-lg bg-gradient-to-r from-indigo-950 to-indigo-800 md:flex-row md:justify-evenly">
				<div>
					<Link className="text-white text-xl md:text-2xl" href={""}>
						Jamuna Bank PLC
					</Link>
				</div>
				<div>
					<ul className="flex flex-row gap-4">
						<li className="text-white hover:underline">
							<Link href={""}>Home</Link>
						</li>
						<li className="text-white hover:underline">
							<Link href={""}>Products</Link>
						</li>
						<li className="text-white hover:underline">
							<Link href={""}>Services</Link>
						</li>
						<li className="text-white hover:underline">
							<Link href={""}>About</Link>
						</li>
					</ul>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
