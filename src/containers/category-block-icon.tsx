import IconCard from "@components/common/icon-card";
import SectionHeader from "@components/common/section-header";
import Carousel from "@components/ui/carousel/carousel";
import CardIconLoader from "@components/ui/loaders/card-icon-loader";
import { useCategoriesQuery } from "@framework/category/get-all-categories";
import { ROUTES } from "@utils/routes";
import Alert from "@components/ui/alert";
import cn from "classnames";
import { SwiperSlide } from "swiper/react";

interface CategoriesProps {
	sectionHeading: string;
	className?: string;
	variant?: "default" | "modern";
}

const breakpoints = {
	"1780": {
		slidesPerView: 7,
		spaceBetween: 12,
	},
	"1280": {
		slidesPerView: 6,
		spaceBetween: 12,
	},
	"1025": {
		slidesPerView: 5,
		spaceBetween: 12,
	},
	"768": {
		slidesPerView: 4,
		spaceBetween: 12,
	},
	"480": {
		slidesPerView: 3,
		spaceBetween: 12,
	},
	"0": {
		slidesPerView: 2,
		spaceBetween: 12,
	},
};

const CategoryBlockIcon: React.FC<CategoriesProps> = ({
	className = "mb-12 md:mb-14 xl:mb-16",
	sectionHeading,
	variant = "default",
}) => {
	const { data, isLoading, error } = useCategoriesQuery({
		limit: 10,
	});

	return (
		<div className={cn(className)}>
			<SectionHeader sectionHeading={sectionHeading} />
			{error ? (
				<Alert message={error?.message} />
			) : (
				<Carousel
					autoplay={false}
					breakpoints={breakpoints}
					buttonGroupClassName="-mt-2 md:-mt-2"
				>
					{isLoading && !data
						? Array.from({ length: 10 }).map((_, idx) => {
								return (
									<SwiperSlide key={`card-rounded-${idx}`}>
										<CardIconLoader uniqueKey={`card-rounded-${idx}`} />
									</SwiperSlide>
								);
						  })
						: data?.categories?.data?.map((category) => (
								<SwiperSlide key={`category--key-${category.id}`}>
									<IconCard
										item={category}
										href={`${ROUTES.CATEGORY}/${category.slug}`}
										effectActive={true}
										variant={variant}
									/>
								</SwiperSlide>
						  ))}
				</Carousel>
			)}
		</div>
	);
};

export default CategoryBlockIcon;
