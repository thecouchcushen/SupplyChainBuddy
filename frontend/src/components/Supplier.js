const Supplier = ({supplier}) => {
    return (
        <div>
          <h1>{supplier.description}</h1>
          <h2>{supplier.supplierID}</h2>
          <h3>{supplier.location}</h3>
          <h4>Payment Terms:</h4>
          <p>Deposit: {supplier.paymentTerms.deposit}</p>
          <p>Balance: {supplier.paymentTerms.balance}</p>
          <p>Payment due {supplier.paymentTerms.daysAfterPickup} days after pickup</p>
        </div>
    )
}

export default Supplier