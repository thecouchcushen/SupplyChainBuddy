import PoLine from './PoLine'

const PurchaseOrder = ({ po }) => {
    return (
        <div>
            <h1>PO{ po.POnumber }</h1>
            <h2>Supplier: { po.supplierID }</h2>
            {po.lines.map((line, i) => 
                <PoLine key={po.POnumber + "line" + i} line={line} />
                )}
        </div>
    )
}

export default PurchaseOrder