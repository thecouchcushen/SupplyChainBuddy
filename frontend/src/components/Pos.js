import PurchaseOrder from "./Po";

const Pos = ({ pos }) => {
    return (
        pos.map((po, i) => 
          <PurchaseOrder key={"PO" + po.POnumber} po={po} />
        )
    )
}

export default Pos