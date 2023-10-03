import PropTypes from 'prop-types';



const Message = ({ variant , children }) => {
    let bgColor, textColor;

    switch (variant) {
        case 'danger':
            bgColor = 'bg-red-500';
            textColor = 'text-white';
            break;
        case 'success':
            bgColor = 'bg-green-500';
            textColor = 'text-white';
            break;
        case 'info':
            bgColor = 'bg-blue-500';
            textColor = 'text-white';
            break;
        default:
            bgColor = 'bg-gray-200';
            textColor = 'text-gray-800';
            break;
    }

    return (
        <div className={`${bgColor} ${textColor} p-4 rounded`}>
            {children}
        </div>
    );
}


Message.propTypes = {
    variant: PropTypes.oneOf(['danger', 'success', 'info']),
    children: PropTypes.node.isRequired
}


export default Message;
