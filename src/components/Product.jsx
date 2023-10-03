import PropTypes from 'prop-types';

const Product = (props) => {
    return ( 
        <div className="border p-4 rounded shadow-sm hover:shadow-md transition-shadow duration-300">
            <h1 className="font-bold text-xl mb-2">{props.product.name}</h1>
            <h2 className="text-gray-700 mb-2">${props.product.price}</h2>
            <img 
                src={props.product.image} 
                alt={props.product.name} 
                className="w-1/4 rounded"
            />
        </div>
    );
}

Product.propTypes = {
    product: PropTypes.object.isRequired
}

export default Product;
