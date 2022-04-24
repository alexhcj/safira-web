import {Breadcrumbs} from "../shared/components/UI/Breadcrumbs/Breadcrumbs";
import {ProductDetails} from "../modules/ProductDetail/ProductDetails";
import {Border} from "../shared/components/UI/Spacing/Border";

export const Product = () => {

	return (
		<div>
			<Breadcrumbs />
            <ProductDetails />
			<Border/>
		</div>
	)
}
