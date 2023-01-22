const SkuEntry = ({sku}) => {
    return (
        <div>
            
            <h1>{sku.SKU}</h1>
            <h2>{sku.description}</h2>
            <h3>Bill of Materials:</h3>
            {sku.BOM.map((bomItem, i) => 
            <div key={sku.SKU + "BOMitem" + i}>
                <p>{bomItem[0]}</p>
                <p>Quantity: {bomItem[1]}</p>
            </div>
            )}
        </div>
    )
}

export default SkuEntry