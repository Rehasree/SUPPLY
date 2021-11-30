import cn from "classnames";
interface Props {
	className?: string;
	title: string;
	options: {
		_id: number;
		name: string;
		meta: string;
	}[];
	active: string;
	onClick: any;
}

export const ProductAttributes: React.FC<Props> = ({
	className = "mb-4",
	title,
	options,
	active,
	onClick,
}) => {
	console.log(title,options,active)
	return (
		<div className={className}>
			<h3 className="text-base md:text-lg text-heading font-semibold mb-2.5 capitalize">
				{title}
			</h3>
			<ul className="colors flex flex-wrap -me-3">
				{options?.map(({ _id, name, meta }) => (
					<li
						style={{padding:"10px",margin:"4px"}}
						key={`${name}-${_id}`}
						className={cn(
							"cursor-pointer rounded border border-gray-100 flex justify-center items-center text-heading text-xs md:text-sm uppercase font-semibold transition duration-200 ease-in-out hover:border-black",
							{
								"border-black": name === active,
							}
						)}
						onClick={() => onClick({ [title]: name })}
					>
						{title === "Color" ? (
							<span
								className="h-full w-full rounded block"
								style={{ backgroundColor: name,margin:"4px",width:"35px",height:"35px" }}
							/>
						) : (
							name
						)}
					</li>
				))}
			</ul>
		</div>
	);
};
