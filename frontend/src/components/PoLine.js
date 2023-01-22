const PoLine = ({line}) => {
    return (
        <div>
            <p>SKU: {line.SKU}</p>
            <p>Price: ${line.price}/unit</p>
            <p>Quantity: {line.quantity} units</p>
            <p>Due: {line.dueDate}</p>
            <p>Status: {line.status}</p>
            <p>To be shipped to: {line.destination} via {line.shipMethod} (approximate ship time: {line.shipTime})</p>
        </div>
    )
}

export default PoLine